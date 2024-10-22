import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../../styles/theme';
import { useQueryClient } from '@tanstack/react-query';
import { fazerLogoutService } from '../../../api/services/usuarioService';

const SettingsScreen = ({navigation}: {navigation: any}) => {
   const queryClient = useQueryClient();
   const menuItems = [
      // { title: 'Configuração da Conta', action: () => console.log('Configuração da Conta') },
      { title: 'Configuração de Perfil', action: () => navigation.navigate('DadosPerfilScreen') },
      // { title: 'Comidas voritas' },
      { title: 'Configuração de Refeições', action: () => navigation.navigate('RefeicoesScreen') },
      { title: 'Política de Privacidade', action: () => navigation.navigate('PoliticaPrivacidadeScreen') },
      { title: 'Sobre Nós', action: () => navigation.navigate('AboutUsScreen') },
      { title: 'Sair', action: () => fazerLogoutService(queryClient) },
   ];

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