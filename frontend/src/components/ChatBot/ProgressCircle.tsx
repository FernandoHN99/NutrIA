import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { getResponsiveSizeHeight, hexToRgba } from '../../utils/utils';
import theme from '../../styles/theme';

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
            style={styles.textContainer}
         />
         {/* Render children inside a container */}
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
   },
   text: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeHeight(1.2),
      color: hexToRgba(theme.colors.black, '0.8'),
   },
   infoCaloriasNumber: {
      fontSize: getResponsiveSizeHeight(2.1),
      fontFamily: 'NotoSans-Bold',
      color: hexToRgba(theme.colors.black, '0.8')
   },
   infoText: {
      textAlign: 'center',
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeHeight(1.2),
      color: hexToRgba(theme.colors.black, '0.8')
   },
});

export default ProgressCircle;