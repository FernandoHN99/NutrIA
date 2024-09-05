import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import { criarStrData } from '../utils/utils';

const tamanhoLetras: number = getResponsiveSizeHeight(1.6);

const gerarDatas = (dataBase: Date = new Date(), qtdeDiasPassados: number, qtdeDiasFuturos: number) => {
   const datasControl: { [key: string]: any } = {};

   for (let i= -qtdeDiasPassados; i <= qtdeDiasFuturos; i++) {
      const data = new Date(dataBase);
      data.setDate(dataBase.getDate() + i);

      let diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
      diaSemana = diaSemana.substring(0, 3).toUpperCase();
      const dataFormatada = data.toISOString().split('T')[0];
      const [ano, mes, dia] = dataFormatada.split('-');

      datasControl[dataFormatada] = { id: dataFormatada, data: `${dia}.${mes}`, diaSemana };
   }
   return datasControl;
};


interface Dia {
   id: string;
   data: string;
   diaSemana: string;
}

interface DiaScrollProps {
   diaSelecionado: string;
   setDiaSelecionado: Function;
}

const DiaScroll = ({ diaSelecionado, setDiaSelecionado }: DiaScrollProps) => {
   const [dias, setDias] = useState<Array<Dia>>(Object.values(gerarDatas(new Date(), 30, 30)));
   const flatListRef = useRef<FlatList>(null);

   
   useEffect(() => {
      scrollDiaSelecionado(diaSelecionado);
   }, [diaSelecionado]);
   
   
   const scrollDiaSelecionado = (idDiaSelecionado: string) => {
      const selectedItem = dias.find(dia => dia.id === idDiaSelecionado);
      if (flatListRef.current && selectedItem) {
         flatListRef.current.scrollToItem({
            item: selectedItem,
            animated: true,
            viewPosition: 0.5,
         });
      }
   };


   //  const carregarMaisDias = () => {
   //    const menorData = dias[0].id;
   //    const maiorData = dias[dias.length - 1].id;
   //    const novosDiasPassados = Object.values(gerarDatas(criarData(-2,0,0,new Date(menorData)), 30, 0));
   //    const novosDiasFuturos = Object.values(gerarDatas(criarData(2,0,0,new Date(maiorData)), 0, 30));
   //    setDias(prevDias => [...novosDiasPassados, ...prevDias, ...novosDiasFuturos]);
   // };


   const renderItem = ({ item }: { item: Dia }) => (
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
               // onStartReached={() => {carregarMaisDias(true)}}
               // onEndReached={() => {carregarMaisDias(false)}}
               // onEndReachedThreshold={0.0}
               // onStartReachedThreshold={0.0}
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
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: theme.colors.color04
   },
   diaButton: {
      paddingTop: getResponsiveSizeHeight(1.5),
      paddingHorizontal: getResponsiveSizeWidth(4.5),
   },
   viewDiaSelecionado: {
      borderColor: theme.colors.color03,
      borderBottomWidth: 5,
      borderRadius: 7,
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
      fontFamily: 'NotoSans-Bold',
      borderColor: theme.colors.black,
   },
});

export default DiaScroll;