import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../../utils/utils';
import theme from '../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface PicklistSelectorProps {
   picklistOptions: string[];
   onSelect: (option: string) => void;
}

const PicklistSelector: React.FC<PicklistSelectorProps> = ({ onSelect, picklistOptions }) => {
   const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
   const [showModal, setShowModal] = useState(false);

   const handleSelectOption = (option: string) => {
      setSelectedOption(option);
      setShowModal(false);
   };

   const handleSend = () => {
      if (selectedOption) {
         onSelect(selectedOption);
         setSelectedOption(undefined);
      }
   };

   return (
      <View style={styles.viewContainer}>
         <View style={styles.viewInput}>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.selector}>
               <Text style={styles.buttonText}>
                  {selectedOption || 'Selecionar Opção'}
               </Text>
            </TouchableOpacity>
            {selectedOption && (
               <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                  <Icon name="send-outline" size={getResponsiveSizeWidth(7)} color={theme.colors.color01} />
               </TouchableOpacity>
            )}
         </View>
         {showModal && (
            <Modal transparent={true} animationType="slide">
               <View style={styles.modalContainer}>
                  <View style={styles.pickerContainer}>
                     {picklistOptions.map(option => (
                        <TouchableOpacity 
                           key={option} 
                           onPress={() => handleSelectOption(option)} 
                           style={styles.optionButton}
                        >
                           <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                     ))}
                  </View>
               </View>
            </Modal>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   viewContainer: {
      borderTopColor: theme.colors.color05,
      borderTopWidth: 1,
      padding: getResponsiveSizeHeight(2.5),
   },
   viewInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
   },
   selector: {
      alignItems: 'center',
      borderRadius: getResponsiveSizeWidth(10),
      paddingVertical: getResponsiveSizeHeight(1),
      borderColor: theme.colors.color05,
      borderWidth: 1,
      flexBasis: '70%',
   },
   buttonText: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color05,
      textAlign: 'center',
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   pickerContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: getResponsiveSizeHeight(2),
   },
   optionButton: {
      padding: getResponsiveSizeHeight(1.5),
   },
   optionText: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color05,
      textAlign: 'center',
   },
   doneButton: {
      alignItems: 'center',
      padding: getResponsiveSizeHeight(1.5),
   },
   doneButtonText: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color05,
   },
   sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: getResponsiveSizeWidth(3),
      backgroundColor: theme.colors.color05,
      borderRadius: getResponsiveSizeHeight(10),
      padding: getResponsiveSizeWidth(3),
   },
});

export default PicklistSelector;
