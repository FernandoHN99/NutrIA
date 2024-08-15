import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../utils/utils';
import theme from '../styles/theme';
const LoginScreen = () => {

   const handleLogin = () => {
      console.log('Login button pressed');
   };

   return (
      <View style={styles.container}>
            <Text style={styles.heading}>NutrIA</Text>
         <View style={styles.form}>
            <TextInput
               style={styles.input}
               placeholder="Email"
               placeholderTextColor={theme.colors.color04}
            />
            <TextInput
               style={styles.input}
               placeholder="Senha"
               placeholderTextColor={theme.colors.color04}
               secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
               <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: getResponsiveSizeWidth(10),
      backgroundColor: theme.colors.color01,
   },
   heading: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(12),
      color: theme.colors.color05,
      textAlign: 'center',
      marginBottom: getResponsiveSizeHeight(4),
   },
   form: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   input: {
      width: '100%',
      paddingVertical: getResponsiveSizeHeight(2),
      paddingHorizontal: getResponsiveSizeWidth(4),
      borderColor: theme.colors.color03,
      borderWidth: 1,
      borderRadius: theme.borderRadius.small,
      marginBottom: getResponsiveSizeHeight(2),
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color05,
   },
   button: {
      backgroundColor: theme.colors.color05,
      paddingVertical: getResponsiveSizeHeight(2),
      borderRadius: theme.borderRadius.medium,
      marginTop: getResponsiveSizeHeight(2),
      width: '100%',
   },
   buttonText: {
      fontFamily: 'NotoSans-Bold',
      color: theme.colors.color01,
      textAlign: 'center',
      fontSize: getResponsiveSizeWidth(4),
   }
});

export default LoginScreen;
