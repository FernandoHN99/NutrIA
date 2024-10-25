import { CameraView, CameraType, useCameraPermissions, CameraPictureOptions, CameraCapturedPicture } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles/theme';
import { getResponsiveSizeHeight, getResponsiveSizeWidth } from '../utils/utils';
import { base64Mock } from '../config/variaveis';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const photoDataMock: CameraCapturedPicture = {
   uri: 'https://diplomatique.org.br/wp-content/uploads/2023/10/agricultura-arroz-feijao.jpg', // URL da imagem hardcoded
   width: 1024,
   height: 768,
   base64: base64Mock
 };

interface AccessCameraProps {
   setFotoFile: React.Dispatch<React.SetStateAction<CameraCapturedPicture | null>>;
   setCameraView: React.Dispatch<React.SetStateAction<boolean>>;
   setShowModalImage: (visible: boolean) => void;
}

const AccessCamera = ({ setFotoFile, setCameraView, setShowModalImage }: AccessCameraProps) => {

   const [facing, setFacing] = useState<CameraType>('back');
   const cameraRef = useRef<CameraView | null>(null);
   const [cameraReady, setCameraReady] = useState(false);


   const toggleCameraFacing = () => {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
   }

   const hanldeErrorCamera = () => {
      Alert.alert('Erro', 'Erro ao acessar a câmera');
      setCameraView(false);
   }


   // const takePicture = async () => {
   //    if (cameraRef.current) {
   //       const options: CameraPictureOptions = { quality: 0.1, base64: true, skipProcessing: true };
   //       const photoData = await cameraRef.current.takePictureAsync(options);
   //       if (!photoData) {
   //          return;
   //       }
   //       setFotoFile(photoData);
   //       setCameraView(false);
   //    }
   // }

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
   
         // Converter a imagem manipulada para base64
         const base64Image = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
            encoding: FileSystem.EncodingType.Base64,
         });
   
         // Criar um arquivo de texto com o conteúdo base64
         // const base64String = `data:image/jpeg;base64,${base64Image}`;
         // const fileUri = `${FileSystem.documentDirectory}image_base64.txt`;
         // await FileSystem.writeAsStringAsync(fileUri, base64String);
   
         // // Baixar o arquivo usando a biblioteca Sharing
         // await Sharing.shareAsync(fileUri);
   
         // Atualiza o estado se necessário
         setFotoFile({ ...photoData, base64: `data:image/jpeg;base64,${base64Image}` });
         setCameraView(false);
      }
   }

   // const takePictureMock = async () => {
   //       if (!photoDataMock) {
   //          return;
   //       }
   //       setFotoFile(photoDataMock);
   //       setCameraView(false);
   //       // setShowModalImage(true);
   // }

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

   return (
      <View style={styles.container}>
         <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
            onMountError={hanldeErrorCamera}
            // onMountError={() => setCameraReady(true)}
            ratio={'1:1'}
            autofocus='off'
            animateShutter={true}
         >
         <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Icon
               name='close-circle'
               color={theme.colors.color01}
               size={getResponsiveSizeWidth(11)}
               style={{alignSelf: 'flex-start', marginLeft: getResponsiveSizeWidth(5), marginTop: getResponsiveSizeWidth(5)}}
               // style={{ position: 'absolute', top: getResponsiveSizeHeight(2), right: getResponsiveSizeHeight(2) }}
               onPress={() => setCameraView(false)}
            />
         </View>
            {cameraReady ?
               <View style={styles.buttonActionsContainer}>
                  {/* <TouchableOpacity onPress={takePictureMock}> */}
                  <TouchableOpacity onPress={takePicture}>
                     <Icon name="camera-iris" size={getResponsiveSizeWidth(13)} color={theme.colors.color01} />
                  </TouchableOpacity>
               </View>
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