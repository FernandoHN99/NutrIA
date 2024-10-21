import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { AlimentoSchema, TabelaNutricional } from '../../../api/schemas/alimentoSchema';
import { AtualizarConsumoUsuarioSchema, ConsumoAlimentoSchema } from '../../../api/schemas/alimentoConsumidoSchema';
import { arredondarValores, calcularMacronutrientes, criarStrData, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba, limitarValor, validadeString } from '../../../utils/utils';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { handleNumberInput } from '../../../utils/utils';
import PicklistSelector02 from '../../../components/Home/PicklistSelector02';
import { mapTamanhoDaPorcao, mapUnidadesDeMedida } from '../../../config/variaveis';
import PieChartOutline from '../../../components/Home/PieChartOutline';
import { IMacronutrientes } from '../../../utils/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAlimentoConsumidoService, atualizarAlimentoConsumidoService } from '../../../api/services/alimentoConsumoService';

interface Refeicao {
   numero_refeicao: number,
   nome_refeicao: string;
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
      nome_consumo: null,
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
   qtdeUtilizada: 9999,
   kcal: 99999,
   macros: 99999
}

const COLORS_CHART = [theme.colors.color03, theme.colors.color04, theme.colors.color05, theme.colors.black];
const SIZE_CHART = getResponsiveSizeWidth(30);

const AddConsumoScreen = ({ route }: { route: any }) => {
   const queryClient = useQueryClient()
   const navigation = useNavigation();

   const { alimento: inicialAlimento, consumoAlimento: inicialConsumoAlimento, refeicao }: AddConsumoScreenProps = route.params;
   const [consumoAlimento, setConsumoAlimento] = useState(inicialConsumoAlimento || inicializarConsumoUsuario(inicialAlimento!, refeicao));
   const [unidadesMedidaAlimento, setUnidadesMedidaAlimento] = useState<{ [key: string]: string } | null>(null);
   const [tabelaPorcaoBase, setTabelaPorcaoBase] = useState<TabelaNutricional>(consumoAlimento.alimento.tabelasNutricionais.find(tabela => tabela.unidade_medida === consumoAlimento.unidade_medida)!);
   const [porcentagemMacros, setPorcentagemMacros] = useState<{ [key: string]: number } | null>(null);
   const [isLoading, setIsLoading] = useState(false);

   const { mutateAsync: addAlimentoConsumidoServiceFn } = useMutation({
      mutationFn: addAlimentoConsumidoService,
      onSuccess(retorno) {
         queryClient.setQueryData(['consumoAlimentos'], (data: any[]) =>{
            return [...data, retorno];
         });
         navigation.goBack();
      },
      onError() {
         Alert.alert('Erro', 'Não foi possível salvar a alteração.',);
      },
      onMutate() {
         setIsLoading(true);
      },
      onSettled() {
         setIsLoading(false)
      },
   });

   const { mutateAsync: atualizarAlimentoConsumidoServiceFn } = useMutation({
      mutationFn: atualizarAlimentoConsumidoService,
      onSuccess(retorno) {
         const cachedConsumoAlimentos: any[] = queryClient.getQueryData(['consumoAlimentos'])!;
         const updatedConsumoAlimentos = cachedConsumoAlimentos.map(consumo => {
            if (consumo.id_alimento_consumido === retorno.id_alimento_consumido) {
               return { ...consumo, ...retorno };
            }
            return consumo;
         });
         queryClient.setQueryData(['consumoAlimentos'], updatedConsumoAlimentos);
         navigation.goBack();
      },
      onError() {
         Alert.alert('Erro', 'Não foi possível salvar a alteração.',);
      },
      onMutate() {
         setIsLoading(true);
      },
      onSettled() {
         setIsLoading(false)
      },
   });

   useEffect(() => {
      const unidadesValoresPermitidos = consumoAlimento.alimento.tabelasNutricionais.map(tabela => tabela.unidade_medida)
      const mapUnidadesMedidaPermitidas = Object.fromEntries(
         Object.entries(mapUnidadesDeMedida).filter(([_, valor]) =>
            unidadesValoresPermitidos.includes(valor)
         )
      );
      const porcentagemMacrosValues = {
         porcentCarboidrato: limitarValor((arredondarValores(((tabelaPorcaoBase.qtde_carboidrato * 4) / tabelaPorcaoBase.kcal) * 100)), 0, 100),
         porcentProteina: limitarValor((arredondarValores(((tabelaPorcaoBase.qtde_proteina * 4) / tabelaPorcaoBase.kcal) * 100)), 0, 100),
         porcentAlcool: limitarValor((arredondarValores(((tabelaPorcaoBase.qtde_alcool * 7) / tabelaPorcaoBase.kcal) * 100)), 0, 100),
         porcentGordura: 0,
      }
      porcentagemMacrosValues.porcentGordura = limitarValor(
         100 - (porcentagemMacrosValues.porcentCarboidrato +
            porcentagemMacrosValues.porcentProteina +
            porcentagemMacrosValues.porcentAlcool
         ), 0, 100
      );
      setPorcentagemMacros(porcentagemMacrosValues);
      setUnidadesMedidaAlimento(mapUnidadesMedidaPermitidas);
   }, []);

   useEffect(() => {
      const novoConsumoAliemnto = { ...consumoAlimento };
      // @ts-ignore
      novoConsumoAliemnto.qtde_utilizada = '';
      setConsumoAlimento(novoConsumoAliemnto);
      setTabelaPorcaoBase(consumoAlimento.alimento.tabelasNutricionais.find(tabela => tabela.unidade_medida === consumoAlimento.unidade_medida)!);
   }, [consumoAlimento.unidade_medida]);

   useEffect(() => {
      const qtdeUtilizadaFinal = (consumoAlimento.qtde_utilizada ? consumoAlimento.qtde_utilizada : 1) * consumoAlimento.porcao_padrao;
      const macrosPorcaoBase: IMacronutrientes = {
         carboidratos: tabelaPorcaoBase!.qtde_carboidrato,
         proteinas: tabelaPorcaoBase!.qtde_proteina,
         gorduras: tabelaPorcaoBase!.qtde_gordura,
         alcool: tabelaPorcaoBase!.qtde_alcool,
         kcal: tabelaPorcaoBase!.kcal
      };
      const macrosPorPorcao = calcularMacronutrientes((tabelaPorcaoBase!.porcao_padrao), qtdeUtilizadaFinal, macrosPorcaoBase);
      const novoConsumoAliemnto = { ...consumoAlimento };
      novoConsumoAliemnto.qtde_carboidrato = macrosPorPorcao.carboidratos;
      novoConsumoAliemnto.qtde_proteina = macrosPorPorcao.proteinas;
      novoConsumoAliemnto.qtde_gordura = macrosPorPorcao.gorduras;
      novoConsumoAliemnto.qtde_alcool = macrosPorPorcao.alcool;
      novoConsumoAliemnto.kcal = macrosPorPorcao.kcal;
      setConsumoAlimento(novoConsumoAliemnto);
   }, [consumoAlimento.qtde_utilizada, consumoAlimento.porcao_padrao]);


   const handlerSetConsumoInputNumber = (valor: string, keyChange: keyof ConsumoAlimentoSchema) => {
      setConsumoAlimento(prevConsumo => ({
         ...prevConsumo,
         [keyChange]: valor.trim() !== '' ? Number(valor) : ''
      }));
   };

   const handleSalvarSolicitacao = async () => {
      if(consumoAlimento.id_alimento_consumido){
         atualizarAlimentoConsumidoServiceFn(consumoAlimento);
         return;
      }
      await addAlimentoConsumidoServiceFn(consumoAlimento);
   };


   const allowButtonSalvar = () =>{
      let anyDifferent = true;
      if(inicialConsumoAlimento){
         anyDifferent = Object.keys(consumoAlimento).some((key) => {
            const currentValue = consumoAlimento[key as keyof ConsumoAlimentoSchema];
            const originalValue = inicialConsumoAlimento[key as keyof ConsumoAlimentoSchema];
            return currentValue != originalValue;
         });
      }
      const valideConsumoValues = 
         (consumoAlimento.qtde_utilizada > 0 && consumoAlimento.qtde_utilizada <= MAX_VALUES.qtdeUtilizada) &&
         (consumoAlimento.kcal > 0 && consumoAlimento.kcal <= MAX_VALUES.kcal) && 
         (consumoAlimento.qtde_carboidrato > 0 && consumoAlimento.qtde_carboidrato <= MAX_VALUES.macros) &&
         (consumoAlimento.qtde_proteina > 0 && consumoAlimento.qtde_proteina <= MAX_VALUES.macros) &&
         (consumoAlimento.qtde_gordura > 0 && consumoAlimento.qtde_gordura <= MAX_VALUES.macros) &&
         (consumoAlimento.qtde_alcool >= 0 && consumoAlimento.qtde_alcool <= MAX_VALUES.macros);
      return anyDifferent && valideConsumoValues;
   }

   const allowSalvar = allowButtonSalvar();

   if (!unidadesMedidaAlimento || !porcentagemMacros) return null;

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
            <Text style={[styles.textValue, { fontFamily: 'NotoSans-SemiBold' }]}>{consumoAlimento.alimento.nome_alimento}</Text>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Refeição</Text>
            <Text style={[styles.textValue, { fontFamily: 'NotoSans-SemiBold' }]}>{refeicao.nome_refeicao}</Text>
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Unidade de Medida</Text>
            <PicklistSelector02
               initialOption={Object.keys(unidadesMedidaAlimento).find(key => unidadesMedidaAlimento[key] === consumoAlimento.unidade_medida)!}
               onSelect={(valor: string) => setConsumoAlimento(prevConsumo => ({ ...prevConsumo, unidade_medida: unidadesMedidaAlimento[valor] }))}
               picklistOptions={Object.keys(unidadesMedidaAlimento)}
            />
         </View>
         <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Tamanho da Porção</Text>
            <PicklistSelector02
               initialOption={consumoAlimento.porcao_padrao.toString()}
               onSelect={(valor: number) => setConsumoAlimento(prevConsumo => ({ ...prevConsumo, porcao_padrao: Number(valor) }))}
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
                     handleNumberInput(valorTexto, true, MAX_VALUES.qtdeUtilizada, 0), 'qtde_utilizada')
               }
            />
         </View>
         <View style={styles.macrosMainContainer}>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>Macronutrientes</Text>
            <View style={styles.sumaryContainer}>
               <PieChartOutline
                  listColors={COLORS_CHART}
                  listValues={[porcentagemMacros.porcentCarboidrato, porcentagemMacros.porcentProteina, porcentagemMacros.porcentGordura, porcentagemMacros.porcentAlcool]}
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
                        {porcentagemMacros.porcentCarboidrato > 0 && ` -  ${porcentagemMacros.porcentCarboidrato}%`}
                     </Text>
                  </View>
                  <View style={styles.macrosContainer}>
                     <Text style={[styles.textInfoMacros, { color: COLORS_CHART[1] }]}>Proteínas</Text>
                     <Text style={styles.textValue}>{consumoAlimento.qtde_proteina}g
                        {porcentagemMacros.porcentProteina > 0 && ` -  ${porcentagemMacros.porcentProteina}%`}
                     </Text>
                  </View>
                  <View style={styles.macrosContainer}>
                     <Text style={[styles.textInfoMacros, { color: COLORS_CHART[2] }]}>Gorduras</Text>
                     <Text style={styles.textValue}>{consumoAlimento.qtde_gordura}g
                        {porcentagemMacros.porcentGordura > 0 && ` -  ${porcentagemMacros.porcentGordura}%`}
                     </Text>
                  </View>
                  {consumoAlimento.qtde_alcool > 0 &&
                     <View style={styles.macrosContainer}>
                        <Text style={[styles.textInfoMacros, { color: COLORS_CHART[3] }]}>Alcool</Text>
                        <Text style={styles.textValue}>{consumoAlimento.qtde_alcool}g
                           -  {porcentagemMacros.porcentAlcool}%
                        </Text>
                     </View>}
               </View>
            </View>
         </View>
         <TouchableOpacity
            style={[styles.buttonNotAllowed, allowSalvar && styles.button]}
            onPress={() => handleSalvarSolicitacao()}
            disabled={!allowSalvar || isLoading}
         >
            {isLoading ?
               <ActivityIndicator size="small" color={theme.colors.color01} />
               :
               <Text style={styles.buttonText}>Salvar</Text>}
         </TouchableOpacity>
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
      borderWidth: 2,
      borderColor: hexToRgba(theme.colors.color05, '0.2'),
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
   },
   buttonNotAllowed: {
      padding: 16,
      backgroundColor: hexToRgba(theme.colors.color05, '0.5'),
      borderRadius: 25,
      alignItems: 'center',
      width: '95%',
      alignSelf: 'center',
   },
   buttonText: {
      color: theme.colors.color01,
      fontWeight: 'bold',
      fontSize: 16,
   },
   button: {
      backgroundColor: theme.colors.color05,
   },
});

export default AddConsumoScreen;
