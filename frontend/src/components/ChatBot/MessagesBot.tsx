import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard } from 'react-native';
import theme from '../../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../../utils/utils';


const MessagesBot = ({ text, user }: { text: string, user: string }) => (
   <View style={user === "Você" ? styles.userMessage : styles.botMessage}>
      <Text style={user === "Você" ? styles.userText : styles.botText}>{text}</Text>
   </View>
);


const styles = StyleSheet.create({
   botMessage: {
      backgroundColor: theme.colors.color05,
      padding: getResponsiveSizeWidth(4),
      borderRadius: getResponsiveSizeWidth(10),
      marginVertical: getResponsiveSizeHeight(1),
      alignSelf: 'flex-start',
      maxWidth: '80%',
   },
   userMessage: {
      backgroundColor: theme.colors.color03,
      padding: getResponsiveSizeWidth(4),
      borderRadius: getResponsiveSizeWidth(10),
      marginVertical: getResponsiveSizeHeight(1),
      alignSelf: 'flex-end',
      maxWidth: '80%',
   },
   botText: {
      color: theme.colors.color01,
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.5),
   },
   userText: {
      color: theme.colors.color01,
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.5),
   },
});

export default MessagesBot;
