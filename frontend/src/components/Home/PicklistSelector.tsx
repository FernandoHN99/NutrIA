import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../../utils/utils';
import theme from '../../styles/theme';


interface PicklistSelectorProps {
   initialOption?: string;
   onSelect: (option: string) => void;
   picklistOptions: { [key: string]: string };
}

const PicklistSelector: React.FC<PicklistSelectorProps> = ({ initialOption, onSelect, picklistOptions}) => {
   const [selectedOption, setSelectedOption] = useState<string | undefined>(initialOption);
   const [showModal, setShowModal] = useState(false);

   const handleSelectOption = (option: string) => {
      onSelect(picklistOptions[option]);
      setSelectedOption(option);
      setShowModal(false);
   };

   return (
      <View style={styles.viewInput}>
         <TouchableOpacity onPress={() => setShowModal(true)} style={styles.selector}>
            <Text style={styles.buttonText}>
               {selectedOption || 'Selecionar Opção'}
            </Text>
         </TouchableOpacity>

         {showModal && (
            <Modal transparent={true} animationType="slide" visible={showModal} onRequestClose={() => setShowModal(false)}>
               <View style={styles.modalContainer}>
                  <View style={styles.pickerContainer}>
                     {Object.keys(picklistOptions).map((option) => (
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
   viewInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
   },
   selector: {
      alignItems: 'center',
   },
   buttonText: {
      fontFamily: 'NotoSans-SemiBold',
      fontSize: getResponsiveSizeWidth(3.8),
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
      maxHeight: '50%',
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
});

export default PicklistSelector;
