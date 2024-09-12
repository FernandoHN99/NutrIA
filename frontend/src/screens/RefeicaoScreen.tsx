import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba } from '../utils/utils';
import ProgressCircle from '../components/ChatBot/ProgressCircle';
import { useNavigation } from '@react-navigation/native'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; // Example icon library

const RefeicaoScreen = ({ route }: { route: any }) => {
   const navigation = useNavigation();
   const { nomeRefeicao, macrosRefeicao, perfilDia } = route.params;

  const handleGoBack = () => {
   navigation.goBack();
 };


   return (
      <View style={styles.mainPageContainer}>
         <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleGoBack}>
               <Ionicons name="arrow-back-outline" size={getResponsiveSizeHeight(4)} color={theme.colors.color05} />
            </TouchableOpacity>
            <View style={styles.containerTitle}>
               <Text style={styles.titulo}>{nomeRefeicao}</Text>
            </View>
         </View>
         <View style={styles.mainContentContainer}>
            <Text style={styles.subtitulo}>Resumo</Text>
            <View style={styles.resumoContainer}>
            <ProgressCircle
                     current={macrosRefeicao.totalKcal}
                     total={perfilDia.tmf}
                     bgColor={hexToRgba(theme.colors.color05, '0.3')}
                     progressColor={theme.colors.color05}
                     size={getResponsiveSizeWidth(30)}
                     thickness={7}
                  >
                     <View>
                        <Text style={styles.infoCaloriasNumber}>{macrosRefeicao.totalKcal}</Text>
                        <Text style={styles.infoText}>Calorias</Text>
                        <Text style={styles.infoText}>Consumidas</Text>
                     </View>
                  </ProgressCircle>
            </View>
            <View style={styles.alimentosContainer}>
               <Text style={styles.subtitulo}>Alimentos</Text>
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
   },
   headerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '98%',
      marginTop: getResponsiveSizeHeight(1),
   },
   containerTitle: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   mainContentContainer: {
      flexDirection: 'column',
      width: '90%',
   },
   resumoContainer: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      height: getResponsiveSizeWidth(50),
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      borderRadius: 20,
   },
   alimentosContainer: {

   },
   titulo: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(7),
      color: theme.colors.color05,
      marginLeft: getResponsiveSizeWidth(3),
      marginVertical: getResponsiveSizeWidth(1),
      textAlign: 'center',
   },
   subtitulo: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(5),
      color: theme.colors.color05,
      marginLeft: getResponsiveSizeWidth(3),
      marginVertical: getResponsiveSizeWidth(1),
   },
   infoText: {
      textAlign: 'center',
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeHeight(1.2),
      color: hexToRgba(theme.colors.black, '0.8')
   },
   infoCaloriasNumber: {
      textAlign: 'center',
      fontSize: getResponsiveSizeHeight(2.1),
      fontFamily: 'NotoSans-Bold',
      color: hexToRgba(theme.colors.black, '0.8')
   },

});

export default RefeicaoScreen;
