import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import {
  btn_style,
  flex_style,
  text_style,
  padding_styles,
  margin_styles,
} from "../global/global-styles";

const ConditionsResults = ({ route }) => {
  const { lureOptionsId } = route.params;
  const [conditions, setConditions] = useState({
    temperature: "",
    date: "",
    time: "",
    lighting: "",
    precipitation: "",
    waterClarity: "",
    barometricPressure: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchConditionsForLure();
  }, []);

  const fetchConditionsForLure = async () => {
    const response = await fetch(
      `environment.host + "/api/conditions-for-lure?lureOptionsId=" + lureOptionsId`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      setConditions({
        temperature: data.temperature,
        date: data.date,
        time: data.time,
        lighting: data.lighting,
        precipitation: data.precipitation,
        waterClarity: data.waterClarity,
        barometricPressure: data.barometricPressure,
        imageUrl: data.imageUrl,
      });
    } else {
      console.error("Failed to fetch conditions:", data);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        flex_style.flex,
        flex_style.flexContainer,
        padding_styles.space_md,
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={[text_style.header, text_style.alignCenter]}>
          Optimal Fishing Conditions
        </Text>
        {conditions.imageUrl && (
          <Image source={{ uri: conditions.imageUrl }} style={styles.image} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Temperature: {conditions.temperature}°C
        </Text>
        <Text style={styles.infoText}>Date: {conditions.date}</Text>
        <Text style={styles.infoText}>Time: {conditions.time}</Text>
        <Text style={styles.infoText}>Lighting: {conditions.lighting}</Text>
        <Text style={styles.infoText}>
          Precipitation: {conditions.precipitation}
        </Text>
        <Text style={styles.infoText}>
          Water Clarity: {conditions.waterClarity}
        </Text>
        <Text style={styles.infoText}>
          Barometric Pressure: {conditions.barometricPressure}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  infoContainer: {
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});

export default ConditionsResults;
