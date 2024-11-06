import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator, Text, Modal, Image } from 'react-native';
import theme from '../../../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba } from '../../../utils/utils';
import MessagesChatbot from '../../../components/ChatBotSignUp/MessagesChatbot';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useConversarChatbot } from '../../../api/hooks/chatBot/useConversarChatbot';
import { usePerfisUsuario, useUsuarioInfo, useRefeicoesUsuario } from '../../../api/httpState/usuarioData';
import { chatBotMessagesSchema } from '../../../api/schemas/chatBotSchema';
import { useQueryClient } from '@tanstack/react-query';
import { gerarTextoPerfil } from '../../../utils/formatters';
import AccessCamera from '../../../components/AccessCamera';
import { useCameraPermissions } from 'expo-camera';

const criarChatbotMessagesText = (content: string, role: 'assistant' | 'user'): chatBotMessagesSchema => {
   return {
      role,
      content: [
         {
            type: 'text',
            text: content
         }
      ]
   }
}

const criarChatbotMessagesImg = (content: string): chatBotMessagesSchema => {
   return {
      role: 'user',
      content: [
         {
            type: 'image_url',
            image_url: {
               url: content
            }
         }
      ]
   }
}
interface message {
   _id: number;
   content: string;
   role: 'assistant' | 'user';
   type: 'text' | 'img' | 'data';
}

const initMessages: message[] = [
   {
      _id: Math.random(),
      content: 'Olá, como posso te ajudar?',
      role: "assistant",
      type: 'text',
   }
]

const ChatbotScreen = () => {

   const queryClient = useQueryClient()
   const scrollViewRef = useRef<ScrollView>(null);
   const [text, setText] = useState<string>('');
   const [messages, setMessages] = useState<message[]>(initMessages);
   const { data: responseChabot, loading, error, conversarChatbot } = useConversarChatbot(queryClient);
   const { data: usuarioInfo } = useUsuarioInfo({ enabled: false });
   const { data: perfisUsuario } = usePerfisUsuario({ enabled: false });
   const { data: refeicoesUsuario } = useRefeicoesUsuario({ enabled: false });
   const [permission, requestPermission] = useCameraPermissions();
   const [fotoFile, setFotoFile] = useState<string | null>(null);
   const [cameraView, setCameraView] = useState<boolean>(false);
   const [showModal, setShowModal] = useState<boolean>(false);
   const [showModalImage, setShowModalImage] = useState<boolean>(false);

   const handleRequestPermission = () => {
      requestPermission();
      setShowModal(false);
      handleOpenCamera();
   }

   const handleOpenCamera = () => {
      if (permission) {
         if (permission.granted) {
            setCameraView(true);
         } else {
            setShowModal(true);
         }
      }
   }


   const CameraPermissionModal = () => {
      return (
         <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}
         >
            <View style={styles.modalContainer}>
               <TouchableOpacity
                  style={styles.buttonAcess}
                  onPress={handleRequestPermission}>
                  <Icon name="camera" size={getResponsiveSizeWidth(10)} color={theme.colors.color01} style={{ marginBottom: 5 }} />
                  <Text style={styles.buttonAcessText}>Conceder Permissão de Acesso a Câmera</Text>
               </TouchableOpacity>
            </View>
         </Modal>
      );
   }

   const montarUserIntro = () => {
      const refeicoesAtivas = refeicoesUsuario
         .filter((refeicao: { ativa: any; }) => refeicao.ativa)
         .map((refeicao: { nome_refeicao: string; numero_refeicao: number; }) => ({
            nome_refeicao: refeicao.nome_refeicao,
            numero_refeicao: refeicao.numero_refeicao
         }));
      const textoIntroUser = gerarTextoPerfil(usuarioInfo, perfisUsuario?.[perfisUsuario.length - 1], refeicoesAtivas);
      return criarChatbotMessagesText(textoIntroUser, 'user');
   }

   const montarChatMessageService = (userLastMessage: string, contemImg: boolean): chatBotMessagesSchema[] => {
      let retorno: chatBotMessagesSchema[] = [];
      const userIntro = montarUserIntro() as chatBotMessagesSchema;
      const userLastQuestion = criarChatbotMessagesText(userLastMessage, 'user');
      const msgsCopy = messages.map(item => ({ ...item }));
      const msgChatFormatadas = msgsCopy.slice(-10).map((message, index) => {
         return criarChatbotMessagesText(
            message.type !== 'img' ? message.content : `[IMAGEM]`, message.role);
      })
      if (contemImg) {
         retorno = [userIntro, ...msgChatFormatadas, criarChatbotMessagesImg(fotoFile!), userLastQuestion];
      } else {
         retorno = [userIntro, ...msgChatFormatadas, userLastQuestion];
      }
      return retorno;
   }

   const handleSendMessage = (userMessage: string) => {
      const contemImg = fotoFile ? true : false;
      const chatMessages = montarChatMessageService(userMessage, contemImg);
      conversarChatbot(chatMessages, contemImg);
      const imgMessage: message | null = contemImg ? { _id: Math.random(), content: fotoFile!, role: "user", type: 'img' } : null;
      const textMessage: message = { _id: Math.random(), content: userMessage.trim(), role: "user", type: 'text' };
      const newMessages = imgMessage ? [...messages, imgMessage, textMessage] : [...messages, textMessage];
      setMessages(newMessages);
      setText('');
      setFotoFile(null);
   };

   useEffect(() => {
      if (responseChabot) {
         const listResponses: message[] = [{ _id: Math.random(), content: responseChabot.resposta, role: "assistant", type: 'text' }]
         if (responseChabot.dados != null) {
            listResponses.unshift({ _id: Math.random(), content: JSON.stringify(responseChabot.dados), role: "assistant", type: 'data' });
         }
         setMessages(prevMessages => [...prevMessages, ...listResponses]);
      } else if (error) {
         setMessages(prevMessages => [
            ...prevMessages,
            { _id: Math.random(), content: "Desculpe, ocorreu um erro ao processar sua solicitação.", role: "assistant", type: 'text' }
         ]);
      }
   }, [responseChabot, error]);

   if (cameraView ) {
      return <AccessCamera setFotoFile={setFotoFile} setCameraView={setCameraView} fotoFileView={fotoFile}/>
   }


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
            <TouchableOpacity style={styles.btnLimparChat} onPress={() => setMessages(initMessages)}>
               <Text style={styles.btnText}>Limpar Chat</Text>
            </TouchableOpacity>
            {
               messages
                  .map(message => (
                     <MessagesChatbot
                        key={message._id}
                        messageObject={message} />
                  ))
            }
         </ScrollView>
         <CameraPermissionModal />

         <View style={styles.inputContainer}>
            {
               loading ?
                  <ActivityIndicator size={'large'} color={theme.colors.color05} />
                  : (
                     <>
                        <View style={styles.ctnInputUser}>
                           <TextInput
                              style={styles.textInput}
                              value={text}
                              onChangeText={setText}
                              placeholder="Digite aqui..."
                              placeholderTextColor={theme.colors.color05}
                              multiline
                              scrollEnabled={false}
                           />
                           {!fotoFile ?
                              <Icon
                                 name="camera-enhance"
                                 size={getResponsiveSizeWidth(8)}
                                 color={theme.colors.color05}
                                 onPress={()=>setCameraView(true)} />
                              :
                              <Icon
                                 name="file-image-outline"
                                 size={getResponsiveSizeWidth(9)}
                                 color={theme.colors.color05}
                                 onPress={() => setCameraView(true)}
                              />
                           }
                        </View>
                        <TouchableOpacity
                           onPress={() => handleSendMessage(text)}
                           style={styles.sendButton}
                           disabled={text.trim() === ''}>
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
      padding: getResponsiveSizeWidth(2),
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
   ctnInputUser: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'NotoSans-Regular',
      flex: 1,
      borderRadius: getResponsiveSizeWidth(10),
      borderColor: theme.colors.color05,
      borderWidth: 1.5,
      backgroundColor: hexToRgba(theme.colors.color01, '0.3'),
      paddingHorizontal: getResponsiveSizeWidth(5),
      color: theme.colors.black,
   },
   textInput: {
      flex: 0.9,
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.5),
      // minHeight: getResponsiveSizeHeight(5),
      color: theme.colors.black,
      paddingVertical: getResponsiveSizeHeight(1.5),
   },
   btnLimparChat: {
      backgroundColor: hexToRgba(theme.colors.color04, '0.1'),
      borderColor: hexToRgba(theme.colors.color05, '0.2'),
      marginBottom: getResponsiveSizeHeight(1),
      marginTop: getResponsiveSizeHeight(0.5),
      alignSelf: 'center',
      borderWidth: 1,
      paddingVertical: getResponsiveSizeWidth(1),
      paddingHorizontal: getResponsiveSizeWidth(4),
      borderRadius: getResponsiveSizeWidth(10),
   },
   btnText: {
      color: theme.colors.black,
      fontFamily: 'NotoSans-Regular',
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: hexToRgba(theme.colors.color05, '0.3'),
   },
   buttonAcess: {
      maxWidth: '80%',
      alignItems: 'center',
      backgroundColor: theme.colors.color05,
      paddingHorizontal: getResponsiveSizeWidth(10),
      paddingVertical: getResponsiveSizeHeight(2),
      borderRadius: 10,
   },
   buttonAcessText: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color01,
      textAlign: 'center',
   },
   modalText: {
      fontSize: getResponsiveSizeWidth(4),
      textAlign: 'center',
      fontFamily: 'NotoSans-Regular',
      color: theme.colors.color01,
   },
   image: {
      width: '70%',
      height: '15%',
      resizeMode: 'contain',
   },
});



export default ChatbotScreen;
