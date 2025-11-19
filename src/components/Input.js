import { View, TextInput, StyleSheet } from "react-native";
import colors from "../config/Colors";

export default function Input({ placeholder, secureTextEntry, onChangeText }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    backgroundColor: colors.text,
    padding: 15,
    borderRadius: 8,
    color: "white",
    marginVertical: 10,
  },
});
