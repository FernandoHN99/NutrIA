import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DayScroll from '../components/DayScroll';
import theme from '../styles/theme';
import DaySummary from '../components/DaySummary';
import MealList from '../components/MealList';

const HomeScreen = () => {
   const [selectedDay, setSelectedDay] = useState(0);

   // const handleDaySelect = (dayIndex) => {
   //    setSelectedDay(dayIndex);
   // };

   // const handleAddFood = (mealName) => {
   //    console.log(`Adicionar comida em ${mealName}`);
   // };

   return (
      <View style={styles.container}>
         <DayScroll/>
         {/* <DaySummary calories="1.635" consumed="0" spent="24" /> */}
         {/* <MealList onAddFood={handleAddFood} /> */}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      // flex: 1,
      backgroundColor: theme.colors.backgroundColor,
   },
});

export default HomeScreen;