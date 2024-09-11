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
}

const ProgressCircle = ({
   current,
   total,
   bgColor,
   progressColor,
   size,
   thickness,
}: ProgressCircleProps) => {
   const progress = current / total; // Calcula o progresso com base nos valores fornecidos
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
         <View style={styles.textContainer}>
            <View>
               <Text style={styles.infoCaloriasNumber}> {total - current}</Text>
               <Text style={styles.infoText}>Calorias</Text>
               <Text style={styles.infoText}>Restantes</Text>
            </View>
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