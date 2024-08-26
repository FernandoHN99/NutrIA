import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import MessagesChatbot from '../components/ChatBot/MessagesChatbot';
import FlowSignUp from '../components/FlowSignUp';
import fazerSignUp from '../api/hooks/usuario/fazerSignUp';
import { useAuthToken } from '../utils/useAuthToken';

const SignUpScreen = ({ navigation, route }: { navigation: any, route: any }) => {

   const { setIsAuthenticated } = route.params;

   const scrollViewRef = useRef<ScrollView>(null);
   const [loadingChatbot, setLoadingChatbot] = useState(false);
   const [step, setStep] = useState(0);
   const [answers, setAnswers] = useState<any>({});
   const { saveToken } = useAuthToken()


   const [messages, setMessages] = useState<{ _id: number, text: string; user: string; }[]>([
      {
         _id: Math.random(),
         text: "Sua jornada está prestes a começar... \n\nPara isso, responda algumas perguntas para entendermos um pouco mais sobre você!",
         user: "NutrIA",
      }
   ]);

   const handleSignUp = async () => {
      setIsAuthenticated(null)

      // const jsonTESTE = {
      //    "altura": "178 cm",
      //    "peso_inicial": "76.75 kg",
      //    "dt_nascimento": "09/11/1999",
      //    "nivel_atividade": "Leve",
      //    "objetivo": "Ganho de Peso",
      //    "password": "1234567890",
      //    "perfil_alimentar": "Vegetariana",
      //    "peso_final": "70 kg",
      //    "email": "testeeee01@gmail.com",
      //    "nome": "Fernando",
      //    "sexo": "Masculino",
      //    "sobrenome": "Henriques"
      // }

      const { data, err } = await fazerSignUp(answers, saveToken);
      if (data) {
         setIsAuthenticated(true);
         return;
      }
      if (err) {
         console.log(err)
         setIsAuthenticated(false);
         const msgError = err?.codigo == '409' ? 'Email já cadastrado' : 'Erro ao criar a sua conta';
         Alert.alert(msgError, 'Por favor, tente novamente.')
      }
   };


   useEffect(() => {
      const botResponse = {
         _id: Math.random(),
         text: FlowSignUpInstance[step]?.question || "Fim do cadastro!",
         user: "NutrIA",
      };

      setMessages([...messages, botResponse]);
      setLoadingChatbot(false);   
      if (botResponse.text === "Fim do cadastro!") {
         setTimeout(() => { }, 1000);
         handleSignUp()
      }

   }, [step]);

   const nextQuestion = (userAnswer: any) => {
      setLoadingChatbot(true);
      setAnswers({
         ...answers,
         [FlowSignUpInstance[step]['chave']]: userAnswer
      });

      const userMessage = {
         _id: Math.random(),
         text: (FlowSignUpInstance[step]['chave'] !== 'password'
            ? (userAnswer.toString()).trim()
            : userAnswer.replace(/./g, '*')
         ),
         user: "Você",
      };

      setMessages([...messages, userMessage]);

      setTimeout(() => {
         setStep(step + 1);
      }, 1000);
   };

   const FlowSignUpInstance = FlowSignUp(nextQuestion, answers?.password)

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}
         keyboardVerticalOffset={Platform.select({ ios: getResponsiveSizeHeight(10), android: getResponsiveSizeHeight(10) })}
      >
         <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatContainer}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
         >
            {messages.map(message => (
               <MessagesChatbot key={message._id} text={message.text} user={message.user} />
            ))}
         </ScrollView>
         <View style={styles.inputContainer}>
            {loadingChatbot ?
               <ActivityIndicator size={'large'} color={theme.colors.color05} />
               :
               FlowSignUpInstance[step]?.component}
         </View>
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: theme.colors.backgroundColor,
   },
   chatContainer: {
      padding: getResponsiveSizeWidth(5),
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: getResponsiveSizeWidth(5),
      borderTopWidth: 1,
      borderColor: theme.colors.color05,
   },
});

export default SignUpScreen;
