import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../../styles/theme';
import { setTokensStorage } from '../../../api/hooks/httpState/usuarioAuth';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const SettingsScreen = ({navigation}: {navigation: any}) => {
   const queryClient = useQueryClient();
   const menuItems = [
      // { title: 'Configuração da Conta', action: () => console.log('Configuração da Conta') },
      { title: 'Configuração de Perfil', action: () => navigation.push('DadosPerfilScreen') },
      // { title: 'Comidas Favoritas' },
      { title: 'Configuração de Refeições', action: () => navigation.push('RefeicoesScreen') },
      { title: 'Política de Privacidade', action: () => navigation.push('PoliticaPrivacidadeScreen') },
      { title: 'Sobre Nós', action: () => navigation.push('AboutUsScreen') },
      { title: 'Sair', action: () => fazerLogoutFn() },
   ];

   const { mutateAsync: fazerLogoutFn } = useMutation({
      mutationFn: () => Promise.resolve(),
      onSuccess() {
         setTokensStorage('', '');
         queryClient.setQueryData(['usuarioTokens'], () => {
            return {token: '', refreshToken: ''};
         });
      },
   });

   return (
      <View style={styles.container}>
         <Text style={styles.header}>Configurações Gerais</Text>
         {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
               <Text style={styles.menuText}>{item.title}</Text>
               { index !== (menuItems.length - 1) &&
                  <Icon name="chevron-forward-outline" size={20} color={theme.colors.color05} />
               }
            </TouchableOpacity>
         ))}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: theme.colors.backgroundColor,
   },
   header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.color05,
   },
   menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.color05,
      borderRadius: 25,
      color: theme.colors.color05,
      backgroundColor: theme.colors.color01,
   },
   menuText: {
      fontSize: 16,
      color: theme.colors.black,
   },
});

export default SettingsScreen;