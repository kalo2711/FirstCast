import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConditionsResults({ route }) {
  const { name, age } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        You are {name} and you are {age} years old.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
