import { CameraView, CameraType, useCameraPermissions, CameraPictureOptions, CameraCapturedPicture } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../utils/utils';
import { base64Mock } from '../config/variaveis';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';


const photoDataMock: CameraCapturedPicture = {
   uri: 'https://diplomatique.org.br/wp-content/uploads/2023/10/agricultura-arroz-feijao.jpg', // URL da imagem hardcoded
   width: 1024,
   height: 768,
   base64: `${base64Mock}`
};

interface AccessCameraProps {
   setFotoFile: React.Dispatch<React.SetStateAction<CameraCapturedPicture | null>>;
   setCameraView: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccessCamera = ({ setFotoFile, setCameraView }: AccessCameraProps) => {

   const [facing, setFacing] = useState<CameraType>('back');
   const cameraRef = useRef<CameraView | null>(null);
   const [cameraReady, setCameraReady] = useState(true);
   const [fotoFileTemp, setFotoFileTemp] = useState<CameraCapturedPicture | null>(photoDataMock);


   const toggleCameraFacing = () => {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
   }

   const hanldeErrorCamera = () => {
      Alert.alert('Erro', 'Erro ao acessar a câmera');
      setCameraView(false);
   }

   const takePicture = async () => {
      if (cameraRef.current) {
         const options: CameraPictureOptions = { quality: 1, base64: true, skipProcessing: true };
         const photoData = await cameraRef.current.takePictureAsync(options);
         if (!photoData) {
            return;
         }

         // Redimensionar a imagem
         const manipulatedImage = await ImageManipulator.manipulateAsync(
            photoData.uri,
            [{ resize: { width: 800 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
         );

         const base64Image = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
            encoding: FileSystem.EncodingType.Base64,
         });

         setFotoFileTemp({ ...photoData, base64: `data:image/jpeg;base64,${base64Image}` });
      }
   }

   const loadingCamera = () => {
      return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View >
               <ActivityIndicator size="large" color={theme.colors.color01} />
               <Text style={{ color: theme.colors.color01, marginTop: getResponsiveSizeHeight(2), fontSize: getResponsiveSizeHeight(2) }}>
                  Abrindo sua câmera
               </Text>
            </View>
         </View>
      )
   };

   const pendingPhoto = () => {
      return (
         <View style={{ flex: 1 }}>
            <Image source={{ uri: fotoFileTemp!.uri }} style={{ flex: 0.8 }} resizeMode="contain" />
            <View style={{ position: 'absolute', bottom: '25%', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
               <TouchableOpacity onPress={()=>setFotoFileTemp(null)} style={{marginRight: '15%'}}>
                  <Icon name="trash-can" size={getResponsiveSizeWidth(13)} color={theme.colors.color01} />
               </TouchableOpacity>
               <TouchableOpacity onPress={handleAceitarFoto}>
                  <Icon name="check-circle" size={getResponsiveSizeWidth(13)} color={theme.colors.color01} />
               </TouchableOpacity>
            </View>
         </View>
      );
   }

   const handleAceitarFoto = () => {
      setFotoFile(fotoFileTemp);
      setCameraView(false);
   }

   return (
      <View style={styles.container}>
         <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
            onMountError={hanldeErrorCamera}
            ratio={'1:1'}
            autofocus='off'
            animateShutter={true}
         >
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
               <Icon
                  name='close-circle'
                  color={theme.colors.color01}
                  size={getResponsiveSizeWidth(11)}
                  style={{ alignSelf: 'flex-start', marginLeft: getResponsiveSizeWidth(5), marginTop: getResponsiveSizeWidth(5) }}
                  onPress={() => setCameraView(false)}
               />
            </View>
            {cameraReady ?
               !fotoFileTemp ?
                  <View style={styles.buttonActionsContainer}>
                     <TouchableOpacity onPress={takePicture}>
                        <Icon name="camera-iris" size={getResponsiveSizeWidth(13)} color={theme.colors.color01} />
                     </TouchableOpacity>
                  </View>
                  :
                  pendingPhoto()
               :
               loadingCamera()
            }
         </CameraView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
   },
   camera: {
      flex: 1,
   },
   buttonActionsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
      marginBottom: getResponsiveSizeHeight(5),
   },
   text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
   },
});

export default AccessCamera;