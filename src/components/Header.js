import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from "react-native";
import Colors from "../config/Colors";
import Button from "../components/Button";
import { MaterialIcons } from '@expo/vector-icons';


const Header = ({ navigation, options }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const slideAnim = useRef(new Animated.Value(250)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    // Animate both slide and fade out together
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowSidebar(false);
    });
  };

  useEffect(() => {
    if (showSidebar) {
      // Reset animations when sidebar opens
      slideAnim.setValue(250);
      fadeAnim.setValue(0);
      
      // Animate both slide and fade in together
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [showSidebar]);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{options.title}</Text>

      <TouchableOpacity
        onPress={openSidebar}
        style={styles.menuButton}
      >
          <MaterialIcons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Modal
        visible={showSidebar}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <Animated.View 
            style={[
              styles.modalOverlay, 
              { opacity: fadeAnim }
            ]}
          >
            <TouchableOpacity
              style={styles.overlayTouchable}
              onPress={closeSidebar}
              activeOpacity={1}
            />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.sidebar, 
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <View style={styles.sidebarContent}>
                <View  style={{borderColor:Colors.gray,borderWidth:1,borderRadius:10 ,marginTop:-20,padding:10 }}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitial}>U</Text>
              </View>
              <Text style={styles.name}>User Name</Text> 
               </View> 
              <View style={styles.logoutContainer}>
                <Button
                  title="Logout"
                  onPress={() => {
                    closeSidebar();

                    setTimeout(() => navigation.navigate("Login"), 100);
                  }}
                  buttonStyle={styles.logoutButton}
                  textStyle={styles.logoutText}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: "100%",
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    flex: 1,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: Colors.text,
  },
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 250,
    backgroundColor: Colors.background,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sidebarContent: {
    marginTop: 50,
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  logoutContainer: {
    paddingBottom: 20,
  },
  logoutButton: {
    width: "100%",
    padding: 12,
    marginTop: 0,
  },
  logoutText: {
    fontSize: 16,
  },
});

export default Header;