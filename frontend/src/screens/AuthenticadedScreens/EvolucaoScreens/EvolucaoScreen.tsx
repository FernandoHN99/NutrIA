import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import theme from '../../../styles/theme';
import DiaScroll from '../../../components/Home/DiaScroll';
import { criarStrData, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba, transformDateIntoString } from '../../../utils/utils';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useQueryClient } from '@tanstack/react-query';
import { useDiasUsuario } from '../../../api/httpState/usuarioData';
import { salvarDiaSchema } from '../../../api/schemas/diaSchema';
import * as ImagePicker from 'expo-image-picker';

const formatarData = (dataDia: string) => {
   if (!dataDia) return '-';
   const [ano, mes, dia] = dataDia.split('-');
   return `${dia}-${mes}-${ano}`;
}

const ICON_SIZE = getResponsiveSizeWidth(7);

const EvolucaoScreen: React.FC = () => {
   const [diaSelecionado, setDiaSelecionado] = useState<string>(criarStrData());
   const queryClient = useQueryClient()
   const { data: diasUsuarioCached } = useDiasUsuario({ enabled: false });

   console.log('diasUsuarioCached', diasUsuarioCached);

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

   const getDadosDia = () => {
      if (!diasUsuarioCached) return null;
      return diasUsuarioCached.find((dia: salvarDiaSchema) => dia.dt_dia === diaSelecionado);
   }

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
      const dadosDia = getDadosDia();
      
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
                  size={ICON_SIZE*1.2} 
                  color={theme.colors.color05} 
               />
               <Text style={styles.addPhotoText}>Adicionar foto</Text>
            </TouchableOpacity>
         </View>
      );
   };

   return (
      <View style={styles.container}>
         <DiaScroll diaSelecionado={diaSelecionado} setDiaSelecionado={setDiaSelecionado} />
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
                  <Text style={styles.tableContent}>{formatarData(getDadosDia()?.dt_dia)}</Text>
               </View>
               <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Peso</Text>
                  <Text style={styles.tableContent}>{getDadosDia()?.peso_dia || '-'} kg</Text>
               </View>
               <View style={[styles.tableRow, {borderBottomWidth: 0}]}>
                  <Text style={styles.tableHeader}>Medida Abdômen</Text>
                  <Text style={styles.tableContent}>{getDadosDia()?.medida_abdomen_dia || '-'} cm</Text>
               </View>
            </View>
         </View>
      </View>
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
      fontSize: 16,
      color: theme.colors.color05,
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
});

export default EvolucaoScreen; 