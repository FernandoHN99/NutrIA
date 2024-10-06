import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native';
import theme from '../../../styles/theme';
import { usePerfisUsuario } from '../../../api/hooks/httpState/usuarioData';
import { criarPerfilSchema, Perfil } from '../../../api/schemas/perfilSchemas';
import PicklistSelector from '../../../components/Home/PicklistSelector';
import { mapNiveisDeAtividade, mapObjetivos, helperModalTexts } from '../../../config/variaveis';
import { encontrarChavePeloValorJSON, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba, validadeString } from '../../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import InfoHelper from '../../../components/InfoHelper';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { criarPerfilService } from '../../../api/services/perfilService';

const DadosPerfilScreen = () => {
   const navigation = useNavigation();
   const queryClient = useQueryClient()

   const { data: perfisUsuario } = usePerfisUsuario({ enabled: false });
   const [modalInfo, setModalInfo] = useState<boolean | { title: string, message: string }  >(false);
   const perfilUsuario: Perfil = perfisUsuario[perfisUsuario.length - 1];
   const [isLoading, setIsLoading] = useState(false);

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
            if(perfilUsuario.id_perfil != retorno.id_perfil){
               return [...data, retorno];
            }
            data = data.filter((perfil) => perfil.id_perfil != retorno.id_perfil);
            return [...data, retorno];
         });
         setIsLoading(false);
         Alert.alert('Sucesso', 'Seu perfil foi atualizado com sucesso');
      },
      onError(error) {
         setIsLoading(false);
         Alert.alert('Erro', 'Não foi atualizar seu novo perfil',);
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
      return anyDifferent && allValidStrings;
   };

   const allowButtonSalvar = allowSaveChanges()


   const perfilConfig: any = {
      peso_inicial: { label: 'Peso Atual (kg)', type: 'numeric', unidadeMedida: 'kg', maxValue: 300, maxLength: 3, allowDecimal: true, minValue: 1 },
      peso_final: { label: 'Meta de Peso (kg)', type: 'numeric', unidadeMedida: 'kg', maxValue: 300, maxLength: 3, allowDecimal: true, minValue: 1 },
      altura: { label: 'Altura (cm)', type: 'numeric', unidadeMedida: 'cm', maxValue: 300, maxLength: 3, allowDecimal: true, minValue: 1 },
      nivel_atividade: { label: 'Nível de Atividade', type: 'select', options: mapNiveisDeAtividade, modalText: helperModalTexts.nivelAtividade },
      objetivo: { label: 'Objetivo', type: 'select', options: mapObjetivos, modalText: helperModalTexts.objetivo },
      tmb: { label: 'TMB', type: 'numeric', unidadeMedida: 'kcal', maxValue: null, maxLength: 5, allowDecimal: false, minValue: 1, modalText: helperModalTexts.tmb },
      tmt: { label: 'TMT', type: 'numeric', unidadeMedida: 'kcal', maxValue: null, maxLength: 5, allowDecimal: false, minValue: 1, modalText: helperModalTexts.tmt },
      tmf: { label: 'TMF', type: 'numeric', unidadeMedida: 'kcal', maxValue: null, maxLength: 5, allowDecimal: false, minValue: 1, modalText: helperModalTexts.tmf },
      meta_proteina: { label: 'Meta de Proteína (g)', type: 'numeric', unidadeMedida: 'Gramas', maxValue: null, maxLength: 4, allowDecimal: false, minValue: 1 },
      meta_carboidrato: { label: 'Meta de Carboidrato (g)', type: 'numeric', unidadeMedida: 'Gramas', maxValue: null, maxLength: 4, allowDecimal: false, minValue: 1 },
      meta_gordura: { label: 'Meta de Gordura (g)', type: 'numeric', unidadeMedida: 'Gramas', maxValue: null, maxLength: 4, allowDecimal: false, minValue: 1 },
      proteina_peso: { label: 'Proteína / Peso', type: 'numeric', unidadeMedida: 'Gramas / kg', maxValue: 10, maxLength: 4, allowDecimal: true, minValue: 0 },
      carboidrato_peso: { label: 'Carboidrato / Peso', type: 'numeric', unidadeMedida: 'Gramas / kg', maxValue: 10, maxLength: 4, allowDecimal: true, minValue: 0 },
      gordura_peso: { label: 'Gordura / Peso', type: 'numeric', unidadeMedida: 'Gramas / kg', maxValue: 10, maxLength: 4, allowDecimal: true, minValue: 0 }
   };

   const handleNumberInput = (input: string, perfilCampo: string, allowDecimal: boolean, maxValue: number, minValue?: number) => {
      if (input === '') {
         setPerfil({ ...perfil, [perfilCampo]: ''});
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

      if(minValue){
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


   const renderField = (key: string) => {
      const configCampo = perfilConfig[key];
      switch (configCampo.type) {
         case 'numeric':
            return (
               <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={(perfil[key as keyof criarPerfilSchema]).toString()}
                  placeholder={configCampo['minValue'] >= 0 && configCampo['maxValue'] ? `${configCampo['minValue']} - ${configCampo['maxValue']}` : configCampo['unidadeMedida']}
                  maxLength={configCampo['maxLength']}
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
            {modalInfo ?  modalhelper() : null}
            <View style={styles.row}>
               {Object.keys(perfilConfig).map((chave, index) => (
                  <View key={index} style={styles.inputContainer}>
                     <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        {perfilConfig[chave]?.modalText &&
                           <Icon onPress={()=>(setModalInfo(perfilConfig[chave]?.modalText ))} name="information-circle" style={{ marginRight: 5 }} size={getResponsiveSizeHeight(2.7)} color={theme.colors.color05} />
                        }
                        <Text style={styles.label}>{perfilConfig[chave].label}</Text>
                     </View>
                     {renderField(chave)}
                  </View>
               ))}
            </View>
            
            <TouchableOpacity
               style={[styles.saveButtonNotAllowed, allowButtonSalvar && styles.saveButton]}
               onPress={allowButtonSalvar ? handleCriarNovoPerfl : undefined}
               disabled={!allowButtonSalvar}
            >
               {isLoading ? 
                  <ActivityIndicator size="small" color={theme.colors.color01} />
               : 
               <Text style={styles.saveButtonText}>Salvar</Text>
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
      fontWeight: 'bold',
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
   inputContainer: {
      width: '48%',
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
   saveButton: {
      backgroundColor: theme.colors.color05,
   },
   saveButtonNotAllowed: {
      marginBottom: getResponsiveSizeHeight(7),
      padding: 16,
      backgroundColor: hexToRgba(theme.colors.color05, '0.5'),
      borderRadius: 25,
      alignItems: 'center',
   },
   saveButtonText: {
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
