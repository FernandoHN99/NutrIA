import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

interface PieChartOutlineProps{
   listValues: number[];
   listColors: string[];
   sizeChart: number;
   thickness?: number;
   backgroundColor?: string;
   children?: React.ReactNode;
}

const PieChartOutline = ({listValues, listColors, sizeChart, thickness, backgroundColor, children}: PieChartOutlineProps) => {
   return (
      <View style={styles.container}>
         <PieChart
            widthAndHeight={sizeChart}
            series={listValues}
            sliceColor={listColors}
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
