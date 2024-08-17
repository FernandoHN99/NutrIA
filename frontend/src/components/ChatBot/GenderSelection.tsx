import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../../utils/utils';
import theme from '../../styles/theme';

interface GenderSelectionProps {
   onSelect: (userAnswer: string) => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ onSelect }) => {
  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={() => onSelect('Homem')} 
         style={[styles.button, 
            {backgroundColor: theme.colors.color05}]}>
         <Text style={styles.buttonText}>Homem</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('Mulher')} 
         style={[styles.button, 
            {backgroundColor: theme.colors.color04}]}>
         <Text style={styles.buttonText}>Mulher</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
   viewContainer: {
      borderTopColor: theme.colors.color05,
      borderTopWidth: 1,
      padding: getResponsiveSizeHeight(2.5),
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      // marginHorizontal: 'auto',
      marginVertical: getResponsiveSizeHeight(2.5),
   },
   button: {
      flex: 0.45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getResponsiveSizeWidth(10),
      width: getResponsiveSizeWidth(10),
      height: getResponsiveSizeWidth(10),

   },
   buttonText: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color01,
   },

});

export default GenderSelection;
