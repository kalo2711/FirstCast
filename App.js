import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  ScrollView,
} from "react-native";

const App = () => {
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [isSunny, setIsSunny] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [waterClarity, setWaterClarity] = useState("Stained");
  const [isHighPressure, setIsHighPressure] = useState(false);

  const handleFormSubmit = () => {
    console.log({
      species,
      location,
      temperature,
      dateTime,
      isSunny,
      isRaining,
      waterClarity,
      biometricPressure,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>How are you fishing?</Text>
      <TextInput
        placeholder="Species"
        value={species}
        onChangeText={setSpecies}
        style={styles.input}
        placeholderTextColor="#8db5a4"
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        placeholderTextColor="#8db5a4"
      />
      <TextInput
        placeholder="Temperature (°C)"
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#8db5a4"
      />
      <TextInput
        placeholder="Date + Time"
        value={dateTime}
        onChangeText={setDateTime}
        style={styles.input}
        placeholderTextColor="#8db5a4"
      />
      <Text style={styles.toggleLabel}>Weather & Biometric Pressure</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Sun</Text>
        <Switch
          value={isSunny}
          onValueChange={setIsSunny}
          trackColor={{ false: "#767577", true: "#36FFB0" }}
          thumbColor={isSunny ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text style={styles.switchText}>Cloudy</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Dry</Text>
        <Switch
          value={isRaining}
          onValueChange={setIsRaining}
          trackColor={{ false: "#767577", true: "#36FFB0" }}
          thumbColor={isRaining ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text style={styles.switchText}>Raining</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Low</Text>
        <Switch
          value={isHighPressure}
          onValueChange={setIsHighPressure}
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#36FFB0" }}
          thumbColor={isHighPressure ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text style={styles.switchText}>High</Text>
      </View>
      <Text style={styles.pickerLabel}>Water Clarity</Text>
      <Picker
        selectedValue={waterClarity}
        style={styles.picker}
        itemStyle={{ color: "#FFFFFF" }}
        onValueChange={(itemValue) => setWaterClarity(itemValue)}
      >
        <Picker.Item label="Murky" value="Murky" />
        <Picker.Item label="Stained" value="Stained" />
        <Picker.Item label="Clear" value="Clear" />
      </Picker>
      <View style={styles.button}>
        <Button title="Cast Away!" onPress={handleFormSubmit} color="#36FFB0" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13305F", //Color Blue
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  heading: {
    fontSize: 30,
    color: "#36FFB0", //Color Green
    marginBottom: 30,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF", //Color White
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: "#FFFFFF",
  },
  toggleLabel: {
    color: "#36FFB0",
    marginTop: 10,
    marginLeft: 0,
    fontSize: 17,
  },
  switchContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  switchText: {
    color: "#FFFFFF",
    marginRight: 10,
    marginLeft: 10,
  },
  pickerLabel: {
    color: "#36FFB0",
    marginTop: 20,
    marginLeft: 0,
    marginBottom: 0,
    fontSize: 17,
  },
  picker: {
    marginTop: -20,
  },
  button: {
    marginTop: -25,
  },
});

export default App;
