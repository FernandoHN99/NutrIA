import { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import theme from '../styles/theme';
import { getResponsiveSizeWidth, getResponsiveSizeHeight } from '../utils/utils';
import { criarStrData, criarData } from '../utils/utils';

const tamanhoLetras = getResponsiveSizeHeight(1.6);
const ITEM_WIDTH = getResponsiveSizeWidth(20);
const INTERVALO_DIAS = 10;

interface Dia {
   id: string;
   data: string;
   diaSemana: string;
}

interface DiaScrollProps {
   diaSelecionado: string;
   setDiaSelecionado: Function;
}


const gerarDatas = (dataBase = new Date(), qtdeDiasPassados: number, qtdeDiasFuturos: number) => {
   const datasControl: Array<Dia> = [];

   for (let i = -qtdeDiasPassados; i <= qtdeDiasFuturos; i++) {
      const data = new Date(dataBase);
      data.setDate(dataBase.getDate() + i);

      let diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
      diaSemana = diaSemana.substring(0, 3).toUpperCase();
      const dataFormatada = data.toISOString().split('T')[0];
      const [ano, mes, dia] = dataFormatada.split('-');

      datasControl.push({ id: dataFormatada, data: `${dia}.${mes}`, diaSemana });
   }
   return datasControl;
};



const DiaScroll = ({ diaSelecionado, setDiaSelecionado }: DiaScrollProps) => {
   const [loadingLeft, setLoadingLeft] = useState(false);
   const [datas, setDatas] = useState<Array<Dia>>(gerarDatas(new Date(), INTERVALO_DIAS, INTERVALO_DIAS));
   const flatListRef = useRef<FlatList>(null);

   useEffect(() => {
      scrollDiaSelecionado(diaSelecionado);
   }, [diaSelecionado]);

   const scrollDiaSelecionado = (idDiaSelecionado: string) => {
      const selectedItem = datas.find(dia => dia.id === idDiaSelecionado);
      if (flatListRef.current && selectedItem) {
         flatListRef.current.scrollToItem({
            item: selectedItem,
            animated: true,
            viewPosition: 0.5,
         });
      }
   };

   const carregarDatasPassadas = useCallback(() => {
      if (loadingLeft) return;
      setLoadingLeft(true);
      setTimeout(() => {
         const primeiraData = criarData(0, 0, 0, new Date(datas[0].id))
         const novasDatas = gerarDatas(primeiraData, INTERVALO_DIAS, 0);

         setDatas(prevDates => [...novasDatas, ...prevDates]);
         setLoadingLeft(false);

         if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
               offset: INTERVALO_DIAS * ITEM_WIDTH,
               animated: false,
            });
         }
      }, 500);
   }, [datas, loadingLeft]);

   const renderItem = ({ item }: { item: Dia }) => (
      <TouchableOpacity
         key={item.data}
         style={styles.diaButton}
         onPress={() => setDiaSelecionado(item.id)}
      >
         <View style={item.id !== diaSelecionado ? null : styles.viewDiaSelecionado}>
            <Text style={item.id !== diaSelecionado ? styles.diaSemanaText : styles.diaSemanaSelecionadoText}>
               {item.id === criarStrData() ? 'HOJE' : item.diaSemana}
            </Text>
            <Text style={item.id !== diaSelecionado ? styles.dataText : styles.dataSelecionadoText}>
               {item.data}
            </Text>
         </View>
      </TouchableOpacity>
   );

   return (
      <View style={styles.flatListContainer}>
         <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={datas}
            renderItem={renderItem}
            keyExtractor={(dia) => dia.id}
            ref={flatListRef}
            onScrollBeginDrag={({ nativeEvent }) => {
               if (nativeEvent.contentOffset.x <= 0) {
                  carregarDatasPassadas();
               }
            }}
            ListHeaderComponentStyle={{ justifyContent: 'center', paddingLeft: ITEM_WIDTH/4 }}
            ListHeaderComponent={loadingLeft ? <ActivityIndicator size="small" color={theme.colors.black} /> : null}
            onScrollToIndexFailed={(info) => {
               const wait = new Promise((resolve) => setTimeout(resolve, 1000));
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
      borderColor: theme.colors.color04,
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