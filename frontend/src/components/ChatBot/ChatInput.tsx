import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

interface ChatInputProps {
   onSubmit: (userAnswer: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
   const [text, setText] = useState<string>('');

   const handleSend = () => {
      if (text.trim()) {
         onSubmit(text.trim());
         setText('');
      }
   };

   return (
      <View style={styles.inputContainer}>
         <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Digite aqui..."
            placeholderTextColor={theme.colors.color04}
            multiline
         />
         <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Icon name="send-outline" size={24} color={theme.colors.color01} />
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: getResponsiveSizeWidth(5),
      borderTopWidth: 1,
      borderColor: theme.colors.color05,
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
      color: theme.colors.color05,
      paddingVertical: getResponsiveSizeHeight(1.5),
   },
   sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: getResponsiveSizeWidth(3),
      backgroundColor: theme.colors.color05,
      borderRadius: getResponsiveSizeWidth(10),
      padding: getResponsiveSizeWidth(3.5),
   },
});

export default ChatInput;
