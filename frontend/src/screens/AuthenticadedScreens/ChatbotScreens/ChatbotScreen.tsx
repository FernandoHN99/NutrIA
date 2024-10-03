import React, { useState, useRef, useEffect } from 'react';
import { ImageBackground, Dimensions, View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import theme from '../../../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba } from '../../../utils/utils';
import MessagesChatbot from '../../../components/ChatBot/MessagesChatbot';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFazerPergunta } from '../../../api/hooks/chatBot/useFazerPergunta';

interface message {
   _id: number;
   text: string;
   user: string;
}

const ChatbotScreen = () => {

   const scrollViewRef = useRef<ScrollView>(null);
   const [text, setText] = useState<string>('');
   const { data, loading, error, fazerPergunta } = useFazerPergunta();
   const [messages, setMessages] = useState<message[]>(
      [
         {
            _id: Math.random(),
            text: "Olá como posso te ajudar?",
            user: "NutrIA",
         }
      ]
   );

   const handleSendMessage = (userMessage: string) => {
      if (userMessage.trim() === '') return;
      setMessages([...messages, {
         _id: Math.random(),
         text: userMessage,
         user: "Você",
      }]);
      setText('');
      fazerPergunta(userMessage);
   };

   useEffect(() => {
      if (data) {
         setMessages(prevMessages => [
            ...prevMessages,
            { _id: Math.random(), text: data, user: "NutrIA" }
         ]);
      } else if (error) {
         setMessages(prevMessages => [
            ...prevMessages,
            { _id: Math.random(), text: "Desculpe, ocorreu um erro ao processar sua solicitação.", user: "NutrIA" }
         ]);
      }
   }, [data, error]);

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
            // style={styles.scrollview}
         >
            {messages.map(message => (
               <MessagesChatbot key={message._id} text={message.text} user={message.user} />
            ))}
         </ScrollView>
         {/* <ImageBackground
            style={[styles.fixed, styles.backgroundImage]} 
            source={require('../../assets/IconNutri.png')}
            resizeMode="cover"
         /> */}
         <View style={styles.inputContainer}>
            {
               loading ?
                  <ActivityIndicator size={'large'} color={theme.colors.color05} />
                  : (
                     <>
                        <TextInput
                           style={styles.textInput}
                           value={text}
                           onChangeText={setText}
                           placeholder="Digite aqui..."
                           placeholderTextColor={theme.colors.color05}
                           multiline
                           scrollEnabled={false}
                        />
                        <TouchableOpacity onPress={() => handleSendMessage(text)} style={styles.sendButton}>
                           <Icon name="send-outline" size={24} color={theme.colors.color01} />
                        </TouchableOpacity>
                     </>
                  )
            }
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
   sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: getResponsiveSizeWidth(3),
      backgroundColor: theme.colors.color05,
      borderRadius: getResponsiveSizeWidth(10),
      padding: getResponsiveSizeWidth(3.5),
   },
   textInput: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.5),
      flex: 1,
      minHeight: getResponsiveSizeHeight(5),
      borderRadius: getResponsiveSizeWidth(10),
      borderColor: theme.colors.color05,
      borderWidth: 1.5,
      backgroundColor: hexToRgba(theme.colors.color01, '0.3'),
      paddingHorizontal: getResponsiveSizeWidth(5),
      color: theme.colors.black,
      paddingVertical: getResponsiveSizeHeight(1.5),
   },
   // backgroundImage: {
   //    width: Dimensions.get('window').width,
   //    height: Dimensions.get('window').height,
   //    opacity: 0.4, // Diminuindo a opacidade para evitar que a imagem atrapalhe o conteúdo
   //    zIndex: -1
   // },
   // fixed: {
   //    position: "absolute", // Ainda mantemos o position absolute
   //    top: '42%', // Centraliza verticalmente
   //    left: '50%', // Centraliza horizontalmente
   //    transform: [
   //       { translateX: -Dimensions.get('window').width/2 }, // Metade da largura da imagem (150 / 2)
   //       { translateY: -Dimensions.get('window').height/2 }  // Metade da altura da imagem (150 / 2)
   //    ], //
   // },
   // scrollview: {
   //    backgroundColor: 'transparent'
   // }
});



export default ChatbotScreen;