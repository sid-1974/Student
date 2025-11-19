import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../config/Colors";

export default function Button({ title, onPress, buttonStyle, textStyle }) { 
  return (
    <TouchableOpacity 
      style={[styles.btn, buttonStyle]}  
      onPress={onPress}
    >
      <Text style={[styles.txt, textStyle]}>{title}</Text> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  txt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});