import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
} from "react-native";
import { btn_style, flex_style, form_style, margin_styles, padding_styles, text_style } from './global/global-styles'
import { primary_color, green_color, width } from './global/global-constants'
import * as Font from 'expo-font';

const App = () => {
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [isSunny, setIsSunny] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [waterClarity, setWaterClarity] = useState("Murky");
  const [isHighPressure, setIsHighPressure] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
        'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-medium': require('./assets/fonts/OpenSans-Medium.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        // Add more font variations if needed
      });
    };
    
    const loadAsyncData = async () => {
      await loadFonts();
      setFontLoaded(true);
    };
    
    loadAsyncData();
  })

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
    <ScrollView contentContainerStyle={[flex_style.flex, flex_style.flexContainer, padding_styles.safetyTop, padding_styles.space_md, {flexWrap: 'wrap'}]}>
      <Text style={[text_style.sm, text_style.primaryColor, margin_styles.bottom_md, text_style.bold, text_style.alignCenter]}>How are you fishing?</Text>
      <TextInput
        placeholder="Species"
        value={species}
        onChangeText={setSpecies}
        style={[form_style.formControl, text_style.sm, margin_styles.bottom_md]}
        placeholderTextColor={primary_color}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={[form_style.formControl, text_style.sm, margin_styles.bottom_md]}
        placeholderTextColor={primary_color}
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
        style={[form_style.formControl, text_style.sm, margin_styles.bottom_md]}
        placeholderTextColor={primary_color}
      />
      <View style={[flex_style.flex, flex_style.spaceBetween, flex_style.one, margin_styles.bottom_md]}>
        <TextInput
          placeholder="DD/MM/YYYY"
          value={date}
          onChangeText={handleDateChange}
          style={[form_style.formControl, styles.dateInput, , text_style.sm]}
          placeholderTextColor={primary_color}
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          placeholder="Time (24h)"
          value={hour}
          onChangeText={handleHourChange}
          keyboardType="numeric"
          maxLength={2}
          style={[form_style.formControl, text_style.sm, styles.timeInput]}
          placeholderTextColor={primary_color}
        />
      </View>
      <Text style={[text_style.primaryColor, text_style.sm, text_style.bold, flex_style.width100, text_style.alignCenter]}>Weather</Text>
      <View style={[styles.switchContainer, margin_styles.vertical_space_md, flex_style.width100]}>
        <Text style={[text_style.sm, text_style.primaryColor, flex_style.one, text_style.alignCenter]}>Sun</Text>
        <Switch
          value={isSunny}
          onValueChange={setIsSunny}
          trackColor={{ false: primary_color, true: green_color }}
          thumbColor={isSunny ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text style={[text_style.sm, text_style.primaryColor, flex_style.one, text_style.alignCenter]}>Cloudy</Text>
      </View>

      <View style={[styles.switchContainer, margin_styles.vertical_space_md, flex_style.width100]}>
        <Text style={[text_style.sm, text_style.primaryColor, flex_style.one, text_style.alignCenter]}>Dry</Text>
        <Switch
          value={isRaining}
          onValueChange={setIsRaining}
          trackColor={{ false: primary_color, true: green_color }}
          thumbColor={isRaining ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text style={[text_style.sm, text_style.primaryColor, flex_style.one, text_style.alignCenter]}>Raining</Text>
      </View>


      <Text style={[text_style.primaryColor, text_style.sm, text_style.bold, flex_style.width100, text_style.alignCenter ]}>Biometric Pressure</Text>

      <View style={[styles.switchContainer, margin_styles.vertical_space_md, flex_style.width100]}>
        <Text style={[text_style.sm, text_style.primaryColor, flex_style.one, text_style.alignCenter]}>Low</Text>
        <Switch
          value={isHighPressure}
          onValueChange={setIsHighPressure}
          style={styles.switch}
          trackColor={{ false: primary_color, true: green_color }}
          thumbColor={isHighPressure ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text style={[text_style.sm, text_style.primaryColor, flex_style.one, text_style.alignCenter]}>High</Text>
      </View>

      <View style={[flex_style.flex, flex_style.column, flex_style.width100, margin_styles.bottom_lg]}>
      <Text style={[text_style.sm, text_style.bold, text_style.primaryColor, text_style.alignCenter]}>Water Clarity</Text>
      <Picker
          selectedValue={waterClarity}
          style={[{ height: 50}, Platform.OS === 'ios'? {height: 200, zIndex: 0}: null]}
          onValueChange={(itemValue, itemIndex) =>setWaterClarity(itemValue)}>
            <Picker.Item label="Murky" value="Murky" />
          <Picker.Item label="Stained" value="Stained" />
          <Picker.Item label="Clear" value="Clear" />
        </Picker>
      </View>



      <TouchableOpacity onPress={handleFormSubmit} style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth]}>
        <Text style={[text_style.fontColorWhite, text_style.bold]}>Cast Away!</Text>
      </TouchableOpacity>

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
    color: green_color, //Color Green
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
    color: green_color,
    marginTop: 10,
    marginLeft: 0,
    fontSize: 17,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    color: "#FFFFFF",
    marginRight: 10,
    marginLeft: 10,
  },
  pickerLabel: {
    color: green_color,
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
