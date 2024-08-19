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
import EmailInput from '../components/ChatBot/EmailInput';
import PasswordInput from '../components/ChatBot/PasswordInput';

const SignUpScreen = () => {

   const scrollViewRef = useRef<ScrollView>(null);
   const [step, setStep] = useState(0);
   const [answers, setAnswers] = useState<any>({});
   const [messages, setMessages] = useState<{ text: string; user: string; }[]>([
      {
         text: "Sua jornada está prestes a começar... \n\nPara isso, responda algumas perguntas para entendermos um pouco mais sobre você!",
         user: "NutrIA",
      }
   ]);

   useEffect(() => {
      const botResponse = {
         text: flowSignUp[step]?.question || "Fim do cadastro!",
         user: "NutrIA",
      };

      setMessages([...messages, botResponse]);

      scrollViewRef.current?.scrollToEnd({ animated: true });
   }, [step]);

   const nextQuestion = (userAnswer: any) => {
      setAnswers({ ...answers, [step]: userAnswer });

      const userMessage = {
         text: (step <= 10 ? (userAnswer.toString()).trim() : userAnswer.replace(/./g, '*')),
         user: "Você",
      };

      setMessages([...messages, userMessage]);
      
      setTimeout(() => {
         setStep(step + 1);
      }, 1000);
   };
   

   const flowSignUp: { [key: number]: { question: string; component: JSX.Element; } } = {
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
            helperTitle='Sobre nível de atividade física'
            helperText={`Sedentário: Exercício mínimo \n Leve: 1-3 dias por semana \n Moderado: 3-5 dias por semana \n Intenso: 6-7 dias por semana \n Muito Intenso: Atleta, 2x por dia`}
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
      10: {
         question: "Qual o seu email?",
         component: <EmailInput onSubmit={nextQuestion} />,
      },
      11: {
         question: "Digite uma senha.",
         component: <PasswordInput onSubmit={nextQuestion} />,
      },
      12: {
         question: "Digite a senha novamente.",
         component: <PasswordInput onSubmit={nextQuestion} passwordCheck={answers[11]}/>,
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
               <MessagesChatbot text={message.text} user={message.user} />
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
