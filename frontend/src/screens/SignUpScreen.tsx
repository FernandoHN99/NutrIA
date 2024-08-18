import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import ChatInput from '../components/ChatBot/ChatInput';
import MessagesChatbot from '../components/ChatBot/MessagesChatbot';
import GenderSelection from '../components/ChatBot/GenderSelection';

const SignUpScreen = () => {

   const scrollViewRef = useRef<ScrollView>(null);
   const [step, setStep] = useState(0);
   const [messages, setMessages] = useState<{ _id: number; text: string; user: string; }[]>([
      {
         _id: -1,
         text: "Sua jornada está prestes a começar... \n\nPara isso, responda algumas perguntas para entendermos um pouco mais sobre você!",
         user: "NutrIA",
      },
   ]);

   useEffect(() => {
      const botResponse = {
         _id: Math.random(),
         text: flowSignUp[step]?.question || "Fim do cadastro!",
         user: "NutrIA",
      };

      setMessages([...messages, botResponse]);

      scrollViewRef.current?.scrollToEnd({ animated: true });
   }, [step]);

   const nextQuestion = (userAnswer: string) => {
      const userMessage = {
         _id: Math.random(),
         text: userAnswer.trim(),
         user: "Você",
      };
      setMessages([...messages, userMessage]);

      setTimeout(() => {
         setStep(step+ 1);
      }, 1000);
   };

   const flowSignUp: { [key: number]: { question: string; component: JSX.Element } } = {
      0: {
         question: "Qual seu nome?",
         component: <ChatInput onSubmit={nextQuestion} />,
      },
      1: {
         question: "Qual é o seu sexo?",
         component: <GenderSelection onSelect={nextQuestion} />,
      },
      2: {
         question: "Qual é o seu sexo?",
         component: <GenderSelection onSelect={nextQuestion} />,
      },
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
         {flowSignUp[step]?.component}
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
   }
});

export default SignUpScreen;
