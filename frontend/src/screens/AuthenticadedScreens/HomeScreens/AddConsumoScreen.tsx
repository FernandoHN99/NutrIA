import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AlimentoSchema } from '../../../api/schemas/alimentoSchema';
import { AtualizarConsumoUsuarioSchema } from '../../../api/schemas/alimentoConsumidoSchema';
import { arredondarValores, criarStrData, getResponsiveSizeWidth, hexToRgba } from '../../../utils/utils';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { handleNumberInput } from '../../../utils/utils';
import PicklistSelector02 from '../../../components/Home/PicklistSelector02';
import { mapTamanhoDaPorcao, mapUnidadesDeMedida } from '../../../config/variaveis';
import PieChartOutline from '../../../components/Home/PieChartOutline';

interface Refeicao {
   numero_refeicao: number,
   nome_refeicao: string;
}
interface ConsumoAlimentoSchema extends AtualizarConsumoUsuarioSchema {
   alimento: AlimentoSchema;
}

interface AddConsumoScreenProps {
   alimento?: AlimentoSchema;
   consumoAlimento?: ConsumoAlimentoSchema;
   refeicao: Refeicao;
}

const inicializarConsumoUsuario = (alimento: AlimentoSchema, refeicao: Refeicao): ConsumoAlimentoSchema => {
   return {
      alimento: alimento,
      id_alimento: alimento.id_alimento,
      numero_refeicao: refeicao.numero_refeicao,
      id_prato: null,
      id_alimento_consumido: undefined,
      dt_dia: criarStrData(),
      unidade_medida: alimento.tabelasNutricionais[0].unidade_medida,
      porcao_padrao: alimento.tabelasNutricionais[0].porcao_padrao,
      qtde_utilizada: 1,
      qtde_proteina: alimento.tabelasNutricionais[0].qtde_proteina,
      qtde_carboidrato: alimento.tabelasNutricionais[0].qtde_carboidrato,
      qtde_gordura: alimento.tabelasNutricionais[0].qtde_gordura,
      qtde_alcool: alimento.tabelasNutricionais[0].qtde_alcool,
      kcal: alimento.tabelasNutricionais[0].kcal,
   }
}

const MAX_VALUES = {
   porcao_padrao: 1000,
   qtde_utilizada: 9999,
   qtde_proteina: 9999,
   qtde_carboidrato: 9999,
   qtde_gordura: 9999,
   qtde_alcool: 9999,
   kcal: 9999,
}

const COLORS_CHART = [theme.colors.color03, theme.colors.color04, theme.colors.color05];
const SIZE_CHART = getResponsiveSizeWidth(30);

const AddConsumoScreen = ({ route }: { route: any }) => {
   const navigation = useNavigation();
   const { alimento: inicialAlimento, consumoAlimento: inicialConsumoAlimento, refeicao }: AddConsumoScreenProps = route.params;
   const [consumoAlimento, setConsumoAlimento] = useState(inicialConsumoAlimento || inicializarConsumoUsuario(inicialAlimento!, refeicao));
   const [unidadesMedidaAlimento, setUnidadesMedidaAlimento] = useState<{ [key: string]: string } | null>(null);


   useEffect(() => {
      const unidadesValoresPermitidos = consumoAlimento.alimento.tabelasNutricionais.map(tabela => tabela.unidade_medida)
      const mapUnidadesMedidaPermitidas = Object.fromEntries(
         Object.entries(mapUnidadesDeMedida).filter(([_, valor]) =>
            unidadesValoresPermitidos.includes(valor)
         )
      );
      setUnidadesMedidaAlimento(mapUnidadesMedidaPermitidas);
   }, []);

   useEffect(() => {
      const novoConsumoAliemnto = { ...consumoAlimento };
      novoConsumoAliemnto.porcao_padrao = 0;
      novoConsumoAliemnto.qtde_utilizada = 0;
      setConsumoAlimento(novoConsumoAliemnto);
   }, [consumoAlimento.unidade_medida]);

   const handlerSetConsumoInputNumber = (valor: string, keyChange: keyof ConsumoAlimentoSchema) => {
      setConsumoAlimento(prevConsumo => ({
         ...prevConsumo,
         [keyChange]: valor.trim() !== '' ? valor : ''
      }));
   };

   if (!unidadesMedidaAlimento) return null;

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon name="arrow-back" size={30} color={theme.colors.color05} />
            </TouchableOpacity>
            <Text style={styles.title}>Adicionar Alimento</Text>
         </View>
         <View style={[styles.inputContainer, { borderWidth: 2 }]}>
            <Text style={styles.textInfo}>Nome do Alimento</Text>
            <Text style={[styles.textValue, {fontFamily: 'NotoSans-SemiBold'}]}>{consumoAlimento.alimento.nome_alimento}</Text>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Refeição</Text>
            <Text style={[styles.textValue, {fontFamily: 'NotoSans-SemiBold'}]}>{refeicao.nome_refeicao}</Text>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Unidade de Medida</Text>
            <PicklistSelector02
               initialOption={Object.keys(unidadesMedidaAlimento)[0]}
               onSelect={(valor: string) => setConsumoAlimento(prevConsumo => ({ ...prevConsumo, unidade_medida: unidadesMedidaAlimento[valor] }))}
               picklistOptions={Object.keys(unidadesMedidaAlimento)}
            />
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Tamanho da Porção</Text>
            <PicklistSelector02
               initialOption={(mapTamanhoDaPorcao[consumoAlimento.unidade_medida])[0]}
               onSelect={(valor: number) => setConsumoAlimento(prevConsumo => ({ ...prevConsumo, porcao_padrao: valor }))}
               picklistOptions={(mapTamanhoDaPorcao[consumoAlimento.unidade_medida])}
            />
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Quantidade de Porções</Text>
            <TextInput
               style={styles.textValue}
               keyboardType="numeric"
               value={consumoAlimento.qtde_utilizada.toString()}
               placeholder='Quantidade'
               maxLength={10}
               onChangeText={(valorTexto) =>
                  handlerSetConsumoInputNumber(
                     handleNumberInput(valorTexto, true, MAX_VALUES.qtde_utilizada, 1), 'qtde_utilizada')
               }
            />
         </View>
         <View style={styles.macrosMainContainer}>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>Macronutrientes</Text>
            <View style={styles.sumaryContainer}>
               <PieChartOutline
                  listColors={COLORS_CHART}
                  listValues={[consumoAlimento.qtde_carboidrato, consumoAlimento.qtde_proteina, consumoAlimento.qtde_gordura]}
                  sizeChart={SIZE_CHART}
                  thickness={0.75}>
                  <View>
                     <Text style={styles.chartText}>Kcal</Text>
                     <Text style={styles.chartText}>{arredondarValores(consumoAlimento.kcal)}</Text>
                  </View>
               </PieChartOutline>
               <View>
                  <View style={styles.macrosContainer}>
                     <Text style={[styles.textInfoMacros, { color: COLORS_CHART[0] }]}>Carboidratos</Text>
                     <Text style={styles.textValue}>{consumoAlimento.qtde_carboidrato}g 
                        -  {arredondarValores(((consumoAlimento.qtde_carboidrato*4)/consumoAlimento.kcal)*100)}%
                     </Text>
                  </View>
                  <View style={styles.macrosContainer}>
                     <Text style={[styles.textInfoMacros, { color: COLORS_CHART[1] }]}>Proteínas</Text>
                     <Text style={styles.textValue}>{consumoAlimento.qtde_proteina}g 
                        -  {arredondarValores(((consumoAlimento.qtde_proteina*4)/consumoAlimento.kcal)*100)}%
                     </Text>
                  </View>
                  <View style={styles.macrosContainer}>
                     <Text style={[styles.textInfoMacros, { color: COLORS_CHART[2] }]}>Gorduras</Text>
                     <Text style={styles.textValue}>{consumoAlimento.qtde_gordura}g 
                        -  {arredondarValores(((consumoAlimento.qtde_gordura*9)/consumoAlimento.kcal)*100)}%
                     </Text>
                  </View>
               </View>
            </View>
         </View>
      </View>

   )

};

const styles = StyleSheet.create({
   container: {
      backgroundColor: theme.colors.backgroundColor,
   },
   header: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
   },
   title: {
      flex: 0.95,
      fontSize: getResponsiveSizeWidth(5),
      fontFamily: 'NotoSans-Bold',
      color: theme.colors.color05,
      textAlign: 'center',
   },
   subtitle: {
      fontSize: getResponsiveSizeWidth(4.5),
      fontFamily: 'NotoSans-Bold',
      color: theme.colors.color05,
      textAlign: 'center',
   },
   textInfo: {
      fontSize: getResponsiveSizeWidth(4),
      fontFamily: 'NotoSans-SemiBold',
      color: theme.colors.black,
   },
   textValue: {
      fontSize: getResponsiveSizeWidth(4),
      fontFamily: 'NotoSans-SemiBoldItalic',
      color: theme.colors.color05,
      textAlign: 'center',
   },
   inputContainer: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderColor: hexToRgba(theme.colors.color05, '0.3'),
      fontSize: getResponsiveSizeWidth(4),
      fontFamily: 'NotoSans-Regular',
      color: theme.colors.color01,
      justifyContent: 'space-between',
   },
   macrosMainContainer: {
      marginVertical: 15,
      marginHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 25,
      backgroundColor: hexToRgba(theme.colors.color04, '0.1'),
      borderRadius: 20,
   },
   sumaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   macrosContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
   },
   textInfoMacros: {
      fontSize: getResponsiveSizeWidth(4),
      fontFamily: 'NotoSans-SemiBold',
      color: theme.colors.black,
      marginRight: 20,
   },
   chartText: { 
      color: theme.colors.black, 
      textAlign: 'center',
      fontSize: getResponsiveSizeWidth(4.3),
      fontFamily: 'NotoSans-SemiBold',
   }
});

export default AddConsumoScreen;
