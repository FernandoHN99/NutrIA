import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native'; // Hook para navegação
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../../../utils/utils';

const PoliticaPrivacidadeScreen = () => {
   const navigation = useNavigation();

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon name="arrow-back" size={30} color={theme.colors.color05} />
            </TouchableOpacity>
            <Text style={styles.title}>Política de Privacidade</Text>
         </View>
         <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>
               A NutrIA valoriza sua privacidade e está comprometida em proteger as informações pessoais coletadas de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados ao utilizar nosso aplicativo.
               {"\n\n"}
               1. Coleta de informações Ao utilizar o aplicativo NutrIA, poderemos coletar informações pessoais como nome, e-mail, idade, sexo, informações nutricionais e hábitos alimentares. Essas informações são coletadas com o objetivo de oferecer uma experiência personalizada e melhorar os serviços prestados.
               {"\n\n"}
               2. Uso das informações As informações coletadas são utilizadas para:
               {"\n\n"}
               - Personalizar recomendações nutricionais de acordo com seu perfil e objetivos;
               - Monitorar seu progresso e fornecer relatórios de acompanhamento;
               - Aperfeiçoar as funcionalidades e o desempenho do aplicativo;
               - Enviar notificações e comunicados importantes sobre o uso do aplicativo.
               {"\n\n"}
               3. Compartilhamento de informações A NutrIA não compartilha suas informações pessoais com terceiros, exceto quando necessário para o funcionamento do aplicativo (como prestadores de serviços de hospedagem e servidores de dados) ou quando exigido por lei. Garantimos que todos os parceiros envolvidos seguem padrões rígidos de segurança e confidencialidade.
               {"\n\n"}
               4. Segurança dos dados Tomamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, perda, alteração ou destruição. O acesso às suas informações é restrito a colaboradores autorizados, e todos os dados são armazenados de forma segura em conformidade com a legislação vigente.
               {"\n\n"}
               5. Retenção de dados Seus dados serão armazenados pelo tempo necessário para fornecer os serviços do aplicativo ou conforme exigido pela lei. Caso deseje excluir sua conta ou seus dados, você pode fazer isso a qualquer momento diretamente no aplicativo ou entrando em contato conosco.
               {"\n\n"}
               6. Seus direitos Você tem o direito de acessar, corrigir ou excluir suas informações pessoais, assim como solicitar a limitação do processamento de seus dados. Também pode retirar seu consentimento para o uso de dados a qualquer momento, o que poderá impactar a funcionalidade do aplicativo.
               {"\n\n"}
               7. Alterações nesta política Reservamo-nos o direito de alterar esta Política de Privacidade a qualquer momento. As mudanças serão comunicadas através do aplicativo e entrarão em vigor imediatamente após a publicação. Recomendamos que revise esta política periodicamente.
               {"\n\n"}
               8. Contato Se você tiver dúvidas sobre nossa Política de Privacidade ou sobre como suas informações são tratadas, entre em contato conosco pelo e-mail [nutria@gmail.com].
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
      fontSize: 20,
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

export default PoliticaPrivacidadeScreen;
