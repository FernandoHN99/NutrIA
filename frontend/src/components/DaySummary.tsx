import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DaySummary = ({ calories, consumed, spent }) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Resumo</Text>
        <View style={styles.summaryIcons}>
          <Ionicons name="restaurant-outline" size={24} color="#333" style={styles.icon} />
          <Ionicons name="settings-outline" size={24} color="#333" />
        </View>
      </View>
      <View style={styles.summaryContent}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{consumed}</Text>
          <Text style={styles.summaryLabel}>Calorias consumidas</Text>
        </View>
        <View style={styles.summaryCircle}>
          <Text style={styles.circleValue}>{calories}</Text>
          <Text style={styles.circleLabel}>Calorias restantes</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{spent}</Text>
          <Text style={styles.summaryLabel}>Calorias gastas</Text>
        </View>
      </View>
      <View style={styles.macrosContainer}>
        <View style={styles.macroBox}>
          <Text style={styles.macroText}>Carboidratos</Text>
          <Text style={styles.macroValue}>0 / 199 g</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroText}>Proteínas</Text>
          <Text style={styles.macroValue}>0 / 80 g</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroText}>Gorduras</Text>
          <Text style={styles.macroValue}>0 / 53 g</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: '#E6F2E6',
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 15,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryBox: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#777',
  },
  summaryCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#A8D8A8',
  },
  circleValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  circleLabel: {
    fontSize: 12,
    color: '#777',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  macroBox: {
    alignItems: 'center',
  },
  macroText: {
    fontSize: 12,
    color: '#777',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DaySummary;