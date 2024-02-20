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
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [isSunny, setIsSunny] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [waterClarity, setWaterClarity] = useState("Stained");
  const [isHighPressure, setIsHighPressure] = useState(false);

  const handleFormSubmit = () => {
    console.log({
      species,
      location,
      temperature,
      date,
      hour,
      isSunny,
      isRaining,
      waterClarity,
      biometricPressure,
    });
  };

  const handleDateChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    let formattedText = "";
    if (sanitizedText.length > 2) {
      formattedText += sanitizedText.substring(0, 2) + "/";
      if (sanitizedText.length > 4) {
        formattedText += sanitizedText.substring(2, 4) + "/";
        if (sanitizedText.length > 6) {
          formattedText += sanitizedText.substring(4, 8);
        } else {
          formattedText += sanitizedText.substring(4);
        }
      } else {
        formattedText += sanitizedText.substring(2);
      }
    } else {
      formattedText = sanitizedText;
    }
    setDate(formattedText);
  };
  const handleHourChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    const hourValue = parseInt(sanitizedText);
    if (sanitizedText === "" || (hourValue >= 1 && hourValue <= 24)) {
      setHour(sanitizedText);
    }
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
        onChangeText={(text) => {
          const sanitizedText = text.replace(/[^0-9]/g, "").slice(0, 2);
          setTemperature(sanitizedText);
        }}
        keyboardType="numeric"
        onBlur={() => {
          if (temperature) {
            setTemperature(`${temperature}°C`);
          }
        }}
        onFocus={() => {
          setTemperature(temperature.replace(" °C", ""));
        }}
        maxLength={2}
        style={styles.input}
        placeholderTextColor="#8db5a4"
      />
      <View style={styles.dateTimeContainer}>
        <TextInput
          placeholder="DD/MM/YYYY"
          value={date}
          onChangeText={handleDateChange}
          style={[styles.input, styles.dateInput]}
          placeholderTextColor="#8db5a4"
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          placeholder="Time (24h)"
          value={hour}
          onChangeText={handleHourChange}
          keyboardType="numeric"
          maxLength={2}
          style={[styles.input, styles.timeInput]}
          placeholderTextColor="#8db5a4"
        />
      </View>
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
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInput: {
    flex: 1,
    marginRight: 5,
  },
  timeInput: {
    flex: 1,
    marginLeft: 5,
  },
});

export default App;
