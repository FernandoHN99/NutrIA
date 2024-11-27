import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../styles/theme';

interface InfoHelperProps {
   onClose: () => void;
   contentText?: string;
   titleText?: string;
 }
 
 const InfoHelper: React.FC<InfoHelperProps> = ({ onClose, titleText, contentText }) => {
   return (
     <View style={styles.container}>
       <Text style={styles.title}>{titleText}</Text>
       <Text style={styles.content}>
          {contentText}
       </Text>
       <TouchableOpacity style={styles.button} onPress={onClose}>
         <Text style={styles.buttonText}>OK</Text>
       </TouchableOpacity>
     </View>
   );
 };
 

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.color05,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 18,
    color: theme.colors.color01, 
    textAlign: 'center',
    marginBottom: 15,
  },
  content: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 16,
    color: theme.colors.color01,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.color02,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
    color: theme.colors.black, 
    textAlign: 'center',
  },
});

export default InfoHelper;
