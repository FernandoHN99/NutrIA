import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

interface ProgressBarProps {
   paddingValue: number;
   current: number;
   total: number;
   bgColor: string;
   progressColor: string;
   width: number;
   height: number;
}

const ProgressBar = ({ current, total, bgColor, progressColor, width,  height, paddingValue=0}: ProgressBarProps) => {
   const progress = current / total;
   return (
      <View style={{padding: paddingValue}}>
         <Progress.Bar
            progress={progress}
            width={width}
            height={height}
            color={progressColor}
            unfilledColor={bgColor}
            borderWidth={0}
         />
      </View>
   );
};


export default ProgressBar;