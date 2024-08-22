import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import MessagesChatbot from '../components/ChatBot/MessagesChatbot';
import FlowSignUp from '../components/FlowSignUp';


const SignUpScreen = () => {

   const scrollViewRef = useRef<ScrollView>(null);
   const [loading, setLoading] = useState(false);
   const [step, setStep] = useState(0);
   const [answers, setAnswers] = useState<string[]>([]);
   const [messages, setMessages] = useState<{ _id: number, text: string; user: string; }[]>([
      {
         _id: Math.random(),
         text: "Sua jornada está prestes a começar... \n\nPara isso, responda algumas perguntas para entendermos um pouco mais sobre você!",
         user: "NutrIA",
      }
   ]);


   useEffect(() => {
      const botResponse = {
         _id: Math.random(),
         text: FlowSignUp(nextQuestion, answers)[step]?.question || "Fim do cadastro!",
         user: "NutrIA",
      };

      setMessages([...messages, botResponse]);

      setLoading(false);
      if (botResponse.text === "Fim do cadastro!") {
         console.log("Fim do cadastro!");
      }

   }, [step]);

   const nextQuestion = (userAnswer: any) => {
      setLoading(true);
      setAnswers([...answers, userAnswer]);

      const userMessage = {
         _id: Math.random(),
         text: (step <= 10 ? (userAnswer.toString()).trim() : userAnswer.replace(/./g, '*')),
         user: "Você",
      };

      setMessages([...messages, userMessage]);

      setTimeout(() => {
         setStep(step + 1);
      }, 1000);
   };

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
         {loading ?
            <ActivityIndicator size={'large'} color={theme.colors.color05} />
            :
            FlowSignUp(nextQuestion, answers)[step]?.component}
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
