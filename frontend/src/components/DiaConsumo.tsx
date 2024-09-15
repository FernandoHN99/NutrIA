import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/MaterialIcons';
import Ionicons02 from '@expo//vector-icons/Feather';
import Ionicons03 from '@expo//vector-icons/MaterialCommunityIcons';
import { arredondarValores, getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba } from '../utils/utils';
import theme from '../styles/theme';
import { somarMacrosDiaPorRefeicao } from '../utils/formatters';

const ICON_SIZE = getResponsiveSizeHeight(3.5);
const ICON_COLOR = hexToRgba(theme.colors.black, '0.6');

const iconsRefeicoes: { [key: number]: JSX.Element } = {
   1: <Ionicons02 name="sunrise" size={ICON_SIZE} color={ICON_COLOR} />,
   2: <Ionicons02 name="sun" size={ICON_SIZE} color={ICON_COLOR} />,
   3: <Ionicons02 name="coffee" size={ICON_SIZE} color={ICON_COLOR} />,
   4: <Ionicons02 name="sunset" size={ICON_SIZE} color={ICON_COLOR} />,
   5: <Ionicons03 name="weather-night" size={ICON_SIZE} color={ICON_COLOR} />,
};

interface DiaConsumoProps {
   infosDia: any[],
   refeicoesDiaAtivas: any[]
   perfilDia: { [key: string]: any }
   navigation: any
}

const DiaConsumo = ({ navigation, infosDia, perfilDia, refeicoesDiaAtivas }: DiaConsumoProps) => {

   const macrosRefeicoes = somarMacrosDiaPorRefeicao(infosDia, refeicoesDiaAtivas);
   const refeicoes = Object.values(macrosRefeicoes);

   const renderRefeicao = (refeicao: any, index: number) => {
      const macrosRefeicao = macrosRefeicoes[refeicao.numero_refeicao];
      const isLastItem = index === refeicoes.length - 1;
      const totalKcal = macrosRefeicao?.totalKcal || 0;
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
                     <Text style={styles.refeicaoNome}>{refeicao.nome_refeicao}</Text>
                     <Text style={styles.refeicaoKcal}>
                        {totalKcal} kcal - {porcentagemKcal}%
                     </Text>
                  </View>
               </View>
               <View style={styles.refeicaoRightContent}>
                  <TouchableOpacity
                     onPress={() => navigation.navigate('RefeicaoScreen', { macrosRefeicao, perfilDia, infosDia })}
                  >
                     <Ionicons name="add-circle" size={getResponsiveSizeHeight(3)} color={theme.colors.color05} />
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
            {refeicoes.map(renderRefeicao)}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({

   mainContainer: {
      marginTop: getResponsiveSizeHeight(2),
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
      fontSize: getResponsiveSizeHeight(2),
      marginLeft: getResponsiveSizeWidth(10),
   },
   refeicoesContainer: {
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      borderRadius: 20,
      width: getResponsiveSizeWidth(90),
      borderColor: theme.colors.color05,
      borderWidth: 2,
   },
   refeicaoContainer: {
      marginHorizontal: 20,
      paddingVertical: getResponsiveSizeHeight(1.3),
      borderBottomWidth: 2,
      borderColor: hexToRgba(theme.colors.black, '0.6'),
      flexDirection: 'column',
      justifyContent: 'center',
   },
   refeicaoUltimoContainer: {
      marginHorizontal: 20,
      borderBottomWidth: 0,
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
   refeicaoRightContent: {
      flexDirection: 'row',
      flex: 0.3,
      justifyContent: 'flex-end',
      marginRight: getResponsiveSizeWidth(2)
   },
   iconeRefeicaoCircle: {
      width: getResponsiveSizeHeight(7),
      height: getResponsiveSizeHeight(7),
      borderWidth: 5,
      borderColor: hexToRgba(theme.colors.color05, '0.3'),
      borderRadius: getResponsiveSizeWidth(50),
      justifyContent: 'center',
      alignItems: 'center',
   },
   refeicaoInfosContainer: {
      marginLeft: getResponsiveSizeWidth(4),
   },
   refeicaoNome: {
      fontSize: getResponsiveSizeHeight(2),
      fontFamily: 'NotoSans-SemiBold',
      color: hexToRgba(theme.colors.black, '0.6'),
   },
   refeicaoKcal: {
      fontSize: getResponsiveSizeHeight(1.6),
      fontFamily: 'NotoSans-SemiBold',
      color: hexToRgba(theme.colors.black, '0.6'),
   }
});

export default DiaConsumo;