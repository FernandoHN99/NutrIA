import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons02 from '@expo/vector-icons/FontAwesome6';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import { hexToRgba } from '../utils/utils';
import ProgressBar from './ChatBot/ProgressBar';
import { useQueryClient } from '@tanstack/react-query';
import { roundJsonValues } from '../utils/utils';
import LoadingScreen from './LoadingScreen';
import ProgressCircle from './ChatBot/ProgressCircle';


interface DiaSumarioProps {
   diaSelecionado: string;
   infosDia: any[]
}

const jsonDiaVazio = {
   totalProteina: 0,
   totalCarboidrato: 0,
   totalGordura: 0,
   totalAlcool: 0,
   totalKcal: 0,
}

const totalValues = (consumoDoDia: any[]) => {
   return consumoDoDia.reduce((acc, { kcal, qtde_gordura, qtde_carboidrato, qtde_proteina, qtde_alcool }) => {
      return {
         totalProteina: acc.totalProteina + qtde_proteina,
         totalCarboidrato: acc.totalCarboidrato + qtde_carboidrato,
         totalGordura: acc.totalGordura + qtde_gordura,
         totalAlcool: acc.totalAlcool + qtde_alcool,
         totalKcal: acc.totalKcal + kcal,
      };
   }, { ...jsonDiaVazio });
};

const encontrarPerfilPorData = (perfisData: any[], diaSelecionado: string) => {
   const diaSelecionadoDt = new Date(diaSelecionado);
   let perfilEncontrado = null;

   if (diaSelecionadoDt <= new Date(perfisData[0].dt_criacao_perfil)) {
      return perfisData[0];
   }

   for (let i = 0; i < perfisData.length; i++) {
      const perfil = perfisData[i];
      const dtCriacao = new Date(perfil.dt_criacao_perfil);

      if (diaSelecionadoDt >= dtCriacao) {
         perfilEncontrado = perfil;
      } else if (perfilEncontrado) {
         break;
      }
   }
   return perfilEncontrado;
};


const DiaSumario = ({ diaSelecionado, infosDia }: DiaSumarioProps) => {
   const queryClient = useQueryClient();

   const macrosSum = infosDia ? roundJsonValues(totalValues(infosDia)) : null;
   // console.log('macrosSum: ', macrosSum);

   const cached: any[] | undefined = queryClient.getQueryData(['perfisUsuario']);
   const perfil = cached ? roundJsonValues(encontrarPerfilPorData(cached, diaSelecionado)) : null;
   // console.log('perfil: ', perfil);

   if (!macrosSum || !perfil) {
      return <LoadingScreen loadingMessage='Carregando...' />;
   }

   return (
      <View style={styles.mainCotainer}>
         <View style={styles.headerSumarioContainer}>
            <Text style={styles.title}>Resumo</Text>
            <View style={styles.headerButtons}>
               <TouchableOpacity onPress={() => console.log('oi')}>
                  <Ionicons name="chef-hat" size={getResponsiveSizeHeight(3.2)} color={theme.colors.color05} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => console.log('oi')}>
                  <Ionicons02 name="sliders" size={getResponsiveSizeHeight(3.2)} color={theme.colors.color05} />
               </TouchableOpacity>
            </View>
         </View>
         <View style={styles.infoSumarioContainer}>
            <View style={styles.caloriasContainer}>
               <View style={styles.infoCaloriasContainer}>
                  <Text style={styles.infoCaloriasNumber}>{macrosSum.totalKcal}</Text>
                  <Text style={styles.infoText}>Calorias</Text>
                  <Text style={styles.infoText}>Consumidas</Text>
               </View>
               {/* <View style={styles.infoCaloriasMain}>
                  <Text style={styles.infoCaloriasNumber}>{perfil.tmf - macrosSum.totalKcal}</Text>
                  <Text style={styles.infoText}>Calorias</Text>
                  <Text style={styles.infoText}>Restantes</Text>
               </View> */}
               <View style={styles.infoCaloriasMain}>
                  <ProgressCircle
                     current={macrosSum.totalKcal}
                     total={perfil.tmf}
                     bgColor={hexToRgba(theme.colors.color05, '0.3')}
                     progressColor={theme.colors.color05}
                     size={getResponsiveSizeWidth(30)}
                     thickness={7}
                  />
               </View>
               <View style={styles.infoCaloriasContainer}>
                  <Text style={styles.infoCaloriasNumber}>{perfil.tmf}</Text>
                  <Text style={styles.infoText}>Calorias</Text>
                  <Text style={styles.infoText}>Totais</Text>
               </View>
            </View>
            <View style={styles.macrosContainer}>
               <View style={styles.infoMacrosContainer}>
                  <Text style={styles.infoText}>Carboidratos</Text>
                  <ProgressBar
                     current={macrosSum.totalCarboidrato}
                     total={perfil.meta_carboidrato}
                     bgColor={hexToRgba(theme.colors.color05, '0.3')}
                     progressColor={theme.colors.color05}
                     width={getResponsiveSizeWidth(22)}
                     height={getResponsiveSizeWidth(2)}
                     paddingValue={3}
                  />
                  <Text style={styles.infoText}>{`${macrosSum.totalCarboidrato} / ${perfil.meta_carboidrato} g`}</Text>
               </View>
               <View style={styles.infoMacrosContainer}>
                  <Text style={styles.infoText}>Proteínas</Text>
                  <ProgressBar
                     current={macrosSum.totalProteina}
                     total={perfil.meta_proteina}
                     bgColor={hexToRgba(theme.colors.color05, '0.3')}
                     progressColor={theme.colors.color05}
                     width={getResponsiveSizeWidth(22)}
                     height={getResponsiveSizeWidth(2)}
                     paddingValue={3}
                  />
                  <Text style={styles.infoText}>{`${macrosSum.totalProteina} / ${perfil.meta_proteina} g`}</Text>

               </View>
               <View style={styles.infoMacrosContainer}>
                  <Text style={styles.infoText}>Gorduras</Text>
                  <ProgressBar
                     current={macrosSum.totalGordura}
                     total={perfil.meta_gordura}
                     bgColor={hexToRgba(theme.colors.color05, '0.3')}
                     progressColor={theme.colors.color05}
                     width={getResponsiveSizeWidth(22)}
                     height={getResponsiveSizeWidth(2)}
                     paddingValue={3}
                  />
                  <Text style={styles.infoText}>{`${macrosSum.totalGordura} / ${perfil.meta_gordura} g`}</Text>

               </View>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   mainCotainer: {
      marginTop: getResponsiveSizeHeight(1),
      flexDirection: 'column',
      alignItems: 'center'
   },
   headerSumarioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: getResponsiveSizeWidth(85),
      height: getResponsiveSizeWidth(10),
   },
   title: {
      color: theme.colors.color05,
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(5),
      marginLeft: getResponsiveSizeWidth(2)
   },
   headerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 0.4,
      marginRight: getResponsiveSizeWidth(5)
   },
   infoSumarioContainer: {
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      width: getResponsiveSizeWidth(90),
      height: getResponsiveSizeWidth(65),
      borderRadius: 20,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
   },
   caloriasContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flex: 0.7,
      alignItems: 'center',
   },
   infoCaloriasContainer: {
      flex: 1,
      alignItems: 'center',
   },
   infoCaloriasMain: {
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 5,
      // borderColor: hexToRgba(theme.colors.color05, '0.3'),
      // borderRadius: getResponsiveSizeWidth(50),
      width: getResponsiveSizeWidth(35),
      height: getResponsiveSizeWidth(35),
   },
   infoText: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeHeight(1.2),
      color: hexToRgba(theme.colors.black, '0.8')
   },
   infoCaloriasNumber: {
      fontSize: getResponsiveSizeHeight(2.1),
      fontFamily: 'NotoSans-Bold',
      color: hexToRgba(theme.colors.black, '0.8')
   },
   macrosContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flex: 0.3,
   },
   infoMacrosContainer: {
      flex: 1,
      alignItems: 'center',
   },

});

export default DiaSumario;