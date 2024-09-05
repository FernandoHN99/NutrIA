import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DiaScroll from '../components/DiaScroll';
import theme from '../styles/theme';
import DiaSumario from '../components/DiaSumario';
import MealList from '../components/MealList';
import { criarStrData } from '../utils/utils';

const HomeScreen = () => {
   const [diaSelecionado, setDiaSelecionado] = useState(criarStrData());

   // const handleAddFood = (mealName) => {
   //    console.log(`Adicionar comida em ${mealName}`);
   // };

   return (
      <View style={styles.container}>
         <DiaScroll diaSelecionado={diaSelecionado} setDiaSelecionado={setDiaSelecionado}/>
         <DiaSumario calories="1.635" consumed="0" spent="24" />
         {/* <MealList onAddFood={handleAddFood} /> */}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,

   },
});

export default HomeScreen;