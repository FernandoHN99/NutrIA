import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons02 from '@expo/vector-icons/FontAwesome6';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import { hexToRgba } from '../utils/utils';
import ProgressBar from './ChatBot/ProgressBar';

const DiaSumario = ({ calories, consumed, spent }) => {
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
                  <Text style={styles.infoCaloriasNumber}>167</Text>
                  <Text style={styles.infoText}>Calorias</Text>
                  <Text style={styles.infoText}>Consumidas</Text>
               </View>
               <View style={styles.infoCaloriasMain}>
                  <Text style={styles.infoCaloriasNumber}>0</Text>
                  <Text style={styles.infoText}>Calorias</Text>
                  <Text style={styles.infoText}>Restantes</Text>
               </View>
               <View style={styles.infoCaloriasContainer}>
                  <Text style={styles.infoCaloriasNumber}>0</Text>
                  <Text style={styles.infoText}>Calorias</Text>
                  <Text style={styles.infoText}>Totais</Text>
               </View>
            </View>
            <View style={styles.macrosContainer}>
               <View style={styles.infoMacrosContainer}>
                  <Text style={styles.infoText}>Carboidratos</Text>
                  <ProgressBar 
                     current={10} 
                     total={100} 
                     bgColor={hexToRgba(theme.colors.color05, '0.3') }
                     progressColor={theme.colors.color05}
                     width={getResponsiveSizeWidth(22)}
                     height={getResponsiveSizeWidth(2)}
                     paddingValue={3}
                     />
                     <Text style={styles.infoText}>10 / 100 g</Text>
               </View>
               <View style={styles.infoMacrosContainer}>
                  <Text style={styles.infoText}>Proteínas</Text>
                  <ProgressBar 
                     current={10} 
                     total={100} 
                     bgColor={hexToRgba(theme.colors.color05, '0.3') }
                     progressColor={theme.colors.color05}
                     width={getResponsiveSizeWidth(22)}
                     height={getResponsiveSizeWidth(2)}
                     paddingValue={3}
                     />
                     <Text style={styles.infoText}>10 / 100 g</Text>
               </View>
               <View style={styles.infoMacrosContainer}>
                  <Text style={styles.infoText}>Gorduras</Text>
                  <ProgressBar 
                     current={10} 
                     total={100} 
                     bgColor={hexToRgba(theme.colors.color05, '0.3') }
                     progressColor={theme.colors.color05}
                     width={getResponsiveSizeWidth(22)}
                     height={getResponsiveSizeWidth(2)}
                     paddingValue={3}
                     />
                     <Text style={styles.infoText}>10 / 100 g</Text>
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
      borderWidth: 5,
      borderColor: hexToRgba(theme.colors.color05, '0.3'),
      borderRadius: getResponsiveSizeWidth(50),
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