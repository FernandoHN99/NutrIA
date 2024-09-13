import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba } from '../utils/utils';
import ProgressCircle from '../components/ProgressCircle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';

const RefeicaoScreen = ({ route }: { route: any }) => {
   const navigation = useNavigation();
   const { nomeRefeicao, macrosRefeicao, perfilDia } = route.params;

   const handleGoBack = () => {
      navigation.goBack();
   };

   return (
      <View style={styles.mainPageContainer}>
         <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
               <Ionicons name="arrow-back-outline" size={getResponsiveSizeWidth(8)} color={theme.colors.color05} />
            </TouchableOpacity>
            <View style={styles.containerTitulo}>
               <Text style={styles.titulo}>{nomeRefeicao}</Text>
            </View>
         </View>
         <View style={styles.mainContentContainer}>
            <Text style={styles.subtitulo}>Resumo</Text>
            <View style={styles.resumoContainer}>
               <View style={styles.progressCircleContainer}>
                  <ProgressCircle
                     current={macrosRefeicao.totalKcal}
                     total={perfilDia.tmf}
                     bgColor={hexToRgba(theme.colors.color05, '0.3')}
                     progressColor={theme.colors.color05}
                     size={getResponsiveSizeHeight(17)}
                     thickness={7}
                  >
                     <View>
                        <Text style={styles.infoCaloriasNumber}>{macrosRefeicao.totalKcal}</Text>
                        <Text style={styles.infoText}>Calorias</Text>
                        <Text style={styles.infoText}>Consumidas</Text>
                     </View>
                  </ProgressCircle>
               </View>
               <View style={styles.macrosContainer}>
                  <View>
                     <Text style={styles.infoText}>Carboidratos</Text>
                     <ProgressBar
                        current={macrosRefeicao.totalCarboidrato}
                        total={perfilDia.meta_carboidrato}
                        bgColor={hexToRgba(theme.colors.color05, '0.3')}
                        progressColor={theme.colors.color05}
                        width={getResponsiveSizeWidth(35)}
                        height={getResponsiveSizeWidth(2)}
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
                        width={getResponsiveSizeWidth(35)}
                        height={getResponsiveSizeWidth(2)}
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
                        width={getResponsiveSizeWidth(35)}
                        height={getResponsiveSizeWidth(2)}
                        paddingValue={0}
                     />
                     <Text style={styles.infoText}>{`${macrosRefeicao.totalGordura} / ${perfilDia.meta_gordura} g`}</Text>
                  </View>
               </View>
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
      alignItems: 'center',
      marginTop: getResponsiveSizeHeight(1),
      width: '95%',
   },
   button: {
      width: '10%',
   },
   containerTitulo: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
   },
   mainContentContainer: {
      flexDirection: 'column',
      width: '90%',
      marginTop: getResponsiveSizeHeight(1),
   },
   resumoContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      height: getResponsiveSizeHeight(23),
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      borderRadius: 20,
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
      fontSize: getResponsiveSizeHeight(1.4),
      color: hexToRgba(theme.colors.black, '0.8')
   },
   infoCaloriasNumber: {
      textAlign: 'center',
      fontSize: getResponsiveSizeHeight(2.1),
      fontFamily: 'NotoSans-Bold',
      color: hexToRgba(theme.colors.black, '0.8')
   },
   progressCircleContainer: {

   },
   macrosContainer: {
      height: '90%',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
   },
   alimentosContainer: {

   },

});

export default RefeicaoScreen;
