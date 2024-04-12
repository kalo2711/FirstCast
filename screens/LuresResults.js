import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LuresResults({ route }) {
  const { address, phoneNumber } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        You live on {address} and we can contact you at {phoneNumber}.
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
