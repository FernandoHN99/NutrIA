import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import theme from '../../../styles/theme';
import DiaScroll from '../../../components/Home/DiaScroll';
import { criarStrData, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba, transformDateIntoString, validarNumero, validarNumeroMaiorZero } from '../../../utils/utils';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useMutation, useQueryClient } from '@tanstack/react-query';
import { useDiasUsuario } from '../../../api/httpState/usuarioData';
import { salvarDiaSchema } from '../../../api/schemas/diaSchema';
import * as ImagePicker from 'expo-image-picker';
import { deletarDiaService, salvarDiaService } from '../../../api/services/diaService';

const formatarData = (dataDia: string) => {
   if (!dataDia) return '-';
   const [ano, mes, dia] = dataDia.split('-');
   return `${dia}-${mes}-${ano}`;
};
const ICON_SIZE = getResponsiveSizeWidth(7);
const MAX_VALUE = 999.9;

const EvolucaoScreen: React.FC = () => {
   const { data: diasUsuarioCached }: { data: salvarDiaSchema[] | undefined } = useDiasUsuario({ enabled: false });
   const [diaSelecionado, setDiaSelecionado] = useState<string>(criarStrData());
   const [dadosDia, setDadosDia] = useState<salvarDiaSchema | null>(null);
   const [dadosDiaEditavel, setDadosDiaEditavel] = useState<salvarDiaSchema | null>(null);

   const queryClient = useQueryClient()

   const pegarDadosDia = (): salvarDiaSchema => {
      const dadosDiaContent =  (diasUsuarioCached?.find((dia: salvarDiaSchema) => dia.dt_dia === diaSelecionado));
      return dadosDiaContent ? dadosDiaContent : {dt_dia: diaSelecionado, foto_dia: null, medida_abdomen_dia: null, peso_dia: null};
   }

   const avancarDia = () => {
      const newData = new Date(diaSelecionado);
      newData.setDate(newData.getDate() + 1);
      setDiaSelecionado(transformDateIntoString(newData));
   }

   const voltarDia = () => {
      const newData = new Date(diaSelecionado);
      newData.setDate(newData.getDate() - 1);
      setDiaSelecionado(transformDateIntoString(newData));
   }

   const setDadosContent = (dadosDiaContent: salvarDiaSchema) => {
      setDadosDia(dadosDiaContent);
      setDadosDiaEditavel(dadosDiaContent);
   }

   useEffect(() => {
      const dadosDiaContent = pegarDadosDia();
      setDadosContent(dadosDiaContent);

   }, [diaSelecionado]);


   const handleSelectImage = async () => {
      // Solicitar permissão para acessar a galeria
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
         alert('Desculpe, precisamos de permissão para acessar suas fotos!');
         return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [3, 4],
         quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
         // TODO: Implementar lógica para salvar a foto no backend
         console.log('Foto selecionada:', result.assets[0].uri);
      }
   };

   const renderFotoContent = () => {

      if (dadosDia?.foto_dia) {
         return (
            <Image
               source={{ uri: dadosDia.foto_dia }}
               style={{ width: '100%', height: '100%' }}
               resizeMode='contain'
            />
         );
      }

      return (
         <View
            style={[styles.ctnImagemContent, styles.ctnSemFotoFilho]}
         >
            <TouchableOpacity
               style={styles.addPhotoContent}
               onPress={handleSelectImage}>
               <Icons
                  name="add-a-photo"
                  size={ICON_SIZE * 1.2}
                  color={theme.colors.color05}
               />
               <Text style={styles.addPhotoText}>Adicionar foto</Text>
            </TouchableOpacity>
         </View>
      );
   };

   const { mutateAsync: salvarDiaServiceFn } = useMutation({
      mutationFn: salvarDiaService,
      onSuccess(retorno) {
         const updatedDiaUsuario = diasUsuarioCached?.map(diaUsuario => {
            if (diaUsuario.dt_dia === retorno.dt_dia) {
               return { ...diaUsuario, ...retorno };
            }
            return diaUsuario;
         });
         queryClient.setQueryData(['diasUsuario'], updatedDiaUsuario);
         setDadosContent(retorno);
      },
      onError() {
         Alert.alert('Erro', 'Não foi possível salvar a alteração.',);
      }
   });


   const handleSubmitData = async () => {
      const anyDifferent = Object.keys(dadosDiaEditavel!).some((key) => {
         const currentValue = dadosDiaEditavel![key as keyof salvarDiaSchema];
         const originalValue = dadosDia![key as keyof salvarDiaSchema];
         return currentValue != originalValue;
      });
      anyDifferent && await salvarDiaServiceFn(dadosDiaEditavel!);
   };

   const handleShowData = (valorNumerico: any) => {
      return (valorNumerico == null || valorNumerico == undefined || valorNumerico == '' || valorNumerico== '-') ? '-' : String(valorNumerico);
   };

   const handleSetData = (chave: any, valor: string) => {
      const valorNumerico = Math.abs(Number(valor));
      if(validarNumeroMaiorZero(valorNumerico) && valorNumerico <= MAX_VALUE){
         setDadosDiaEditavel({ ...dadosDiaEditavel!, [chave]: valorNumerico });
      }else{
         setDadosDiaEditavel({ ...dadosDiaEditavel!, [chave]:  null });
      }
   }

   if(!dadosDiaEditavel && !dadosDia){
      return null;
   }

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
         <DiaScroll diaSelecionado={diaSelecionado} setDiaSelecionado={setDiaSelecionado} numeroDiasFuturos={0} />
         <View style={styles.containerContentMain}>
            <View style={styles.ctnFoto}>
               <Icons
                  name="arrow-back-ios"
                  color={theme.colors.color05}
                  size={ICON_SIZE}
                  onPress={voltarDia}
               />
               <View style={styles.ctnImagemContent}>
                  {renderFotoContent()}
               </View>
               <Icons
                  style={{ transform: [{ rotate: '180deg' }] }}
                  color={theme.colors.color05}
                  name="arrow-back-ios"
                  size={ICON_SIZE}
                  onPress={avancarDia}
               />
            </View>
            <View style={styles.ctnInfoUsuario}>
               <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Data</Text>
                  <Text style={[styles.tableContent, {backgroundColor: 'transparent'}]}>
                     {formatarData(diaSelecionado)}
                  </Text>
               </View>
               <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Peso</Text>
                  <View style={styles.inputWithUnit}>
                     <TextInput
                        style={styles.tableContent}
                        value={handleShowData(dadosDiaEditavel?.peso_dia)}
                        onChangeText={text => handleSetData('peso_dia', text)}
                        keyboardType="numeric"
                     onEndEditing={handleSubmitData}
                     />
                     <Text style={styles.unitText}> kg</Text>
                  </View>
               </View>
               <View style={[styles.tableRow, {borderBottomWidth: 0}]}>
                  <Text style={styles.tableHeader}>Medida Abdômen</Text>
                  <View style={styles.inputWithUnit}>
                     <TextInput
                        style={styles.tableContent}
                        value={handleShowData(dadosDiaEditavel?.medida_abdomen_dia)}
                        onChangeText={text => handleSetData('medida_abdomen_dia', text)}
                        onEndEditing={handleSubmitData}
                        keyboardType="numeric"
                     />
                     <Text style={styles.unitText}>cm</Text>
                  </View>
               </View>
            </View>
         </View>
      </View>
      </TouchableWithoutFeedback>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
   },
   containerContentMain: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   ctnFoto: {
      flex: 0.9,
      width: '95%',
      flexDirection: 'row',
      marginVertical: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   ctnImagemContent: {
      flex: 1,
   },
   ctnSemFotoFilho: {
      backgroundColor: hexToRgba(theme.colors.color04, '0.2'),
      borderRadius: 20,
      borderColor: hexToRgba(theme.colors.color05, '0.2'),
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
   },
   ctnInfoUsuario: {
      width: '95%',
      padding: 15,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 10,
      backgroundColor: hexToRgba(theme.colors.color05, '0.1'),
      marginBottom: getResponsiveSizeHeight(2),
      borderColor: hexToRgba(theme.colors.color05, '0.2'),
      borderWidth: 2,
   },
   tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: hexToRgba(theme.colors.color05, '0.2'),
   },
   tableHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.color05,
   },
   tableContent: {
      textAlign: 'center',
      backgroundColor: hexToRgba(theme.colors.color01, '0.7'),
      borderRadius: 5,
      fontSize: 16,
      color: theme.colors.color05,
      minWidth: getResponsiveSizeWidth(10),
      borderBottomColor: theme.colors.color05,
   },
   addPhotoContent: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   addPhotoText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.colors.color05,
      fontWeight: 'bold',
   },
   inputWithUnit: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   unitText: {
      marginLeft: 5,
      fontSize: 16,
      color: theme.colors.color05,
   },
});

export default EvolucaoScreen; 