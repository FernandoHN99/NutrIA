import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

interface PasswordInputProps {
   onSubmit: (password: string) => void;
   passwordCheck?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onSubmit, passwordCheck }) => {
   const [text, setText] = useState<string>('');
   const [isSecure, setIsSecure] = useState<boolean>(true);

   const validatePassword = (password: string) => {
      return password.length >= 10;
   };

   const handleSend = () => {
      
      if(passwordCheck && passwordCheck !== text.trim()) {
         Alert.alert('Senhas não conferem', 'As senhas digitadas não são iguais.');
         return;
      }
      if (validatePassword(text.trim())) {
         onSubmit(text.trim());
         setText('');
      } else {
         Alert.alert('Senha inválida', 'A senha deve ter pelo menos 10 caracteres.');
      }
   };

   return (
      <View style={styles.inputContainer}>
         <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Digite sua senha..."
            placeholderTextColor={theme.colors.color05}
            secureTextEntry={isSecure}
            autoComplete="password"
         />
         <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.eyeButton}>
            <Icon name={isSecure ? "eye-off-outline" : "eye-outline"} size={30} color={theme.colors.color05} />
         </TouchableOpacity>
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
   eyeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: getResponsiveSizeWidth(3),
   },
});

export default PasswordInput;
