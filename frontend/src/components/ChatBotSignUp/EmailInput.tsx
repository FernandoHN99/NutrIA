import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

interface EmailInputProps {
   onSubmit: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onSubmit }) => {
   const [text, setText] = useState<string>('');

   const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   const handleSend = () => {
      if (validateEmail(text.trim())) {
         onSubmit(text.trim().toLocaleLowerCase());
         setText('');
      } else {
         Alert.alert('Email Inválido', 'Por favor, digite um email válido.');
      }
   };

   return (
      <View style={styles.inputContainer}>
         <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Digite seu email..."
            placeholderTextColor={theme.colors.color04}
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize='none'
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

export default EmailInput;
