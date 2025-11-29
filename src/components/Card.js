import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Colors from "../config/Colors";

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CONTAINER_PADDING = 16;
const cardWidth = (width - (CONTAINER_PADDING * 2) - (CARD_MARGIN * 2)) / 2;

const Card = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.card,]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.menu_icon}</Text>
      </View>
      <Text style={styles.name}>{item.menu_name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    width: cardWidth,
    height: 120, 
    borderRadius: 12,
    padding: 10,
    margin: CARD_MARGIN,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 8,
  },
  icon: {
    fontSize: 28, 
  },
  name: {
    color: Colors.text, 
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Card;