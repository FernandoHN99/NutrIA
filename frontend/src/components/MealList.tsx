import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const meals = [
  { name: 'Café da Manhã', kcal: 491 },
  { name: 'Almoço', kcal: 654 },
  { name: 'Jantar', kcal: 409 },
  { name: 'Lanches', kcal: 210 },
];

const MealList = ({ onAddFood }) => {
  return (
    <View style={styles.mealContainer}>
      {meals.map((meal, index) => (
        <View key={index} style={styles.mealBox}>
          <View style={styles.mealInfo}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealKcal}>0 / {meal.kcal} kcal</Text>
          </View>
          <TouchableOpacity onPress={() => onAddFood(meal.name)}>
            <Ionicons name="add-circle-outline" size={24} color="green" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mealContainer: {
    backgroundColor: '#E6F2E6',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  mealBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mealInfo: {
    flexDirection: 'column',
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mealKcal: {
    fontSize: 14,
    color: '#777',
  },
});

export default MealList;