import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getResponsiveSizeHeight, getResponsiveSizeWidth, hexToRgba } from '../../../utils/utils';
import theme from '../../../styles/theme';
import Icon from '@expo/vector-icons/Ionicons';

const EvolucaoScreen = () => {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Em breve...  {<Icon name="construct" size={30} color={theme.colors.black} />
      }</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: hexToRgba(theme.colors.color04, '0.2'),
   },
   text: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: getResponsiveSizeWidth(8),
   },
});

export default EvolucaoScreen;
