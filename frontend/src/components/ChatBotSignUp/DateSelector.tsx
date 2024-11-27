import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../../utils/utils';
import theme from '../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';


interface DateSelectorProps {
   onSelect: (date: string) => void;
}


const DateSelector: React.FC<DateSelectorProps> = ({ onSelect }) => {
   const [date, setDate] = useState<Date | undefined>(undefined);
   const [show, setShow] = useState(false);

   const onChange = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
   };

   const showDatepicker = () => {
      setShow(true);
   };

   const handleSend = () => {
      if (date) {
         onSelect(date.toLocaleDateString());
         setShow(false);
      }
   };

   return (
      <View style={styles.viewContainer}>
         <TouchableOpacity onPress={showDatepicker} style={styles.dateSelector}>
            <Text style={styles.buttonText}>
               {date ? date.toLocaleDateString() : 'Selecionar Data de Nascimento'}
            </Text>
         </TouchableOpacity>
         {date && (
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
               <Icon name="send-outline" size={getResponsiveSizeWidth(7)} color={theme.colors.color01} />
            </TouchableOpacity>
         )}
         {show && (
            Platform.OS === 'ios' ? (
               <Modal transparent={true} animationType="slide">
                  <View style={styles.modalContainer}>
                     <View style={styles.pickerContainer}>
                        <DateTimePicker
                           value={date || new Date()}
                           mode="date"
                           // display="default"
                           onChange={onChange}
                           style={styles.dateTimePicker}
                           maximumDate={new Date()}
                           textColor={theme.colors.color05}
                        />
                        <TouchableOpacity onPress={() => setShow(false)} style={styles.doneButton}>
                           <Text style={styles.doneButtonText}>Concluído</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </Modal>
            ) : (
               <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={onChange}
                  maximumDate={new Date()}
               />
            )
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   viewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
   },
   dateSelector: {
      alignItems: 'center',
      borderRadius: getResponsiveSizeWidth(10),
      padding: getResponsiveSizeHeight(1),
      borderColor: theme.colors.color05,
      borderWidth: 1,
      flex: 1,
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
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: getResponsiveSizeHeight(2),
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
   dateTimePicker: {
      // width: '50%',
      alignSelf: 'center',
   },
   sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: getResponsiveSizeWidth(3),
      backgroundColor: theme.colors.color05,
      borderRadius: getResponsiveSizeHeight(10),
      padding: getResponsiveSizeWidth(3
      ),
   },
});

export default DateSelector;
