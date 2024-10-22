import React from 'react';
import { Modal, View, Image, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getResponsiveSizeWidth, hexToRgba } from '../utils/utils';
import theme from '../styles/theme';
import { CameraCapturedPicture } from 'expo-camera';

interface ModalWithImageProps {
   fotoFile: CameraCapturedPicture;
   showModal: boolean;
   setShowModal: (visible: boolean) => void;
   handleDeleteImage: () => void;
}

const ModalWithImage: React.FC<ModalWithImageProps> = ({ fotoFile, showModal, setShowModal, handleDeleteImage }) => {
   return (
      <Modal visible={showModal} transparent={true} animationType="fade">
         <View style={styles.modalContainer}>
            <View style={styles.contentContainer}>
               <Image
                  source={{ uri: fotoFile.uri }}
                  style={styles.image}
                  resizeMode="contain"
               />
               <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => setShowModal(false)}>
                     <Text style={styles.buttonText}>OK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={handleDeleteImage}>
                     <Text style={styles.buttonText}>Apagar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: hexToRgba(theme.colors.color01, '0.5'),
   },
   contentContainer: {
      borderWidth: 10,
      borderColor: theme.colors.color05,
      alignSelf: 'center',
      borderRadius: getResponsiveSizeWidth(5),
   },
   image: {
      width: getResponsiveSizeWidth(70),
      height: getResponsiveSizeWidth(50),
   },
   buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.color05,
      paddingTop: getResponsiveSizeWidth(2),
   },
   buttonContainer: {
      paddingVertical: getResponsiveSizeWidth(1),
      paddingHorizontal: getResponsiveSizeWidth(7)
   },
   buttonText: {
      color: theme.colors.color01,
      fontSize: getResponsiveSizeWidth(5),
      fontFamily: 'NotoSans-SemiBold',
   }
});

export default ModalWithImage;