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
      <TouchableOpacity onPress={() => onSelect('Masculino')} 
         style={styles.button}>
         <Text style={styles.buttonText}>Masculino</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('Feminino')} 
         style={styles.button}>
         <Text style={styles.buttonText}>Feminino</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
   viewContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   button: {
      flex: 0.45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getResponsiveSizeWidth(10),
      padding: getResponsiveSizeHeight(1.5),
      marginBottom: getResponsiveSizeHeight(1),
      borderColor: theme.colors.color05,
      borderWidth: 1,
   },
   buttonText: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color05,
   },

});

export default GenderSelection;
