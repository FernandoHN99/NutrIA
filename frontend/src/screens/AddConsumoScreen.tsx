import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight, hexToRgba } from '../utils/utils';
import ProgressCircle from '../components/ProgressCircle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';

const RefeicaoScreen = ({ route }: { route: any }) => {
   const [text, setText] = useState<string>('');
   const [results, setResults] = useState<string[]>([]);

   const handleSearch = (query: string) => {
      setText(query);
      // Aqui você pode filtrar os resultados da busca
      // Exemplo de resultados de teste:
      const filteredResults = mockData.filter((item) =>
         item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
   };

   const mockData = ['Banana', 'Maçã', 'Laranja', 'Pão', 'Arroz', 'Feijão'];


   const navigation = useNavigation();
   const { nomeRefeicao, macrosRefeicao, perfilDia } = route.params;

   const handleGoBack = () => {
      navigation.goBack();
   };

   return (
      <View style={styles.mainPageContainer}>
         <View style={styles.alimentosContainer}>
            <Text style={styles.subtitulo}>Alimentos</Text>
            <TextInput
               style={styles.searchBar}
               value={text}
               onChangeText={handleSearch}
               placeholder="Adcionar alimentos..."
               placeholderTextColor={theme.colors.color04}
            />
            <View style={styles.alimentosContentContainer}>
               {text && results.length > 0 ? (
                  <FlatList
                     data={results}
                     keyExtractor={(item, index) => index.toString()}
                     renderItem={({ item }) => (
                        <Text style={styles.resultItem}>{item}</Text>
                     )}
                  />
               ) : (
                  // <Text style={styles.noResults}>Nenhum alimento encontrado</Text>
                  null
               )}
            </View>
            <View style={styles.alimentosContentContainer}>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   mainPageContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor,
   },
   titulo: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(7),
      color: theme.colors.color05,
      marginLeft: getResponsiveSizeWidth(3),
      marginVertical: getResponsiveSizeWidth(1),
      textAlign: 'center',
   },
   subtitulo: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(5),
      color: theme.colors.color05,
      marginLeft: getResponsiveSizeWidth(3),
      marginVertical: getResponsiveSizeWidth(1),
   },
   alimentosContainer: {
      marginTop: getResponsiveSizeHeight(1),
   },
   alimentosContentContainer: {
   },
   searchBar: {
      fontFamily: 'NotoSans-Regular',
      fontSize: getResponsiveSizeWidth(3.5),
      minHeight: getResponsiveSizeHeight(5),
      borderRadius: getResponsiveSizeWidth(10),
      borderColor: theme.colors.color05,
      borderWidth: 2,
      paddingHorizontal: getResponsiveSizeWidth(5),
      color: theme.colors.color05,
      paddingVertical: getResponsiveSizeHeight(1.5),
   },
   resultItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
   },

});

export default RefeicaoScreen;
