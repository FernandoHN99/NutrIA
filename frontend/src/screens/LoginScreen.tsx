import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../utils/utils';
import theme from '../styles/theme';
import useFazerLogin from '../api/hooks/usuario/useFazerLogin';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation, route }: { navigation: any, route: any }) => {

   const { setIsAuthenticated } = route.params;

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isSecure, setIsSecure] = useState(true);
   const { data, loading, error, login } = useFazerLogin();

   const handleLogin = async () => {
      if (!email || !password) return;
      await login({ email, password });
   };

   useEffect(() => {
      if (data) {
         setIsAuthenticated(true)
      }
      login({ email: 'safado@gmail.com', password: '1234567890'} );
   }, [data]);


   return (
      <View style={styles.container}>
         <Text style={styles.heading}>NutrIA</Text>
         <View style={styles.form}>
            <TextInput
               style={styles.input}
               placeholder="Email"
               placeholderTextColor={theme.colors.color05}
               keyboardType="email-address"
               onChangeText={setEmail}
               value={email}
               autoCapitalize='none'
            />
            <View style={styles.containerPassword}>
               <TextInput
                  style={styles.passwordInput}
                  placeholder="Senha"
                  placeholderTextColor={theme.colors.color05}
                  onChangeText={setPassword}
                  value={password}
                  autoCapitalize='none'
                  secureTextEntry={isSecure}
                  />
               <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.eyeButton}>
                  <Icon name={isSecure ? "eye-off-outline" : "eye-outline"} size={30} color={theme.colors.color05} />
               </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
               {loading ? (
                  <ActivityIndicator color={theme.colors.color01} />
               ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
               )}
            </TouchableOpacity>
         </View>
         {error && <Text style={styles.errorText}>Credenciais Inválidas</Text>}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: getResponsiveSizeWidth(10),
      backgroundColor: theme.colors.backgroundColor,
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
      borderColor: theme.colors.color05,
      borderWidth: 1,
      borderRadius: theme.borderRadius.small,
      marginBottom: getResponsiveSizeHeight(2),
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color05,
   },
   containerPassword: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      borderColor: theme.colors.color05,
      borderWidth: 1,
      borderRadius: theme.borderRadius.small,
      marginBottom: getResponsiveSizeHeight(2),
   },
   passwordInput: {
      // flex: 1,
      paddingVertical: getResponsiveSizeHeight(2),
      paddingHorizontal: getResponsiveSizeWidth(4),
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
   },
   errorText: {
      color: theme.colors.color05,
      fontSize: getResponsiveSizeWidth(4),
      marginTop: getResponsiveSizeHeight(3),
      textAlign: 'center',
   },
   eyeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: getResponsiveSizeWidth(3),
   },
});

export default LoginScreen;
