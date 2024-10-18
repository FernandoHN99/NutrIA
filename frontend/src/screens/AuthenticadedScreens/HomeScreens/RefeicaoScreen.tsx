import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import theme from '../../../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba, criarStrData, arredondarValores, capitalize } from '../../../utils/utils';
import ProgressCircle from '../../../components/ProgressCircle';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons02 from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from '../../../components/ProgressBar';
import { filtrarConsumoDia, filtrarConsumoRefeicao, somarMacrosDiaPorRefeicao } from '../../../utils/formatters';
import { useConsumoAlimentos } from '../../../api/httpState/usuarioData';
import { deletarAlimentoConsumidoService } from '../../../api/services/alimentoConsumoService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const WIDTH_PROGRESS_BAR = getResponsiveSizeWidth(35);
const HEIGHT_PROGRESS_BAR = getResponsiveSizeWidth(2);


const RefeicaoScreen = ({ route }: { route: any }) => {
   const { numeroRefeicao, perfilDia, diaSelecionado, refeicoesDiaAtivas } = route.params;

   const navigation = useNavigation();
   const queryClient = useQueryClient()
   const { data: consumoAlimentosCached } = useConsumoAlimentos({ enabled: false });

   const [loadingItemId, setLoadingItemId] = useState<number | null>(null);

   const infosDia = filtrarConsumoDia(consumoAlimentosCached, diaSelecionado);
   const consumoRefeicao = filtrarConsumoRefeicao(infosDia, numeroRefeicao);
   const [isLoading, setIsLoading] = useState(false);
   const macrosRefeicoes = somarMacrosDiaPorRefeicao(infosDia, refeicoesDiaAtivas);
   const macrosRefeicao = macrosRefeicoes[numeroRefeicao]

   const { mutateAsync: deletarAlimentoConsumidoServiceFn } = useMutation({
      mutationFn: deletarAlimentoConsumidoService,
      onSuccess(retorno, variables) {
         queryClient.setQueryData(['consumoAlimentos'], (consumoAlimentosCached: any[]) =>
            consumoAlimentosCached.filter((alimentoConsumido: any) =>
               alimentoConsumido.id_alimento_consumido !== variables.id_alimento_consumido
            )
         );
      },
      onError() {
         Alert.alert('Erro', 'Não foi possível realizar a alteração.',);
      },
      onMutate() {
         setIsLoading(true);
      },
      onSettled() {
         setIsLoading(false)
      },
   });

   const hanldeDeletarConsumo = async (id_alimento_consumido: number) => {
      setLoadingItemId(id_alimento_consumido);
      await deletarAlimentoConsumidoServiceFn({ id_alimento_consumido });
   }

   const handleGoBack = () => {
      navigation.goBack();
   };

   const renderConsumoAlimentos = (alimentoConsumidoItem: any, index: number) => {
      const { alimento, ...alimentoConsumido } = alimentoConsumidoItem;
      return (
         <TouchableOpacity
            style={[styles.alimentoConsumoContainer, 0 === index && styles.alimentoFirstContainer]}
            key={alimentoConsumido.dtt_alimento_consumido}
            //@ts-ignore
            onPress={() => navigation.push('AddConsumoScreen', { consumoAlimento: alimentoConsumidoItem, refeicao: macrosRefeicao })}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
               <View style={{ width: '68%' }}>
                  <Text style={[styles.infoAlimento]}>{alimento.nome_alimento} {alimento.estado_alimento != 'PADRAO' ? ` (${capitalize(alimento.estado_alimento)})` : ''}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 1 }}>
                     <Text style={[styles.textInfoAlimento, { fontFamily: 'NotoSans-Bold', color: 'black', fontSize: getResponsiveSizeWidth(4) }]}>{alimentoConsumido.qtde_utilizada}g -  </Text>
                     <Text style={styles.textInfoAlimento}>C: {arredondarValores(alimentoConsumido.qtde_carboidrato)}g   </Text>
                     <Text style={styles.textInfoAlimento}>P: {arredondarValores(alimentoConsumido.qtde_proteina)}g   </Text>
                     <Text style={styles.textInfoAlimento}>G: {arredondarValores(alimentoConsumido.qtde_gordura)}g</Text>
                  </View>
               </View>
               <View style={{ alignSelf: 'center' }}>
                  <Text style={[styles.textInfoAlimento, { fontFamily: 'NotoSans-SemiBold', color: 'black', fontSize: getResponsiveSizeWidth(4.2) }]}>{arredondarValores(alimentoConsumido.kcal)} kcal</Text>
               </View>
            </View>
            {loadingItemId === alimentoConsumido.id_alimento_consumido ? 
               <ActivityIndicator />
               :
               <Icons02 style={styles.iconeAdd} name="remove-circle" size={getResponsiveSizeWidth(7)} onPress={() => hanldeDeletarConsumo(alimentoConsumido.id_alimento_consumido)} />
            }
         </TouchableOpacity>
      )
   }


   return (
      <View style={{ backgroundColor: theme.colors.backgroundColor, flex: 1 }}>
         <View style={styles.mainPageContainer}>
            <View style={styles.headerContainer}>
               <View style={styles.containerTitulo}>
                  <Text style={styles.subtitulo}>Resumo - {macrosRefeicao.nome_refeicao}</Text>
               </View>
               <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                  <Icons name="close-circle" size={getResponsiveSizeHeight(3.5)} color={theme.colors.color05} />
               </TouchableOpacity>
            </View>
            <View style={styles.mainContentContainer}>
               <View style={styles.resumoContainer}>
                  <ProgressCircle
                     current={macrosRefeicao.totalKcal}
                     total={perfilDia.tmf}
                     bgColor={hexToRgba(theme.colors.color05, '0.3')}
                     progressColor={theme.colors.color05}
                     size={getResponsiveSizeHeight(15)}
                     thickness={10}
                  >
                     <View>
                        <Text style={[styles.infoCaloriasNumber, { fontSize: getResponsiveSizeWidth(5) }]}>{macrosRefeicao.totalKcal}</Text>
                        <Text style={[styles.infoText, { fontSize: getResponsiveSizeWidth(5) }]}>Kcal</Text>
                     </View>
                  </ProgressCircle>
                  <View style={styles.macrosContainer}>
                     <View>
                        <Text style={styles.infoText}>Carboidratos</Text>
                        <ProgressBar
                           current={macrosRefeicao.totalCarboidrato}
                           total={perfilDia.meta_carboidrato}
                           bgColor={hexToRgba(theme.colors.color05, '0.3')}
                           progressColor={theme.colors.color05}
                           width={WIDTH_PROGRESS_BAR}
                           height={HEIGHT_PROGRESS_BAR}
                           paddingValue={0}
                        />
                        <Text style={styles.infoText}>{`${macrosRefeicao.totalCarboidrato} / ${perfilDia.meta_carboidrato} g`}</Text>
                     </View>
                     <View>
                        <Text style={styles.infoText}>Proteínas</Text>
                        <ProgressBar
                           current={macrosRefeicao.totalProteina}
                           total={perfilDia.meta_proteina}
                           bgColor={hexToRgba(theme.colors.color05, '0.3')}
                           progressColor={theme.colors.color05}
                           width={WIDTH_PROGRESS_BAR}
                           height={HEIGHT_PROGRESS_BAR}
                           paddingValue={0}
                        />
                        <Text style={styles.infoText}>{`${macrosRefeicao.totalProteina} / ${perfilDia.meta_proteina} g`}</Text>
                     </View>
                     <View>
                        <Text style={styles.infoText}>Gorduras</Text>
                        <ProgressBar
                           current={macrosRefeicao.totalGordura}
                           total={perfilDia.meta_gordura}
                           bgColor={hexToRgba(theme.colors.color05, '0.3')}
                           progressColor={theme.colors.color05}
                           width={WIDTH_PROGRESS_BAR}
                           height={HEIGHT_PROGRESS_BAR}
                           paddingValue={0}
                        />
                        <Text style={styles.infoText}>{`${macrosRefeicao.totalGordura} / ${perfilDia.meta_gordura} g`}</Text>
                     </View>
                  </View>
               </View>
               <View style={styles.alimentoMainContainer}>
                  {consumoRefeicao.length > 0 ? (
                     <View style={styles.alimentosContainer}>
                        <Text style={styles.subtitulo}>Alimentos Consumidos</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: '73%' }} bounces={true} >
                           {consumoRefeicao.map(renderConsumoAlimentos)}
                        </ScrollView>
                     </View>
                  ) : (
                     <View>
                        { // @ts-ignore 
                           <TouchableOpacity style={styles.buttonAdicionar} onPress={() => navigation.push('SearchFoodScreen', { macrosRefeicao, diaSelecionado })}>
                              <Text style={styles.semAlimentosMsgButton}>Adicionar alimento</Text>
                           </TouchableOpacity>
                        }
                     </View>
                  )
                  }
               </View>
            </View>
         </View>
      </View>
   );
};


const styles = StyleSheet.create({
   mainPageContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor,
      width: '95%',
      marginHorizontal: 'auto',
   },
   headerContainer: {
      marginTop: getResponsiveSizeHeight(1.5),
      flexDirection: 'row',
      alignItems: 'center',
      height: getResponsiveSizeHeight(6),
      justifyContent: 'space-between',
   },
   button: {
      alignItems: 'flex-end',
      alignSelf: 'flex-start',
      marginRight: getResponsiveSizeWidth(5),
   },
   containerTitulo: {
      flex: 1,
      alignSelf: 'flex-end',
   },
   mainContentContainer: {
      flexDirection: 'column',
      width: '100%',
   },
   resumoContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      height: getResponsiveSizeHeight(20),
      backgroundColor: hexToRgba(theme.colors.color04, '0.1'),
      borderRadius: 20,
      borderWidth: 3,
      borderColor: hexToRgba(theme.colors.color05, '0.2'),
   },
   subtitulo: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeHeight(2.5),
      color: theme.colors.color05,
      marginLeft: getResponsiveSizeWidth(5),
      marginBottom: getResponsiveSizeHeight(0.5),
   },
   infoText: {
      textAlign: 'center',
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeHeight(1.6),
      color: hexToRgba(theme.colors.black, '0.8')
   },
   infoCaloriasNumber: {
      textAlign: 'center',
      fontSize: getResponsiveSizeHeight(2.1),
      fontFamily: 'NotoSans-Bold',
      color: hexToRgba(theme.colors.black, '0.8')
   },
   macrosContainer: {
      height: '85%',
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
   alimentoMainContainer: {
      marginTop: getResponsiveSizeHeight(1),
      marginBottom: getResponsiveSizeHeight(4),
   },
   alimentosContainer: {
      marginTop: getResponsiveSizeHeight(1),
   },
   alimentosContentContainer: {
      borderColor: theme.colors.color05,
      marginBottom: getResponsiveSizeHeight(60),
   },
   alimentoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: getResponsiveSizeWidth(3),
      paddingHorizontal: getResponsiveSizeWidth(5),
      borderColor: hexToRgba(theme.colors.color05, '0.5'),
      borderWidth: 2,
      backgroundColor: hexToRgba(theme.colors.color04, '0.2'),
      borderRadius: 10,
      marginBottom: getResponsiveSizeHeight(0.5),
   },
   alimentoLastContainer: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 2,
   },
   alimentoContentMacros: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   textNomeAlimento: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(3.7),
      color: hexToRgba(theme.colors.black, '0.8'),
   },
   textInfoAlimento: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(3.7),
      color: theme.colors.black,
   },
   numberInfoAlimento: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(4),
      textAlign: 'right',
   },
   semAlimentosContainer: {
      padding: getResponsiveSizeWidth(3),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      borderRadius: 20,
      borderColor: theme.colors.color05,
      borderWidth: 2,
   },
   buttonAdicionar: {
      marginTop: getResponsiveSizeHeight(1),
      padding: getResponsiveSizeWidth(3),
      backgroundColor: theme.colors.color05,
      borderRadius: 20,
      width: '99%',
      marginHorizontal: 'auto',
   },
   semAlimentosMsgButton: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(4.2),
      textAlign: 'center',
      color: theme.colors.color01,
   },
   iconeAdd: {
      justifyContent: 'center',
      alignSelf: 'center',
      color: theme.colors.color05,
   },
   alimentoConsumoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: getResponsiveSizeWidth(3),
      borderBottomWidth: 1,
      borderColor: hexToRgba(theme.colors.color05, '0.5'),
   },
   alimentoFirstContainer: {
      borderTopWidth: 0,
   },
   infoAlimento: {
      fontFamily: 'NotoSans-BoldItalic',
      fontSize: getResponsiveSizeWidth(4.2),
      color: theme.colors.color05,
   }

});

export default RefeicaoScreen;
