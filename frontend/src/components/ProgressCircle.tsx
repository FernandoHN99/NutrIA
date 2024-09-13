import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

interface ProgressCircleProps {
   current: number;
   total: number;
   bgColor: string;
   progressColor: string;
   size: number;
   thickness: number;
   children: React.ReactNode;
}

const ProgressCircle = ({
   current,
   total,
   bgColor,
   progressColor,
   size,
   thickness,
   children,
}: ProgressCircleProps) => {
   const progress = current / total;

   return (
      <View style={styles.container}>
         <Progress.Circle
            size={size}
            progress={progress}
            color={progressColor}
            unfilledColor={bgColor}
            borderWidth={0}
            thickness={thickness}
            showsText={false}
         />
         <View style={styles.textContainer}>
            {children}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
   },
   textContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
   }
});

export default ProgressCircle;