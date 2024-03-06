import { StatusBar } from "expo-status-bar";
import { loadTranslations } from "./i18n/localization.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AddressAutofill from "./AddressAutofill";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import {
  btn_style,
  flex_style,
  form_style,
  margin_styles,
  padding_styles,
  text_style,
} from "./global/global-styles";
import {
  primary_color,
  green_color,
  width,
  black,
} from "./global/global-constants";
import * as Font from "expo-font";

const App = () => {
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("");
  const [isSunny, setIsSunny] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [waterClarity, setWaterClarity] = useState("Murky");
  const [isHighPressure, setIsHighPressure] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
        "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-medium": require("./assets/fonts/OpenSans-Medium.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        // Add more font variations if needed
      });
    };

    const loadAsyncData = async () => {
      await loadFonts();
      setFontLoaded(true);
    };

    loadAsyncData();
  });

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

  //Date + Time picker functions
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  };
  //Return values

  return (
    <ScrollView
      contentContainerStyle={[
        flex_style.flex,
        flex_style.flexContainer,
        padding_styles.safetyTop,
        padding_styles.space_md,
        { flexWrap: "wrap" },
      ]}
    >
      <Text
        style={[
          text_style.sm,
          text_style.primaryColor,
          margin_styles.bottom_md,
          text_style.bold,
          text_style.alignCenter,
        ]}
      >
        {loadTranslations("howAreYouFishing")}
      </Text>
      <TextInput
        placeholder={loadTranslations("species")}
        value={species}
        onChangeText={setSpecies}
        style={[form_style.formControl, text_style.sm, margin_styles.bottom_md]}
        placeholderTextColor={black}
      />
      <AddressAutofill
        addToListOfLocations={setLocation}
        placeholder={loadTranslations("location")}
        route={{
          params: {
            location: { lat: "45.46498616653648", long: "-73.79416660341609" },
            radius: "100",
          },
        }}
      />
      <TextInput
        placeholder={loadTranslations("temperature")}
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
        placeholderTextColor={black}
      />
      <View
        style={[
          flex_style.flex,
          flex_style.spaceBetween,
          flex_style.one,
          margin_styles.bottom_md,
        ]}
      >
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={true}
          onChange={onChange}
        />
      </View>
      <Text
        style={[
          text_style.primaryColor,
          text_style.sm,
          text_style.bold,
          flex_style.width100,
          text_style.alignCenter,
        ]}
      >
        {loadTranslations("weather")}
      </Text>
      <View
        style={[
          styles.switchContainer,
          margin_styles.vertical_space_md,
          flex_style.width100,
        ]}
      >
        <Text
          style={[
            text_style.sm,
            text_style.black,
            flex_style.one,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("sun")}
        </Text>
        <Switch
          value={isSunny}
          onValueChange={setIsSunny}
          trackColor={{ false: primary_color, true: green_color }}
          thumbColor={isSunny ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text
          style={[
            text_style.sm,
            text_style.black,
            flex_style.one,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("cloudy")}
        </Text>
      </View>

      <View
        style={[
          styles.switchContainer,
          margin_styles.vertical_space_md,
          flex_style.width100,
        ]}
      >
        <Text
          style={[
            text_style.sm,
            text_style.black,
            flex_style.one,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("dry")}
        </Text>
        <Switch
          value={isRaining}
          onValueChange={setIsRaining}
          trackColor={{ false: primary_color, true: green_color }}
          thumbColor={isRaining ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text
          style={[
            text_style.sm,
            text_style.black,
            flex_style.one,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("raining")}
        </Text>
      </View>

      <Text
        style={[
          text_style.primaryColor,
          text_style.sm,
          text_style.bold,
          flex_style.width100,
          text_style.alignCenter,
        ]}
      >
        {loadTranslations("bioPressure")}
      </Text>

      <View
        style={[
          styles.switchContainer,
          margin_styles.vertical_space_md,
          flex_style.width100,
        ]}
      >
        <Text
          style={[
            text_style.sm,
            text_style.black,
            flex_style.one,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("low")}
        </Text>
        <Switch
          value={isHighPressure}
          onValueChange={setIsHighPressure}
          style={styles.switch}
          trackColor={{ false: primary_color, true: green_color }}
          thumbColor={isHighPressure ? "#f4f3f4" : "#f4f3f4"}
        />
        <Text
          style={[
            text_style.sm,
            text_style.black,
            flex_style.one,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("high")}
        </Text>
      </View>

      <View
        style={[
          flex_style.flex,
          flex_style.column,
          flex_style.width100,
          margin_styles.bottom_lg,
        ]}
      >
        <Text
          style={[
            text_style.sm,
            text_style.bold,
            text_style.primaryColor,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("waterClarity")}
        </Text>
        <Picker
          selectedValue={waterClarity}
          style={[
            { height: 50 },
            Platform.OS === "ios" ? { height: 200, zIndex: 0 } : null,
          ]}
          onValueChange={(itemValue, itemIndex) => setWaterClarity(itemValue)}
        >
          <Picker.Item label={loadTranslations("murky")} value="Murky" />
          <Picker.Item label={loadTranslations("stained")} value="Stained" />
          <Picker.Item label={loadTranslations("clear")} value="Clear" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleFormSubmit}
        style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth]}
      >
        <Text
          style={[
            text_style.fontColorWhite,
            text_style.bold,
            flex_style.width100,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("castAway")}
        </Text>
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
