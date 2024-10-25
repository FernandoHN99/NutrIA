import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native';
import theme from '../../../styles/theme';
import { usePerfisUsuario, useUsuarioInfo } from '../../../api/httpState/usuarioData';
import { criarPerfilSchema, Perfil } from '../../../api/schemas/perfilSchemas';
import PicklistSelector from '../../../components/Home/PicklistSelector';
import { mapNiveisDeAtividade, mapObjetivos, helperModalTexts, mapMultNiveisDeAtividade } from '../../../config/variaveis';
import { arredondarValores, calcularIdade, calcularPesoCarboidrato, calcularTMB, calcularTMF, calcularTMT, encontrarChavePeloValorJSON, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba, validadeString } from '../../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import InfoHelper from '../../../components/InfoHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { criarPerfilService } from '../../../api/services/perfilService';


const DadosPerfilScreen = () => {
   const navigation = useNavigation();
   const queryClient = useQueryClient()

   const { data: perfisUsuario } = usePerfisUsuario({ enabled: false });
   const { data: dadosUsuario } = useUsuarioInfo({ enabled: false });

   const [modalInfo, setModalInfo] = useState<boolean | { title: string, message: string }>(false);
   const perfilUsuario: Perfil = perfisUsuario[perfisUsuario.length - 1];
   const [isLoading, setIsLoading] = useState(false);
   const isFirstRender = useRef(true);

   const [perfil, setPerfil] = useState<criarPerfilSchema>({
      peso_inicial: perfilUsuario.peso_inicial,
      peso_final: perfilUsuario.peso_final,
      altura: perfilUsuario.altura,
      nivel_atividade: perfilUsuario.nivel_atividade,
      objetivo: perfilUsuario.objetivo,
      tmb: perfilUsuario.tmb,
      tmt: perfilUsuario.tmt,
      tmf: perfilUsuario.tmf,
      meta_proteina: perfilUsuario.meta_proteina,
      meta_carboidrato: perfilUsuario.meta_carboidrato,
      meta_gordura: perfilUsuario.meta_gordura,
      proteina_peso: perfilUsuario.proteina_peso,
      carboidrato_peso: perfilUsuario.carboidrato_peso,
      gordura_peso: perfilUsuario.gordura_peso,
   });

   const { mutateAsync: criarPerfilServiceFn } = useMutation({
      mutationFn: criarPerfilService,
      onSuccess(retorno: Perfil) {
         queryClient.setQueryData(['perfisUsuario'], (data: Perfil[]) => {
            if (perfilUsuario.id_perfil != retorno.id_perfil) {
               return [...data, retorno];
            }
            data = data.filter((perfil) => perfil.id_perfil != retorno.id_perfil);
            return [...data, retorno];
         });
         setIsLoading(false);
         Alert.alert('Sucesso', 'Seu perfil foi atualizado.');
      },
      onError() {
         setIsLoading(false);
         Alert.alert('Erro', 'Não foi possível atualizar seu perfil.',);
      },
      onMutate() {
         setIsLoading(true);
      },
   });

   const handleCriarNovoPerfl = async () => {
      await criarPerfilServiceFn(perfil);
   };

   const modalhelper = () => {
      const helperTitle = typeof modalInfo === 'object' ? modalInfo.title : '';
      const helperText = typeof modalInfo === 'object' ? modalInfo.message : '';
      return (
         <Modal transparent={true} animationType="fade">
            <View style={styles.modalHelperContainer}>
               <View style={styles.helperComponentContainer}>
                  <InfoHelper onClose={() => setModalInfo(false)} titleText={helperTitle} contentText={helperText} />
               </View>
            </View>
         </Modal>
      )
   }

   const calcularMaxMacros = () => {
      const maxCarboidrato = arredondarValores((perfil.tmf - (perfil.meta_proteina * 4 + perfil.meta_gordura * 9)) / 4);
      const maxProteina = arredondarValores((perfil.tmf - (perfil.meta_carboidrato * 4 + perfil.meta_gordura * 9)) / 4);
      const maxGordura = arredondarValores((perfil.tmf - (perfil.meta_carboidrato * 4 + perfil.meta_proteina * 4)) / 9);
      return { maxCarboidrato, maxProteina, maxGordura };
   };
   const maxMacros = calcularMaxMacros();


   const perfilConfig: any = {
      peso_inicial: { label: 'Peso Atual (kg)', type: 'numeric', unidadeMedida: 'kg', maxValue: 200, maxLength: 3, allowDecimal: true, minValue: 1, editable: true },
      peso_final: { label: 'Peso Ideal (kg)', type: 'numeric', unidadeMedida: 'kg', maxValue: 300, maxLength: 3, allowDecimal: true, minValue: 1, editable: true },
      altura: { label: 'Altura (cm)', type: 'numeric', unidadeMedida: 'cm', maxValue: 300, maxLength: 3, allowDecimal: true, minValue: 1, editable: true },
      nivel_atividade: { label: 'Nível de Atividade', type: 'select', options: mapNiveisDeAtividade, modalText: helperModalTexts.nivelAtividade, editable: true },
      objetivo: { label: 'Objetivo', type: 'select', options: mapObjetivos, modalText: helperModalTexts.objetivo, editable: true },
      tmb: { label: 'TMB', type: 'numeric', unidadeMedida: 'kcal', maxValue: null, maxLength: 5, allowDecimal: false, minValue: 1, modalText: helperModalTexts.tmb, editable: true },
      // tmt: { label: 'TMT', type: 'numeric', unidadeMedida: 'kcal', maxValue: null, maxLength: 5, allowDecimal: false, minValue: 1, modalText: helperModalTexts.tmt, editable: true },
      tmf: { label: 'TMF', type: 'numeric', unidadeMedida: 'kcal', maxValue: null, maxLength: 5, allowDecimal: false, minValue: 1, modalText: helperModalTexts.tmf, editable: true },
      meta_carboidrato: { label: 'Meta de Carboidrato (g)', type: 'numeric', unidadeMedida: 'Gramas', maxValue: maxMacros.maxCarboidrato, maxLength: 4, allowDecimal: false, minValue: 0, editable: true },
      meta_proteina: { label: 'Meta de Proteína (g)', type: 'numeric', unidadeMedida: 'Gramas', maxValue: maxMacros.maxProteina, maxLength: 4, allowDecimal: false, minValue: 0, editable: true },
      meta_gordura: { label: 'Meta de Gordura (g)', type: 'numeric', unidadeMedida: 'Gramas', maxValue: maxMacros.maxGordura, maxLength: 4, allowDecimal: false, minValue: 0, editable: true },
      carboidrato_peso: { label: 'Carboidrato / Peso', type: 'numeric', unidadeMedida: 'Gramas / kg', maxLength: 4, allowDecimal: true, minValue: 0, editable: false, valor: arredondarValores(perfil.meta_carboidrato / perfil.peso_inicial, 1) },
      proteina_peso: { label: 'Proteína / Peso', type: 'numeric', unidadeMedida: 'Gramas / kg', maxLength: 4, allowDecimal: true, minValue: 0, editable: false, valor: arredondarValores(perfil.meta_proteina / perfil.peso_inicial, 1) },
      gordura_peso: { label: 'Gordura / Peso', type: 'numeric', unidadeMedida: 'Gramas / kg', maxLength: 4, allowDecimal: true, minValue: 0, editable: false, valor: arredondarValores(perfil.meta_gordura / perfil.peso_inicial, 1) },
   };

   const handleNumberInput = (input: string, perfilCampo: string, allowDecimal: boolean, maxValue: number, minValue?: number) => {
      if (input === '') {
         setPerfil({ ...perfil, [perfilCampo]: '' });
         return;
      }
      let numericText = '';

      if (allowDecimal) {
         numericText = input.replace(/[^0-9.]/g, '');

         const parts = numericText.split('.');
         if (parts.length > 2) {
            numericText = parts.shift() + '.' + parts.join('');
         }
         numericText = numericText.replace(/(\..*)\./g, '$1');
      } else {
         numericText = input.replace(/[^0-9]/g, '');
      }

      if (maxValue) {
         const numericValue = parseFloat(numericText);
         if (!isNaN(numericValue) && numericValue > maxValue) {
            numericText = maxValue.toString();
         }
      }

      if (minValue) {
         const numericValue = parseFloat(numericText);
         if (!isNaN(numericValue) && numericValue < minValue) {
            numericText = minValue.toString();
         }
      }
      setPerfil({ ...perfil, [perfilCampo]: Number(numericText) });
   };

   const handlePicklistInput = (perfilCampo: string, valor: string) => {
      setPerfil({ ...perfil, [perfilCampo]: valor });
   };

   const calcularMetas = () => {
      const newPerfil = { ...perfil };
      console.log('newPerfil', newPerfil)
      console.log('dadosUsuario', dadosUsuario)
      const idade: number = calcularIdade(dadosUsuario.dt_nascimento);
      const ajusteCalorico: number = perfil.objetivo == 'GANHO' ? 300 : 0.8;
      newPerfil.tmb = arredondarValores(calcularTMB(idade, newPerfil.peso_inicial, newPerfil.altura, dadosUsuario.sexo));
      newPerfil.tmt = arredondarValores(calcularTMT(newPerfil.tmb, mapMultNiveisDeAtividade[newPerfil.nivel_atividade]));
      newPerfil.tmf = arredondarValores(calcularTMF(newPerfil.tmt, newPerfil.objetivo, ajusteCalorico));
      newPerfil.proteina_peso = newPerfil.objetivo == 'GANHO' ? 2.1 : 2.5;
      newPerfil.gordura_peso = dadosUsuario.sexo == 'H' ? 0.6 : 0.9;
      newPerfil.carboidrato_peso = arredondarValores(
         calcularPesoCarboidrato(newPerfil.tmf, newPerfil.peso_inicial, newPerfil.proteina_peso, newPerfil.gordura_peso), 1
      );
      newPerfil.meta_proteina = arredondarValores(newPerfil.proteina_peso * newPerfil.peso_inicial);
      newPerfil.meta_gordura = arredondarValores(newPerfil.gordura_peso * newPerfil.peso_inicial);
      newPerfil.meta_carboidrato = arredondarValores((newPerfil.tmf - (newPerfil.meta_proteina * 4 + newPerfil.meta_gordura * 9)) / 4);

      return newPerfil;
   }

   const allowSaveChanges = (): boolean => {
      const anyDifferent = Object.keys(perfil).some((key) => {
         const currentValue = perfil[key as keyof criarPerfilSchema];
         const originalValue = perfilUsuario[key as keyof criarPerfilSchema];
         return currentValue != originalValue;
      });
      const allValidStrings = Object.keys(perfil).every((key) => {
         const currentValue = perfil[key as keyof criarPerfilSchema];
         return validadeString(currentValue.toString());
      });
      if (anyDifferent && allValidStrings) {
         const diffMacrosTMF = Math.abs(perfil.tmf - (perfil.meta_carboidrato * 4 + perfil.meta_proteina * 4 + perfil.meta_gordura * 9))
         return diffMacrosTMF < 4;
      }
      return false;;
   };

   const allowCalcularMetas = () => {
      const calculoPerfilFormula = calcularMetas()
      return JSON.stringify(calculoPerfilFormula) === JSON.stringify(perfil);
   }

   const allowButtonSalvar = allowSaveChanges()
   const allowButtonCalcular = allowCalcularMetas()

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }
      if (!allowButtonCalcular) {
         const newPerfil = { ...perfil };
         // @ts-ignore
         newPerfil.meta_carboidrato = '';
         // @ts-ignore
         newPerfil.meta_proteina = '';
         // @ts-ignore
         newPerfil.meta_gordura = '';
         setPerfil(newPerfil);
      }
   }, [perfil.tmf]);

   const determinarFlexBasis = (index: number, chave: string) => {
      const flexBasisMedio = [3, 4, 5, 6];
      if (flexBasisMedio.includes(index)) {
         return '48%';
      } else {
         return '30%';
      }
   };

   const handleCalcularMetas = () => {
      const novoPerfil = calcularMetas();
      if (novoPerfil.meta_carboidrato < 0 || novoPerfil.meta_proteina < 0 || novoPerfil.meta_gordura < 0) {
         Alert.alert('Erro ao calcular suas metas', 'Verifique os valores informados.');
         return;
      }
      setPerfil(novoPerfil);
   }


   const renderField = (key: string) => {
      const configCampo = perfilConfig[key];
      const valorCampo = perfil[key as keyof criarPerfilSchema];
      switch (configCampo.type) {
         case 'numeric':
            return (
               <TextInput
                  style={[styles.input, !configCampo['editable'] && { color: hexToRgba(theme.colors.black, '0.6') }]}
                  keyboardType="numeric"
                  value={configCampo['editable'] ? valorCampo.toString() : configCampo['valor'].toString()}
                  placeholder={configCampo['minValue'] >= 0 && configCampo['maxValue'] ? `${configCampo['minValue']} - ${configCampo['maxValue']}` : configCampo['unidadeMedida']}
                  maxLength={configCampo['maxLength']}
                  editable={configCampo['editable']}
                  onChangeText={(valorTexto) => handleNumberInput(valorTexto, key, configCampo['allowDecimal'], configCampo['maxValue'], configCampo['minValue'])}
               />
            );
         case 'select':
            return (
               <View style={styles.input}>
                  <PicklistSelector
                     initialOption={encontrarChavePeloValorJSON(configCampo.options, perfil[key as keyof criarPerfilSchema])}
                     onSelect={(valor: string) => handlePicklistInput(key, valor)}
                     picklistOptions={configCampo.options}
                  />
               </View>
            );
      }
   };

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon name="arrow-back" size={30} color={theme.colors.color05} />
            </TouchableOpacity>
            <Text style={styles.title}>Configurações de Perfil</Text>
         </View>
         <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {modalInfo ? modalhelper() : null}
            <View style={styles.row}>
               {Object.keys(perfilConfig).map((chave, index) => (
                  <View key={index} style={[{ flexBasis: determinarFlexBasis(index, chave) }]}>
                     <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        {perfilConfig[chave]?.modalText && (
                           <Icon
                              onPress={() => (setModalInfo(perfilConfig[chave]?.modalText))}
                              name="information-circle"
                              style={{ marginRight: 5 }}
                              size={getResponsiveSizeHeight(2.7)}
                              color={theme.colors.color05}
                           />
                        )}
                        <Text style={styles.label}>{perfilConfig[chave].label}</Text>
                     </View>
                     {renderField(chave)}
                  </View>
               ))}
            </View>

            <TouchableOpacity
               style={[{ marginBottom: getResponsiveSizeHeight(2) }, styles.buttonNotAllowed, !allowButtonCalcular && styles.button]}
               onPress={handleCalcularMetas}
               disabled={allowButtonCalcular}
            >
               <Text style={styles.buttonText}>Calcular Metas</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[{ marginBottom: getResponsiveSizeHeight(7) }, styles.buttonNotAllowed, allowButtonSalvar && styles.button]}
               onPress={handleCriarNovoPerfl}
               disabled={!allowButtonSalvar || isLoading}
            >
               {isLoading ?
                  <ActivityIndicator size="small" color={theme.colors.color01} />
                  :
                  <Text style={styles.buttonText}>Salvar</Text>
               }
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 16,
      backgroundColor: theme.colors.backgroundColor,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '95%',
      marginBottom: 25,
   },
   title: {
      flex: 0.95,
      fontSize: getResponsiveSizeWidth(5),
      fontFamily: 'NotoSans-Bold',
      color: theme.colors.color05,
      textAlign: 'center',
   },
   row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 12,
   },
   label: {
      fontSize: getResponsiveSizeWidth(3.5),
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.color05,
      textAlign: 'center',
   },
   input: {
      padding: 8,
      borderWidth: 1,
      borderColor: theme.colors.color05,
      borderRadius: 25,
      backgroundColor: theme.colors.color01,
      fontSize: getResponsiveSizeWidth(3.8),
      color: theme.colors.black,
      textAlign: 'center',
      marginBottom: 16,
   },
   button: {
      backgroundColor: theme.colors.color05,
   },
   buttonNotAllowed: {
      padding: 16,
      backgroundColor: hexToRgba(theme.colors.color05, '0.5'),
      borderRadius: 25,
      alignItems: 'center',
   },
   buttonText: {
      color: theme.colors.color01,
      fontWeight: 'bold',
      fontSize: 16,
   },
   modalHelperContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: hexToRgba(theme.colors.black, '0.4'),
   },
   helperComponentContainer: {
      borderRadius: 10,
      alignItems: 'center',
      width: '90%',
   },
});

export default DadosPerfilScreen;
