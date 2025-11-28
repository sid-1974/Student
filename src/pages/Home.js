import { Text, View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import Button from '../components/Button'; 
import Colors from "../config/Colors";
import Card from "../components/Card";
import { cardData } from "../components/Data";
import { navigate } from "../navigation/navigationRef";

const Home = () => {
  const navigation = useNavigation();
  // console.log("Home component rendered", cardData);
  const handleCardPress = (item) => {
    navigate(item.route);
    // console.log(`Pressed: ${item.name}`);
  };
  const renderCard = ({ item }) => (
    <Card item={item} onPress={() => handleCardPress(item)} />
  );

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Welcome to Dashboard</Text>
      <FlatList
        data={cardData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
    listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  }
});

export default Home;