import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatbotScreen = () => {
   return (
      <View style={styles.container}>
         <Text>ChatBot</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green',
   },
});

export default ChatbotScreen;
