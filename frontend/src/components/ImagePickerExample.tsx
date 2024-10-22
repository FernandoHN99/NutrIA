import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerExample = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
   //  No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
   <TouchableOpacity>
      <View>
        <TouchableOpacity onPress={pickImage}>
          <Text>Escolha uma imagem</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});


export default ImagePickerExample;