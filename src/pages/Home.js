import  { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../config/Colors";
import Card from "../components/Card";
import { navigate } from "../navigation/navigationRef";
import { useAuth } from "../context/AuthContext";
import api from "../api/Api";

const Home = () => {
  const { userInfo } = useAuth();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMenus = async () => {
    try {
      const formData = new FormData();
      formData.append("api", "getmenus");
      formData.append("user_type", userInfo?.user_type || "");

      const res = await api.post("/menus.php", formData);
      if (res.data.status === true) {
        setMenus(res.data.data); 
      } else {
        Alert.alert("Error", res.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to fetch menus.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  const handleCardPress = (item) => {
    if (item.menu_path) {
      navigate(item.menu_path);
    }
  };

  const renderCard = ({ item }) => (
    <Card item={item} onPress={() => handleCardPress(item)} />
  );

  if (loading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>

      <FlatList
        data={menus}
        renderItem={renderCard}
        keyExtractor={(item) => item.menu_code.toString()}
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
    textAlign: "center",
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default Home;
