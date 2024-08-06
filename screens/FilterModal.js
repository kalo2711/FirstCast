import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { flex_style } from '../global/global-styles';

const FilterModal = ({ visible, onClose, applyFilters, conditions }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    waterCondition: [],
    weatherCondition: [],
    timeCondition: [],
    fishingStructure: [],
    depth: [],
  });

  const toggleSelection = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const renderCheckboxes = (category, options) => {
    return options.map((option, index) => (
      <CheckBox
        key={index}
        title={option}
        checked={selectedFilters[category].includes(option)}
        onPress={() => toggleSelection(category, option)}
      />
    ));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <ScrollView
        style={styles.modalView}
        contentContainerStyle={styles.contentContainer}
      >
        {Object.entries(conditions).filter(([key]) => key !== 'fishSpecies').map(([key, values]) => (
          <View key={key} style={styles.filterSection}>
            <Text style={styles.sectionTitle}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
            <View style={styles.checkboxContainer}>
              {renderCheckboxes(key, values)}
            </View>
          </View>
        ))}
        <View style={[flex_style.flex, flex_style.column, flex_style.width100]}>
          <TouchableOpacity style={styles.button} onPress={() => applyFilters(selectedFilters)}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '90%'
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 18
  },
  filterSection: {
    width: '50%',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default FilterModal;
