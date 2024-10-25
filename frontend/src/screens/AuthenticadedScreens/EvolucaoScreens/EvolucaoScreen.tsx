import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../../../utils/utils';

const EvolucaoScreen = () => {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Em breve...</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
    fontFamily: 'NotoSans-Regular',
    fontSize: getResponsiveSizeWidth(7),
   },
});

export default EvolucaoScreen;
