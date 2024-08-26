import React, { useEffect } from 'react';
import { Alert } from 'react-native';

interface CustomAlertProps {
   title?: string;
   message?: string;
   onOkPress?: () => void;
}

const CustomAlert = (title: string, message: string, onPress = () => {}) => {
   Alert.alert(
     title,
     message,
     [
       {
         text: 'OK',
         onPress: onPress,
       },
     ]
   );
 };
 

export default CustomAlert;