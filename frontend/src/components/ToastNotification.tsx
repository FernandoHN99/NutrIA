import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

interface ToastNotificationProps {
   message: string;
   duration?: number;
   onHide?: () => void;
}

const ToastNotification = ({ message, duration = 1500, onHide }: ToastNotificationProps) => {
   const opacity = useRef(new Animated.Value(0)).current;
   // const translateY = useRef(new Animated.Value(100)).current;
   const translateX = useRef(new Animated.Value(-300)).current;

   useEffect(() => {
      Animated.parallel([
         Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
         }),
         Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
         }),
      ]).start();

      const timer = setTimeout(() => {
         Animated.parallel([
            Animated.timing(opacity, {
               toValue: 0,
               duration: 300,
               useNativeDriver: true,
            }),
            Animated.timing(translateX, {
               toValue: 100,
               duration: 300,
               useNativeDriver: true,
            }),
         ]).start(() => {
            if (onHide) onHide();
         });
      }, duration);

      return () => clearTimeout(timer);
   }, [opacity, translateX, duration, onHide]);

   return (
      <Animated.View
         style={[
            styles.container,
            {
               opacity,
               transform: [{ translateX }],
            },
         ]}
      >
         <Text style={styles.text}>{message}</Text>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      right: 20,
      backgroundColor: theme.colors.color05,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: theme.colors.color01,
      fontSize: 16,
      textAlign: 'center',
   },
});

export default ToastNotification;