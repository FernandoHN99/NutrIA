import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialIcons';
import Ionicons02 from '@expo//vector-icons/Feather';
import Ionicons03 from '@expo//vector-icons/MaterialCommunityIcons';
import { arredondarValores, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba } from '../utils/utils';
import theme from '../styles/theme';
import { useQueryClient } from '@tanstack/react-query';
import { roundJsonValues } from '../utils/utils';
import { totalValuesByRefeicao } from '../utils/formatters';

const ICON_SIZE = getResponsiveSizeHeight(4);
const ICON_COLOR = hexToRgba(theme.colors.black, '0.6');

const iconsRefeicoes: { [key: number]: JSX.Element } = {
   1: <Ionicons02 name="sunrise" size={ICON_SIZE} color={ICON_COLOR}  />,
   2: <Ionicons02 name="sun" size={ICON_SIZE} color={ICON_COLOR} />,
   3: <Ionicons02 name="coffee" size={ICON_SIZE} color={ICON_COLOR} />,
   4: <Ionicons02 name="sunset" size={ICON_SIZE} color={ICON_COLOR} />,
   5: <Ionicons03 name="weather-night" size={ICON_SIZE} color={ICON_COLOR}/>,
};

interface DiaConsumoProps {
   infosDia: any[],
   perfilDia: { [key: string]: any }
}

 const DiaConsumo = ({ infosDia, perfilDia } : DiaConsumoProps) => {
   const queryClient = useQueryClient();
   const refeicoes: any[] | undefined = queryClient.getQueryData(['refeicoesUsuario']);
 
   const macrosPorRefeicao = roundJsonValues(totalValuesByRefeicao(infosDia));
 
   const renderRefeicao = (refeicao: any, index: number) => {
     const isLastItem = index === refeicoes!.length - 1;
     const totalKcal = macrosPorRefeicao[refeicao.numero_refeicao]?.totalKcal || 0;
     const porcentagemKcal = arredondarValores((totalKcal / perfilDia.tmf) * 100);
 
     return (
       <View 
         key={refeicao.numero_refeicao} 
         style={[
           styles.refeicaoContainer,
           isLastItem && styles.refeicaoUltimoContainer,
         ]}
       >
         <View style={styles.refeicaoMainContent}>
           <View style={styles.refeicaoLeftContent}>
             <View style={styles.iconeRefeicaoCircle}>
               {iconsRefeicoes[refeicao.numero_refeicao]}
             </View>
             <View style={styles.refeicaoInfosContainer}>
               <Text style={styles.refeicaoNome}> {refeicao.nome_refeicao} </Text>
               <Text style={styles.refeicaoKcal}>
                 {totalKcal} kcal - ({porcentagemKcal}%)
               </Text>
             </View>
           </View>
           <View style={styles.refeicaoRightContent}>
             <TouchableOpacity onPress={() => {}}>
               <Ionicons name="add-circle" size={24} color={theme.colors.color05} />
             </TouchableOpacity>
           </View>
         </View>
       </View>
     );
   };
 
   return (
     <View style={styles.mainContainer}>
       <View style={styles.headerConsumoContainer}>
         <Text style={styles.title}>Alimentação</Text>
       </View>
       <View style={styles.refeicoesContainer}>
         {refeicoes?.map(renderRefeicao)}
       </View>
     </View>
   );
 };

const styles = StyleSheet.create({

   mainContainer:{
      marginTop: getResponsiveSizeHeight(1),
      marginBottom: getResponsiveSizeHeight(4),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },
   headerConsumoContainer: {
      alignSelf: 'flex-start',
   },
   title: {
      textAlign: 'left',
      color: theme.colors.color05,
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(5),
      marginLeft: getResponsiveSizeWidth(10),
      marginBottom: getResponsiveSizeHeight(0.5),
   },
   refeicoesContainer: {
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      borderRadius: 20,
      width: getResponsiveSizeWidth(90),
   },
   refeicaoContainer: {
      marginHorizontal: 20,
      height: getResponsiveSizeHeight(12),
      borderBottomWidth: 2,
      borderColor: hexToRgba(theme.colors.black, '0.6'),
      flexDirection: 'column',
      justifyContent: 'center',
   },
   refeicaoUltimoContainer:{
      marginHorizontal: 20,
      borderBottomWidth: 0,
      height: getResponsiveSizeHeight(12),
      borderColor: hexToRgba(theme.colors.black, '0.6'),
      flexDirection: 'column',
      justifyContent: 'center',
   },
   refeicaoMainContent: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start'
   },
   refeicaoLeftContent: {
      flex: 0.7,
      flexDirection: 'row',
      alignItems: 'center',
   },
   refeicaoRightContent:{
      flexDirection: 'row',
      flex: 0.3,
      justifyContent: 'flex-end',
      marginRight: getResponsiveSizeWidth(2)
   },
   iconeRefeicaoCircle: {
      width: getResponsiveSizeHeight(8),
      height: getResponsiveSizeHeight(8),
      borderWidth: 5,
      borderColor: hexToRgba(theme.colors.color05, '0.3'),
      borderRadius: getResponsiveSizeWidth(50),
      justifyContent: 'center',
      alignItems: 'center',
   },
   refeicaoInfosContainer:{
      marginLeft: getResponsiveSizeWidth(4),
   },
   refeicaoNome:{
      fontSize: getResponsiveSizeHeight(2),
      fontFamily: 'NotoSans-SemiBold',
      color: hexToRgba(theme.colors.black, '0.6'),
   },
   refeicaoKcal:{
      fontSize: getResponsiveSizeHeight(1.6),
      fontFamily: 'NotoSans-SemiBold',
      color: hexToRgba(theme.colors.black, '0.6'),
   }
});

export default DiaConsumo;