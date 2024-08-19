import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import ChatInput from '../components/ChatBot/ChatInput';
import MessagesChatbot from '../components/ChatBot/MessagesChatbot';
import GenderSelection from '../components/ChatBot/GenderSelection';
import DateSelector from '../components/ChatBot/DateSelector';
import PicklistSelector from '../components/ChatBot/PicklistSelector';
import NumberInput from '../components/ChatBot/NumberInput';

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

   const nextQuestion = (userAnswer: any) => {
      const userMessage = {
         _id: Math.random(),
         text: (userAnswer.toString()).trim(),
         user: "Você",
      };
      setMessages([...messages, userMessage]);

      setTimeout(() => {
         setStep(step + 1);
      }, 1000);
   };

   const flowSignUp: { [key: number]: { question: string; component: JSX.Element } } = {
      0: {
         question: "Qual seu nome?",
         component: <ChatInput onSubmit={nextQuestion} />,

      },
      1: {
         question: "Qual seu sobrenome?",
         component: <ChatInput onSubmit={nextQuestion} />,
      },
      2: {
         question: "Qual é sua data de nascimento?",
         component: <DateSelector onSelect={nextQuestion} />,
      },
      3: {
         question: "Qual é o seu sexo biológico?",
         component: <GenderSelection onSelect={nextQuestion} />,
      },
      4: {
         question: "Sua alimentação se enquadra em qual categoria?",
         component: <PicklistSelector onSelect={nextQuestion} picklistOptions={['Onívora', 'Vegetariana', 'Vegana']} />,
      },
      5: {
         question: "Qual é o seu peso atual?",
         component: <NumberInput onSubmit={nextQuestion} maxValue={500} maxLength={6} allowDecimal={true} unidadeMedida='kg' />,
      },
      6: {
         question: "Qual é sua altura?",
         component: <NumberInput onSubmit={nextQuestion} maxValue={300} maxLength={3} allowDecimal={false} unidadeMedida='cm' />,
      },
      7: {
         question: "Qual é seu nível de atividade?",
         component: 
            <PicklistSelector
               onSelect={nextQuestion}
               picklistOptions={['Sedentário', 'Leve', 'Moderado', 'Intenso', 'Muito Intenso']}
            />,
      },
      8: {
         question: "Qual é seu objetivo?",
         component: 
            <PicklistSelector
               onSelect={nextQuestion}
               picklistOptions={['Perda de Peso', 'Manutenção', 'Ganho de Peso']}
            />,
      },
      9: {
         question: "Qual é a sua meta de peso?",
         component: <NumberInput onSubmit={nextQuestion} maxValue={500} maxLength={6} allowDecimal={true} unidadeMedida='kg'/>,
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
