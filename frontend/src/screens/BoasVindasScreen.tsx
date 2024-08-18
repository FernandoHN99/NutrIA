import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../utils/utils';
import theme from '../styles/theme';
import LogoIcon from '../components/LogoIcon';
const BoasVindasScreen = ({ navigation }: { navigation: any }) => {

   const fazerLogin = () => {
      console.log('Texto "Já tenho uma conta!" foi clicado');
   };

   return (
      <View style={styles.container}>
         <View style={styles.content}>
            <LogoIcon widthPorcentageValue={25} />
            <Text style={styles.heading}>NutrIA</Text>
            <Text style={styles.description}>Seu contador de calorias muito mais inteligente.</Text>
         </View>
         <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.push('Login')}>
            <Text style={[styles.textLogin, { fontStyle: 'italic' }]}>Já tenho uma conta!</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.push('SignUp')}>
            <Text style={styles.textSignUp}>Vamos Começar!</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: getResponsiveSizeWidth(10),
      backgroundColor: theme.colors.backgroundColor,
   },
   content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   heading: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(12),
      color: theme.colors.color05,
      textAlign: 'center',
   },
   description: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(4),
      textAlign: 'center',
      color: theme.colors.color05,
   },
   buttonSignUp: {
      backgroundColor: theme.colors.color05,
      paddingVertical: getResponsiveSizeWidth(3),
      borderRadius: theme.borderRadius.medium,
      marginBottom: getResponsiveSizeHeight(4),
      width: '90%',
      alignSelf: 'center',
   },
   textSignUp: {
      fontFamily: 'NotoSans-Bold',
      color: theme.colors.color01,
      textAlign: 'center',
      fontSize: getResponsiveSizeWidth(4),
   },
   textLogin: {
      fontFamily: 'NotoSans-Italic',
      marginBottom: getResponsiveSizeWidth(3),
      textDecorationLine: 'underline',
      textAlign: 'center',
      fontSize: getResponsiveSizeWidth(4),
   },
});

export default BoasVindasScreen;
