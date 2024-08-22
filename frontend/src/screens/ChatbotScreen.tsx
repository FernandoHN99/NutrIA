import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ChatbotScreen = () => {
   return (
      // <View style={{ flex: 1 }}>
    <WebView
      style={styles.container}
      source={{ uri: 'https://chatgpt.com' }}
    />
   //  </View>
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
