import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../styles/theme';
import { useNavigation } from '@react-navigation/native'; // Hook para navegação
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../utils/utils';

const AboutUsScreen = () => {
   const navigation = useNavigation();

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon name="arrow-back" size={30} color={theme.colors.color05} />
            </TouchableOpacity>
            <Text style={styles.title}>Sobre Nós</Text>
         </View>
         <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>
               A NutrIA é um aplicativo de acompanhamento nutricional com inteligência artificial, desenvolvido para ajudar você a monitorar e melhorar seus hábitos alimentares de forma personalizada e prática. Utilizando tecnologias avançadas de IA, a NutrIA analisa suas necessidades nutricionais e oferece recomendações específicas, adaptadas ao seu estilo de vida e objetivos, seja para perder peso, ganhar massa muscular ou simplesmente manter uma alimentação equilibrada.
               Nosso objetivo é tornar o processo de cuidar da sua saúde mais acessível e intuitivo, oferecendo uma ferramenta completa que combina ciência nutricional com o poder da inteligência artificial. Através de análises automáticas, sugestões de refeições e relatórios de progresso, a NutrIA garante que você tenha todas as informações e suporte necessários para alcançar suas metas nutricionais com eficiência.
            </Text>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '95%',
      marginTop: 15,
      marginBottom: 15,
   },
   title: {
      flex: 0.95,
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.color05,
      textAlign: 'center',
   },
   button: {
   },
   scrollViewContainer: {
      width: '93%',
      marginHorizontal: 'auto',
   },
   description: {
      fontSize: getResponsiveSizeWidth(4),
      lineHeight: getResponsiveSizeHeight(3.5),
      color: theme.colors.black,
      textAlign: 'justify',
      fontFamily: 'NotoSans-Regular',
   }
});

export default AboutUsScreen;
