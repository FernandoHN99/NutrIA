import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import { criarStrData } from '../utils/utils';

const tamanhoLetras: number = getResponsiveSizeHeight(1.6);

const DayScroll = ({ diaSelecionado, setDiaSelecionado } : {diaSelecionado: string, setDiaSelecionado: Function}) => {

   const flatListRef = useRef<FlatList>(null);

   const gerarListaDatas = (dataBase: Date = new Date()) => {
      const listaDatas = [];

      for (let i = -30; i <= 30; i++) {
         const data = new Date(dataBase);
         data.setDate(dataBase.getDate() + i);

         let diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
         diaSemana = diaSemana.substring(0, 3).toUpperCase();
         const dataFormatada = data.toISOString().split('T')[0];
         const [ano, mes, dia] = dataFormatada.split('-');

         console.log(listaDatas)
         listaDatas.push({ id: dataFormatada, data: `${dia}.${mes}`, diaSemana });
      }
      return listaDatas;
   };

   const scrollDiaSelecionado = (idDiaSelecionado: string) => {
      const selectedItem = dias.find((item) => item.id === idDiaSelecionado);
      if (flatListRef.current && selectedItem) {
         flatListRef.current.scrollToItem({
            item: selectedItem,
            animated: true,
            viewPosition: 0.5,
         });
      }
   };

   const dias = gerarListaDatas();


   useEffect(() => {
      scrollDiaSelecionado(diaSelecionado);
   }, [diaSelecionado]);

   const renderItem = ({ item }: { item: {id: string, data: string, diaSemana: string}} ) => (
      <TouchableOpacity
         key={item.data}
         style={styles.diaButton}
         onPress={() => setDiaSelecionado(item.id)}
      >
         <View style={
            item.id !== diaSelecionado ?
               null :
               styles.viewDiaSelecionado
         }>
            <Text style={
               item.id !== diaSelecionado ?
                  styles.diaSemanaText :
                  styles.diaSemanaSelecionadoText
               }>{item.id === criarStrData() ? 'HOJE' : item.diaSemana}
            </Text>
            <Text style={
               item.id !== diaSelecionado ?
                  styles.dataText :
                  styles.dataSelecionadoText
            }>{item.data}</Text>
         </View>

      </TouchableOpacity>
   );


   return (
      <View style={styles.flatListContainer}>
         <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dias}
            renderItem={renderItem}
            keyExtractor={(dia) => dia.id}
            ref={flatListRef}
            onScrollToIndexFailed={(info) => {
               const wait = new Promise((resolve) => setTimeout(resolve, 1));
               wait.then(() => {
                 flatListRef.current?.scrollToIndex({ 
                  index: info.index,
                  animated: true,             
                  viewPosition: 0.5,
                 });
               });
             }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   flatListContainer: {
      backgroundColor: theme.colors.backgroundColor,
      // borderBottomWidth: 1,
      // borderColor: theme.colors.color03
   },
   diaButton: {
      paddingTop: getResponsiveSizeHeight(1.5),
      paddingHorizontal: getResponsiveSizeWidth(4.5),
   },
   viewDiaSelecionado: {
      borderColor: theme.colors.color03,
      borderBottomWidth: 5,
      borderRadius: 10,
      paddingBottom: 3,
   },
   diaSemanaText: {
      color: theme.colors.black,
      fontSize: tamanhoLetras,
      textAlign: 'center',
      fontFamily: 'NotoSans-Bold',
   },
   dataText: {
      color: theme.colors.black,
      fontSize: tamanhoLetras,
      textAlign: 'center',
      fontFamily: 'NotoSans-Regular',
   },
   diaSemanaSelecionadoText: {
      color: theme.colors.color03,
      fontSize: tamanhoLetras,
      textAlign: 'center',
      fontFamily: 'NotoSans-Bold',
   },
   dataSelecionadoText: {
      color: theme.colors.color03,
      fontSize: tamanhoLetras,
      textAlign: 'center',
      fontFamily: 'NotoSans-Regular',
      borderColor: theme.colors.black,
      // paddingBottom: 5
   },
});

export default DayScroll;