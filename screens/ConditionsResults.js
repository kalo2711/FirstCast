import {React , useState} from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConditionsResults({ route }) {
  const [name, setName] = useState(route?.params?.name);
  const [age, setAge] = useState(route?.params?.age);

  return (
    <View style={styles.container}>
      <Text>
        You are {name ? name :'def'} and you are {age ? age : 'age'} years old.
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
