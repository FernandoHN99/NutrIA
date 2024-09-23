import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba, criarStrData, arredondarValores, capitalize } from '../utils/utils';
import ProgressCircle from '../components/ProgressCircle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../components/ProgressBar';
import { filtrarConsumoRefeicao } from '../utils/formatters';

const RefeicaoScreen = ({ route }: { route: any }) => {

   const navigation = useNavigation();
   const { macrosRefeicao, perfilDia, infosDia } = route.params;
   const consumoRefeicao = filtrarConsumoRefeicao(infosDia, macrosRefeicao.numero_refeicao);

   const handleGoBack = () => {
      navigation.goBack();
   };


   return (
      <View style={{ backgroundColor: theme.colors.backgroundColor, flex: 1 }}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainPageContainer}>
               <View style={styles.headerContainer}>
                  <View style={styles.containerTitulo}>
                     <Text style={styles.subtitulo}>Resumo - {macrosRefeicao.nome_refeicao}</Text>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                     <Ionicons name="close-circle" size={getResponsiveSizeHeight(3.5)} color={theme.colors.color05} />
                  </TouchableOpacity>
               </View>
               <View style={styles.mainContentContainer}>
                  <View style={styles.resumoContainer}>
                     <ProgressCircle
                        current={macrosRefeicao.totalKcal}
                        total={perfilDia.tmf}
                        bgColor={hexToRgba(theme.colors.color05, '0.3')}
                        progressColor={theme.colors.color05}
                        size={getResponsiveSizeHeight(20)}
                        thickness={7}
                     >
                        <View>
                           <Text style={styles.infoCaloriasNumber}>{macrosRefeicao.totalKcal}</Text>
                           <Text style={styles.infoText}>Calorias</Text>
                           <Text style={styles.infoText}>Consumidas</Text>
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
                  <View style={styles.alimentoMainContainer}>
                     {consumoRefeicao.length > 0 ? (
                        <View style={styles.alimentosContainer}>
                           <Text style={styles.subtitulo}>Alimentos Consumidos</Text>
                           <View style={styles.alimentosContentContainer}>
                              {consumoRefeicao.map((alimentoConsumido, index) => (
                                 <View style={[
                                    styles.alimentoContainer,
                                    (consumoRefeicao.length - 1) === index && styles.alimentoLastContainer,
                                 ]} key={alimentoConsumido.dtt_alimento_consumido}>
                                    <View style={styles.alimentoContent}>
                                       <Text style={[styles.textNomeAlimento]}>
                                          {alimentoConsumido.alimento.nome_alimento}
                                          {alimentoConsumido.alimento.estado_alimento != 'PADRAO' ? ` (${capitalize(alimentoConsumido.alimento.estado_alimento)})` : ''}
                                          ,{'\u00A0'}{alimentoConsumido.qtde_utilizada}g</Text>
                                       <View style={{ flexDirection: 'row'}}>
                                          <Text style={styles.textInfoAlimento}>C: {arredondarValores(alimentoConsumido.qtde_carboidrato)}g   </Text>
                                          <Text style={styles.textInfoAlimento}>P: {arredondarValores(alimentoConsumido.qtde_proteina)}g   </Text>
                                          <Text style={styles.textInfoAlimento}>G: {arredondarValores(alimentoConsumido.qtde_gordura)}g</Text>
                                       </View>
                                    </View>
                                    <Text style={[styles.numberInfoAlimento]}>{arredondarValores(alimentoConsumido.kcal)} kcal</Text>
                                 </View>
                              ))}
                           </View>
                        </View>
                     ) : (
                        <View style={styles.semAlimentosContainer}>
                           <Text style={styles.semAlimentosMsg}>Nenhum alimento consumido </Text>
                           <TouchableOpacity style={styles.buttonAdicionar} onPress={() => console.log('Adicionar')}>
                              <Text style={styles.semAlimentosMsgButton}>Adicionar alimento</Text>
                           </TouchableOpacity>
                        </View>
                     )
                     }
                  </View>
               </View>
            </View>
         </ScrollView>
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
      height: getResponsiveSizeHeight(25),
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      borderRadius: 20,
      borderColor: theme.colors.color05,
      borderWidth: 2,
   },
   subtitulo: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeHeight(2.5),
      color: theme.colors.color05,
      marginLeft: getResponsiveSizeWidth(5),
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
   macrosContainer: {
      height: '90%',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
   },
   alimentoMainContainer: {
      marginTop: getResponsiveSizeHeight(1),
      marginBottom: getResponsiveSizeHeight(4),
   },
   alimentosContainer: {
      marginTop: getResponsiveSizeHeight(1),
   },
   alimentosContentContainer: {
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      borderRadius: 20,
      borderColor: theme.colors.color05,
      borderWidth: 2,
   },
   alimentoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: getResponsiveSizeWidth(3),
      paddingHorizontal: getResponsiveSizeWidth(5),
      borderColor: theme.colors.color05,
      borderBottomWidth: 2,
   },
   alimentoLastContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: getResponsiveSizeWidth(3),
      paddingHorizontal: getResponsiveSizeWidth(5),
      borderBottomWidth: 0,
   },
   alimentoContent: {
      // backgroundColor: 'blue' 
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
      fontSize: getResponsiveSizeWidth(3.2),
      color: theme.colors.color05,
   },
   numberInfoAlimento: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(4),
      textAlign: 'right',
      // alignSelf: 'flex-start',
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
   semAlimentosMsg: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(4.5),
      textAlign: 'center',
      color: hexToRgba(theme.colors.black, '0.8'),
   },
   buttonAdicionar: {
      marginTop: getResponsiveSizeHeight(2),
      padding: getResponsiveSizeWidth(3),
      backgroundColor: theme.colors.color05,
      borderRadius: 20,
   },
   semAlimentosMsgButton: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(4),
      textAlign: 'center',
      color: theme.colors.color01,
   },

});

export default RefeicaoScreen;
