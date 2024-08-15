import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Keyboard } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth } from '../utils/utils';
import ChatInput from '../components/ChatBot/ChatInput';
import MessagesBot from '../components/ChatBot/MessagesBot';

const SignUpScreen = () => {
   const scrollViewRef = useRef<ScrollView>(null); // Tipo definido para ScrollView

   const questions = [
      "Qual seu nome?",
      "Qual é o seu email?",
      "Escolha uma senha.",
      "Qual sua idade?",
      "Qual é o seu gênero?"
   ];

   const [messages, setMessages] = useState([
      {
         _id: 1,
         text: "Sua jornada está prestes a começar... \n\nPara isso, responda algumas perguntas para entendermos um pouco mais sobre você!",
         user: "NutrIA",
      },
   ]);

   const [step, setStep] = useState(0);
   const [inputText, setInputText] = useState('');

   const handleSend = () => {
      
      if (inputText.trim()) {
         Keyboard.dismiss();

         const userMessage = {
            _id: parseFloat(Math.random().toString()),
            text: inputText,
            user: "Você",
         };

         setMessages([...messages, userMessage]);

         setTimeout(() => {
            const botResponse = {
               _id: parseFloat(Math.random().toString()),
               text: step < questions.length ? questions[step] : "Cadastro concluído! Obrigado por se cadastrar.",
               user: "NutrIA",
            };

            if (step < questions.length) setStep(step + 1);

            setMessages(previousMessages => [...previousMessages, botResponse]);

            scrollViewRef.current?.scrollToEnd({ animated: true });
         }, 1000);

         setInputText('');
      }
   };

   return (
      <View style={styles.container}>
         <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatContainer}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
         >
            {messages.map(message => (
               <MessagesBot key={message._id} text={message.text} user={message.user} />
            ))}
         </ScrollView>
         <ChatInput value={inputText} onChange={setInputText} onSend={handleSend} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.color01,
      justifyContent: 'flex-end',
   },
   chatContainer: {
      padding: getResponsiveSizeWidth(5),
   }
});

export default SignUpScreen;
