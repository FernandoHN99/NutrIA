import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

interface NumberInputProps {
   onSubmit: (userAnswer: string) => void;
   allowDecimal: boolean;
   maxValue?: number;
   maxLength?: number;
   unidadeMedida?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ onSubmit, allowDecimal, maxValue, maxLength, unidadeMedida }) => {
   const [text, setText] = useState<string>('');

   const handleSend = () => {
      if (text.trim()) {
         if(unidadeMedida){
            onSubmit(text.trim() + ' ' + unidadeMedida);
         } else{
            onSubmit(text.trim());
         }
         setText('');
      }
   };

   const handleChangeText = (input: string) => {
      let numericText = '';
   
      if (allowDecimal) {
         numericText = input.replace(/[^0-9.]/g, '');
   
         const parts = numericText.split('.');
         if (parts.length > 2) {
            numericText = parts.shift() + '.' + parts.join('');
         }
         numericText = numericText.replace(/(\..*)\./g, '$1');
      } else {
         numericText = input.replace(/[^0-9]/g, '');
      }
   
      if (maxValue) {
         const numericValue = parseFloat(numericText);
         if (!isNaN(numericValue) && numericValue > maxValue) {
            numericText = maxValue.toString();
         }
      }
   
      setText(numericText);
   };
   

   return (
      <View style={styles.inputContainer}>
         <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={handleChangeText}
            placeholder="Digite números..."
            placeholderTextColor={theme.colors.color04}
            keyboardType="numeric"
            maxLength={maxLength}
         />
         {unidadeMedida && (
         <View style={styles.unidadeContainer}>
            <Text style={styles.unidadeText}>{unidadeMedida}</Text>
         </View>
         )}
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
      justifyContent: 'space-between',
   },
   unidadeContainer: {
      borderWidth: 1.5,
      borderRadius: getResponsiveSizeWidth(4),
      borderColor: theme.colors.color05,
      padding: getResponsiveSizeHeight(1.5),
      marginLeft: getResponsiveSizeWidth(2),
   },
   unidadeText: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(3.5),
      color: theme.colors.color05,
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

export default NumberInput;
