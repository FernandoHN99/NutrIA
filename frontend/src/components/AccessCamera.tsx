import { CameraView, CameraType, useCameraPermissions, CameraPictureOptions, CameraCapturedPicture } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../utils/utils';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

interface AccessCameraProps {
   setFotoFile: React.Dispatch<React.SetStateAction<string | null>>;
   setCameraView: React.Dispatch<React.SetStateAction<boolean>>;
   fotoFileView?: string | null;
}

const AccessCamera = ({ setFotoFile, setCameraView, fotoFileView = null }: AccessCameraProps) => {

   const [facing, setFacing] = useState<CameraType>('back');
   const cameraRef = useRef<CameraView | null>(null);
   const [cameraReady, setCameraReady] = useState(false);
   const [fotoFileTemp, setFotoFileTemp] = useState<string | null>(fotoFileView);
   const [permission, requestPermission] = useCameraPermissions();
   const hasShownAlertRef = useRef(false);

   useEffect(() => {
      const handleRequestPermission = async () => {
         if (permission?.granted === false && !hasShownAlertRef.current) {
            const { status } = await requestPermission();
            if (status !== 'granted') {
               hasShownAlertRef.current = true;
               Alert.alert('Permissão de Acesso', 'Desculpe, precisamos de permissão para acessar sua câmera!');
               setCameraView(false);
            }
         }
      }

      handleRequestPermission();
   }, [permission?.granted]);

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

         const manipulatedImage = await ImageManipulator.manipulateAsync(
            photoData.uri,
            [{ resize: { width: 800 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
         );

         const base64Image = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
            encoding: FileSystem.EncodingType.Base64,
         });

         setFotoFileTemp(`data:image/jpeg;base64,${base64Image}`);
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
         <View style={{ flex: 1, backgroundColor: theme.colors.black }}>
            <Image source={{ uri: fotoFileTemp! }} style={{ flex: 0.8 }} resizeMode="contain" />
            <View style={{ position: 'absolute', bottom: '5%', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
               <TouchableOpacity onPress={handleCancelarFoto} style={{ marginRight: '15%' }}>
                  <Icon name="trash-can" size={getResponsiveSizeWidth(11)} color={theme.colors.color01} />
               </TouchableOpacity>
               <TouchableOpacity onPress={handleAceitarFoto}>
                  <Icon name="check-circle" size={getResponsiveSizeWidth(11)} color={theme.colors.color01} />
               </TouchableOpacity>
            </View>
         </View>
      );
   }

   const handleAceitarFoto = () => {
      setFotoFile(fotoFileTemp);
      setCameraView(false);
   }

   const handleCancelarFoto = () => {
      if (cameraReady) {
         setFotoFileTemp(null);
      } else {
         setFotoFile(null);
         setCameraView(false);
      }
   }

   if (!permission) return null;

   return (
      <View style={styles.container}>
         {
            fotoFileTemp ?
               pendingPhoto() :
               (<CameraView
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
                  {
                     cameraReady ?
                        <View style={styles.buttonActionsContainer}>
                           <TouchableOpacity onPress={takePicture}>
                              <Icon name="camera-iris" size={getResponsiveSizeWidth(13)} color={theme.colors.color01} />
                           </TouchableOpacity>
                        </View>
                        :
                        loadingCamera()
                  }
               </CameraView>
               )
         }
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