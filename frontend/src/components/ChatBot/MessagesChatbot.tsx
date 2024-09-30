import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../../utils/utils';
import { hexToRgba } from '../../utils/utils';

const MessagesChatbot = ({ text, user }: { text: string, user: string }) => (
   <View style={user === "Você" ? styles.userMessage : styles.botMessage}>
      <Text style={styles.textMessage}>{text}</Text>
   </View>
);


const styles = StyleSheet.create({
   botMessage: {
      backgroundColor: hexToRgba(theme.colors.color04, '0.5'),
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
   textMessage: {
      color: theme.colors.black,
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.7),
      
   }
});

export default MessagesChatbot;
