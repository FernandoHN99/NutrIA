import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import theme from '../../../styles/theme';
import DiaScroll from '../../../components/Home/DiaScroll';
import { criarStrData, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba, transformDateIntoString, validarNumeroMaiorZero } from '../../../utils/utils';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDiasUsuario } from '../../../api/httpState/usuarioData';
import { salvarDiaSchema } from '../../../api/schemas/diaSchema';
import { salvarDiaService } from '../../../api/services/diaService';
import { CameraCapturedPicture, useCameraPermissions } from 'expo-camera';
import AccessCamera from '../../../components/AccessCamera';

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
   const [cameraView, setCameraView] = useState<boolean>(false);
   const [fotoFile, setFotoFile] = useState<string | null>(null);
   const [permission, requestPermission] = useCameraPermissions();

   const queryClient = useQueryClient()

   const avancarDia = () => {
      const newData = new Date(diaSelecionado);
      newData.setDate(newData.getDate() + 1);
      setDiaSelecionado(transformDateIntoString(newData));
   };

   const voltarDia = () => {
      const newData = new Date(diaSelecionado);
      newData.setDate(newData.getDate() - 1);
      setDiaSelecionado(transformDateIntoString(newData));
   };

   const setDadosContent = (dadosDiaContent: salvarDiaSchema) => {
      setDadosDia(dadosDiaContent);
      setDadosDiaEditavel(dadosDiaContent);
   };


   useEffect(() => {
      const dadosDiaCached = diasUsuarioCached?.find((dia) => dia.dt_dia === diaSelecionado);
      if(dadosDiaCached){
         setDadosContent(dadosDiaCached);
         setFotoFile(dadosDiaCached.foto_dia);
         return;
      }
      const dadosDiaNulo = {dt_dia: diaSelecionado, foto_dia: null, medida_abdomen_dia: null, peso_dia: null};
      queryClient.setQueryData(['diasUsuario'], [...diasUsuarioCached!, dadosDiaNulo]);
      setDadosContent(dadosDiaNulo);
      setFotoFile(null);

   }, [diaSelecionado]);

   const renderFotoContent = () => {
      if (dadosDiaEditavel?.foto_dia) {
         return (
            <TouchableOpacity
            onPress={()=>setCameraView(true)}>
               <Image
                  source={{ uri: `${dadosDiaEditavel.foto_dia}` }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode='contain'
               />
            </TouchableOpacity>
         );
      }

      return (
         <View
            style={[styles.ctnImagemContent, styles.ctnSemFotoFilho]}
         >
            <TouchableOpacity
               style={styles.addPhotoContent}
               onPress={()=>setCameraView(true)}>
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
         setDadosDia(retorno);
      },
      onError() {
         setDadosDiaEditavel(dadosDia);
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

   useEffect(() => {
      if (dadosDiaEditavel) {
         setDadosDiaEditavel({ ...dadosDiaEditavel!, foto_dia: fotoFile });
      }
   }, [fotoFile]);

   useEffect(() => {
      if (dadosDiaEditavel) {
         handleSubmitData();
      }
   }, [dadosDiaEditavel?.foto_dia]);

   if(!dadosDiaEditavel || !dadosDia || !diaSelecionado){
      return null;
   }

   if (cameraView) {
      return <AccessCamera setFotoFile={setFotoFile} setCameraView={setCameraView} fotoFileView={dadosDiaEditavel?.foto_dia} />;
   }

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}
         keyboardVerticalOffset={Platform.select({ ios: getResponsiveSizeHeight(10), android: getResponsiveSizeHeight(10) })}
      >
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
                     color={diaSelecionado !== criarStrData() ? theme.colors.color05 : theme.colors.backgroundColor}
                     name="arrow-back-ios"
                     size={ICON_SIZE}
                     onPress={avancarDia}
                     disabled={diaSelecionado === criarStrData()}
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
                              onEndEditing={handleSubmitData}
                              keyboardType="numeric"
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
      </KeyboardAvoidingView>
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