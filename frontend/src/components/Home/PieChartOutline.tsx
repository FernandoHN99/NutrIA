import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import theme from '../../styles/theme';
import { hexToRgba, validarNumeroMaiorZero } from '../../utils/utils';

interface PieChartOutlineProps{
   listValues: number[];
   listColors: string[];
   sizeChart: number;
   thickness?: number;
   backgroundColor?: string;
   children?: React.ReactNode;
}

const PieChartOutline = ({listValues, listColors, sizeChart, thickness, backgroundColor, children}: PieChartOutlineProps) => {
   const checkListZero = listValues.every((value) => !validarNumeroMaiorZero(value));
   return (
      <View style={styles.container}>
         <PieChart
            widthAndHeight={sizeChart}
            series={checkListZero ? [1] : listValues}
            sliceColor={checkListZero ? [hexToRgba(theme.colors.black, '0.2')] : listColors}
            coverRadius={thickness}
            coverFill={backgroundColor}
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

export default PieChartOutline;
