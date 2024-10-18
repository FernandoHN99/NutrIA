import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import theme from '../../../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba, capitalize, criarStrData, calcularMacrosPorPorcao } from '../../../utils/utils';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { buscarAlimentosService } from '../../../api/services/alimentoService';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons02 from 'react-native-vector-icons/MaterialIcons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritarAlimentoService } from '../../../api/services/alimentoFavoritoService';
import { addAlimentoConsumidoService } from '../../../api/services/alimentoConsumoService';
import { AddAlimentoConsumidoSchema } from '../../../api/schemas/alimentoConsumidoSchema';
import ToastNotification from '../../../components/ToastNotification';


const SearchFoodScreen = ({ route}: { route: any }) => {
   const navigation = useNavigation();
   const { macrosRefeicao, diaSelecionado } = route.params;

   const [nomeAlimentoBusca, setNomeAlimentoBusca] = useState<string>('');
   const [resultados, setResultados] = useState<string[]>([]);
   const [selectedTab, setSelectedTab] = useState<string>('favoritos');
   const [showToast, setShowToast] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const queryClient = useQueryClient()
   let cachedAlimentosFavoritos: any[] = queryClient.getQueryData(['alimentosFavoritos']) || [];

   useEffect(() => {
      if (nomeAlimentoBusca) {
         setIsLoading(true);
         if(selectedTab === 'favoritos') {
            setSelectedTab('resultados');
         }
         const timeoutId = setTimeout(() => handleSearch(nomeAlimentoBusca), 300);
         return () => clearTimeout(timeoutId);
      }

   }, [nomeAlimentoBusca]);

   const { mutateAsync: favoritarAlimentoServiceFn } = useMutation({
      mutationFn: favoritarAlimentoService,
      onSuccess(data, variables) {
         const alimentoId: number = variables.id_alimento;
         const index = cachedAlimentosFavoritos.findIndex(af => af.alimento.id_alimento === alimentoId);
         if (index !== -1) {
            cachedAlimentosFavoritos.splice(index, 1);
        } else {
            cachedAlimentosFavoritos.push(data);
        }
        queryClient.setQueryData(['alimentosFavoritos'], cachedAlimentosFavoritos);
      },
   });

   const { mutateAsync: addAlimentoConsumidoServiceFn } = useMutation({
      mutationFn: addAlimentoConsumidoService,
      onSuccess(retorno) {
         setShowToast(true);
         queryClient.setQueryData(['consumoAlimentos'], (data: any[]) =>{
            return [...data, retorno];
         });
      },
      onError() {
         Alert.alert('Erro', 'Não foi possível adicionar o alimento.');
      }
   });


   async function handleFavotitarAlimento(id_alimento: number) {
      await favoritarAlimentoServiceFn({ id_alimento });
   }
   async function handleAddAlimentoConsumido(alimento: any) {
      const porcaoBase = alimento.tabelasNutricionais[0].porcao_padrao;
      const qtdePorcao = 1;
      const qdteUtilizada = porcaoBase * qtdePorcao;
      const macrosBase = {
         carboidrato: alimento.tabelasNutricionais[0].qtde_carboidrato,
         proteina: alimento.tabelasNutricionais[0].qtde_proteina,
         gordura: alimento.tabelasNutricionais[0].qtde_gordura,
         alcool: alimento.tabelasNutricionais[0].qtde_alcool,
         kcal: alimento.tabelasNutricionais[0].kcal,
      }
      const calculoMacros = calcularMacrosPorPorcao(
         porcaoBase, qdteUtilizada, macrosBase
      )
      const bodyRequest: AddAlimentoConsumidoSchema = {
         id_alimento: alimento.id_alimento,
         id_prato: null,
         dt_dia: diaSelecionado,
         numero_refeicao: macrosRefeicao.numero_refeicao,
         unidade_medida: alimento.tabelasNutricionais[0].unidade_medida,
         porcao_padrao: 1,
         qtde_utilizada: qdteUtilizada,
         qtde_carboidrato: calculoMacros.qtdeCarboidrato,
         qtde_proteina: calculoMacros.qtdeProteina,
         qtde_gordura: calculoMacros.qtdeGordura,
         qtde_alcool: calculoMacros.qtdeAlcool,
         kcal: calculoMacros.qtdeKcal,
      }
      await addAlimentoConsumidoServiceFn(bodyRequest);
   }

   const handleSearch = async (nomeAlimento: string) => {
      const alimentosBusca = await buscarAlimentosService({ nome: nomeAlimento });
      setResultados(alimentosBusca);
      setIsLoading(false);
   };

   const handleGoBack = () => {
      navigation.goBack();
   };

   const renderAlimentos = (alimento: any, index: number) => {
      const nomeAlimento = alimento.nome_alimento;
      const kcal = alimento.tabelasNutricionais[0].kcal
      const estadoAlimento = alimento.estado_alimento == 'PADRAO' ? '' : `, ${capitalize(alimento.estado_alimento)}`
      const tbPorcaoPadrao = alimento.tabelasNutricionais[0].porcao_padrao;
      return (
         // @ts-ignore
         <TouchableOpacity style={[styles.alimentoContainer, 0 === index && styles.alimentoFirstContainer]} key={`${alimento.id_alimento}-${index}`} onPress={() => navigation.push('AddConsumoScreen', {alimento, refeicao: macrosRefeicao}) }>
            <View style={[{ flex: 0.8 }]}>
               <Text style={[styles.infoAlimento, {fontFamily: 'NotoSans-Bold'}]}>{nomeAlimento}{estadoAlimento}</Text>
               <Text style={styles.infoAlimento}>{kcal} kcal, {tbPorcaoPadrao}g, 1 Porção</Text>
            </View>
            {
               cachedAlimentosFavoritos.some(af => af.alimento.id_alimento === alimento.id_alimento) ?
                  <Icons02 style={styles.iconeAdd} name="favorite" size={getResponsiveSizeHeight(3.5)} onPress={() => handleFavotitarAlimento(alimento.id_alimento)} />
                  : <Icons02 style={styles.iconeAdd} name="favorite-border" size={getResponsiveSizeHeight(3.5)} onPress={() => handleFavotitarAlimento(alimento.id_alimento)} />
            }
            <Icons02 style={styles.iconeAdd} name="add-circle" size={getResponsiveSizeHeight(3.5)}  onPress={()=> handleAddAlimentoConsumido(alimento)}/>
         </TouchableOpacity>
      );
   }


   const renderAlimentosFavoritos = (alimentoFavorito: any, index: number) => {
      const nomeAlimento = alimentoFavorito.alimento.nome_alimento;
      const kcal = alimentoFavorito.alimento.tabelasNutricionais[0].kcal;
      const estadoAlimento = alimentoFavorito.alimento.estado_alimento == 'PADRAO' ? '' : `, ${capitalize(alimentoFavorito.estado_alimento)}`
      const porcaoPadrao = alimentoFavorito.alimento.tabelasNutricionais[0].porcao_padrao;
      return (
         // @ts-ignore
         <TouchableOpacity style={[styles.alimentoContainer, 0 === index && styles.alimentoFirstContainer]} key={`${alimentoFavorito.id_alimento}-${index}`} onPress={() => navigation.push('AddConsumoScreen', {alimento: alimentoFavorito.alimento, refeicao: macrosRefeicao})} >
            <View style={[{ flex: 0.8 }]}>
               <Text style={styles.infoAlimento}>{nomeAlimento}{estadoAlimento}</Text>
               <Text style={styles.infoAlimento}>{kcal} kcal, {porcaoPadrao}g, 1 Porção</Text>
            </View>
               <Icons02 style={styles.iconeAdd} name="favorite" size={getResponsiveSizeHeight(3.5)} onPress={() => handleFavotitarAlimento(alimentoFavorito.alimento.id_alimento)} />
            <Icons02 style={styles.iconeAdd} name="add-circle" size={getResponsiveSizeHeight(3.5)} onPress={()=> handleAddAlimentoConsumido(alimentoFavorito.alimento)} />
         </TouchableOpacity>
      );
   }

   return (
      <View style={styles.mainContainer}>
         <View style={styles.headerContainer}>
            <Text style={styles.titulo}>{macrosRefeicao.nome_refeicao}</Text>
            <Icons onPress={handleGoBack} style={styles.iconeFechar} name="close-circle" size={getResponsiveSizeHeight(3.5)} />
         </View>
         <TextInput
            style={styles.searchBar}
            value={nomeAlimentoBusca}
            onChangeText={setNomeAlimentoBusca}
            placeholder="Adicionar alimentos..."
            placeholderTextColor={theme.colors.color05}
         />
         <View style={{width: '100%'}}>
            <View style={styles.buttonsContainer}>
               <TouchableOpacity 
                  style={[styles.buttonContainer, selectedTab === 'resultados' && styles.buttonSelectedContainer]} 
                  onPress={() => setSelectedTab('resultados')}>
                  <Text
                     style={[
                        styles.subtitulo,
                        selectedTab === 'resultados' && styles.selectedSubtitulo,
                     ]}
                  >
                     Resultados da Busca
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity 
                  style={[styles.buttonContainer, selectedTab === 'favoritos' && styles.buttonSelectedContainer]} 
                  onPress={() => setSelectedTab('favoritos')}>
                  <Text
                     style={[
                        styles.subtitulo,
                        selectedTab === 'favoritos' && styles.selectedSubtitulo,
                     ]}
                  >
                     Alimentos Favoritos
                  </Text>
               </TouchableOpacity>
            </View>
            {nomeAlimentoBusca && resultados.length > 0 && selectedTab == 'resultados' ?
               (
                  <View>
                     <View style={styles.alimentosMainContainer} >
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}  bounces={false} >
                           {resultados.map(renderAlimentos)}
                        </ScrollView>
                     </View>
                  </View>
               )
               : (selectedTab == 'favoritos') ?
               (
                  <View>
                     <View style={styles.alimentosMainContainer} >
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}  bounces={false} >
                           {cachedAlimentosFavoritos.map(renderAlimentosFavoritos)}
                        </ScrollView>
                     </View>
                  </View>
               )
               : (nomeAlimentoBusca && resultados.length == 0 && !isLoading) ?
               (
                     <Text style={[
                        styles.subtitulo, 
                        { fontSize: 15, lineHeight:25, marginTop: getResponsiveSizeHeight(3), textAlign: 'center'}
                        ]}>
                           Nenhum resultado encontrado para "{nomeAlimentoBusca}"
                     </Text>
               )
               : null
            }
         </View>
         {showToast && (
        <ToastNotification
          message="Alimento Adicionado com Sucesso!"
          onHide={() => setShowToast(false)}
        />
      )}

      </View>
   );
};

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor,
   },
   headerContainer: {
      flexDirection: 'row',
      width: '95%',
      marginTop: getResponsiveSizeHeight(1.5),
      marginBottom: getResponsiveSizeHeight(0.5),
   },
   titulo: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(5.5),
      color: theme.colors.color05,
      marginLeft: getResponsiveSizeWidth(3),
      marginVertical: getResponsiveSizeWidth(1),
   },
   iconeFechar: {
      alignSelf: 'flex-start',
      marginLeft: 'auto',
      color: theme.colors.color05,
   },
   iconeAdd: {
      justifyContent: 'center',
      alignSelf: 'center',
      color: theme.colors.color05,
   },
   subtitulo: {
      fontFamily: 'NotoSans-Bold',
      color: theme.colors.color05,
      marginVertical: 'auto',
      fontSize: 12,
   },
   selectedSubtitulo: {
      color: theme.colors.color01,
    },
   searchBar: {
      width: '95%',
      fontFamily: 'NotoSans-Regular',
      fontSize: 12,
      minHeight: getResponsiveSizeHeight(5),
      borderRadius: getResponsiveSizeWidth(10),
      borderColor: theme.colors.color05,
      borderWidth: 2,
      paddingHorizontal: getResponsiveSizeWidth(5),
      color: theme.colors.color05,
      paddingVertical: getResponsiveSizeHeight(1.5),
   },
   alimentosMainContainer: {
      marginTop: getResponsiveSizeHeight(1),
      marginBottom: getResponsiveSizeHeight(30),
      width: '95%',
      flexDirection: 'column',
      marginHorizontal: 'auto',
   },
   alimentoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: getResponsiveSizeWidth(3),
      // borderTopWidth: 2,
      // borderLeftWidth: 2,
      // borderRightWidth: 2,
      borderBottomWidth: 1,
      borderColor: hexToRgba(theme.colors.color05, '0.5'),
   },
   alimentoFirstContainer: {
      borderTopWidth: 0,
   },
   infoAlimento: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: 13,
      color: theme.colors.color05,
   },
   buttonsContainer: {
      marginVertical: getResponsiveSizeHeight(1),
      minHeight: getResponsiveSizeHeight(5),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      borderColor: theme.colors.color05,
   },
   buttonContainer: {
      paddingVertical: getResponsiveSizeWidth(2),
      paddingHorizontal: getResponsiveSizeWidth(1.5),
      borderWidth: 2,
      borderRadius: getResponsiveSizeWidth(10),
      borderColor: theme.colors.color05,
   },
   buttonSelectedContainer: {
      borderWidth: 2,
      borderRadius: 20,
      borderColor: theme.colors.color05,
      backgroundColor: theme.colors.color05,
   }
});

export default SearchFoodScreen;