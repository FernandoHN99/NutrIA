import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../../utils/utils';
import { hexToRgba } from '../../utils/utils';
import { chatBotMessagesSchema } from '../../api/schemas/chatBotSchema';

interface message {
   _id: number;
   content: string;
   role: 'assistant' | 'user';
   type: 'text' | 'img' | 'data';
}

const renderImg = (uriImg: string, widthValue: number, heightValue: number) => {
   return (
      <Image
         source={{ uri: uriImg }}
         style={{ width: widthValue, height: heightValue }}
         resizeMode="contain"
      />
   );
};

const MessagesChatbot = ({ messageObject }: { messageObject: message }) => (
   messageObject.type !== 'data' ? (
      <View
         style={
            messageObject.role === 'user'
               ? messageObject.type === 'text'
                  ? styles.userMessage
                  : styles.userImg
               : styles.botMessage
         }
      >
         {messageObject.type === 'text' ? (
            <Text style={styles.textMessage}>{messageObject.content}</Text>
         ) : (
            renderImg(messageObject.content, getResponsiveSizeWidth(50), getResponsiveSizeHeight(15))
         )}
      </View>
   ) : null
);


const styles = StyleSheet.create({
   botMessage: {
      // backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
      backgroundColor: '#8FB29D',
      padding: getResponsiveSizeWidth(4),
      borderRadius: getResponsiveSizeWidth(10),
      marginVertical: getResponsiveSizeHeight(1),
      alignSelf: 'flex-start',
      maxWidth: '80%',
      borderWidth: 1,
      borderColor: theme.colors.color04,
   },
   userMessage: {
      backgroundColor: theme.colors.color02,
      padding: getResponsiveSizeWidth(4),
      borderRadius: getResponsiveSizeWidth(10),
      marginVertical: getResponsiveSizeHeight(1),
      alignSelf: 'flex-end',
      maxWidth: '80%',
      borderWidth: 1,
      borderColor: theme.colors.color04,
   },
   userImg: {
      alignSelf: 'flex-end',
      maxWidth: '80%',
      marginTop: getResponsiveSizeHeight(2),
   },
   textMessage: {
      color: theme.colors.black,
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.7),

   }
});

export default MessagesChatbot;
