import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatInput = ({ value, onChange, onSend }: { value: string, onChange: (text: string) => void, onSend: () => void }) => (
   <View style={styles.inputContainer}>
      <TextInput
         style={styles.textInput}
         value={value}
         onChangeText={onChange}
         placeholder="Digite aqui..."
         placeholderTextColor={theme.colors.color04}
         multiline
      />
      <TouchableOpacity onPress={onSend} style={styles.sendButton}>
         <Icon name="send-outline" size={24} color={theme.colors.color01} />
      </TouchableOpacity>
   </View>
);


const styles = StyleSheet.create({
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: getResponsiveSizeWidth(5),
      backgroundColor: theme.colors.color01,
      borderTopWidth: 1,
      borderColor: theme.colors.color04,
   },
   textInput: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.5),
      flex: 1,
      minHeight: getResponsiveSizeHeight(5),
      borderRadius: getResponsiveSizeWidth(10),
      borderColor: theme.colors.color05,
      borderWidth: 1.5,
      backgroundColor: theme.colors.color01,
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
