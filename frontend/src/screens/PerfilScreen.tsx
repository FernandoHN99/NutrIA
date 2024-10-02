import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../styles/theme';

const PerfilScreen = ({navigation}: {navigation: any}) => {
   const menuItems = [
      { title: 'Meus dados e metas', action: () => console.log('Meus dados e metas') },
      { title: 'Comidas favoritas' },
      { title: 'Personalizar refeições' },
      { title: 'Sobre nós', action: () => navigation.push('AboutUsScreen') },
      { title: 'Política de privacidade', action: () => navigation.push('PoliticaPrivacidadeScreen') },
   ];

   return (
      <View style={styles.container}>
         <Text style={styles.header}>Informações gerais</Text>
         {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
               <Text style={styles.menuText}>{item.title}</Text>
               <Icon name="chevron-forward-outline" size={20} color={theme.colors.color05} />
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
      fontSize: 18,
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

export default PerfilScreen;