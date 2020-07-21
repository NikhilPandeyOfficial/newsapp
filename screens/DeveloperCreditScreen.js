import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DeveloperCreditScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headText}> Developer Info </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ ...styles.clickableText, color: "black" }}>
            Nikhil Pandey built the News App (v1.0) as a Free app. contact me at{" "}
            <Text style={{ fontFamily: "montserrat-lightItalic" }}>
              nikhilpandey1018@gmail.com
            </Text>{" "}
            for questions & suggestions.
          </Text>
        </View>
        <View style={styles.socialContainer}>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate("browser", {
                uri: "https://www.linkedin.com/in/nikhilpandey/",
                source: "LinkedIn",
              });
            }}
          >
            <MaterialCommunityIcons
              name="linkedin-box"
              size={48}
              style={styles.icon}
              color="#0e76a8"
            />
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate("browser", {
                uri: "https://www.github.com/nikhilpandeyofficial",
                source: "GitHub",
              });
            }}
          >
            <MaterialCommunityIcons
              name="github-circle"
              size={48}
              style={styles.icon}
              color="black"
            />
          </TouchableNativeFeedback>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headText}>Credits</Text>
        </View>
        <View style={styles.infoContainer}>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate("browser", {
                uri: "https://www.freepik.com/free-icon/news-logo_746244.htm",
                source: "freepik",
              });
            }}
          >
            <Text style={styles.clickableText}>App Logo Credit</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate("browser", {
                uri: "https://dribbble.com/cuberto",
                source: "Dribbble",
              });
            }}
          >
            <Text style={styles.clickableText}>Homepage Design Credit</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate("browser", {
                uri: "https://dribbble.com/Wolf_",
                source: "Dribbble",
              });
            }}
          >
            <Text style={styles.clickableText}>Userpage Design Credit</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate("browser", {
                uri: "https://dribbble.com/qu4ku",
                source: "Dribbble",
              });
            }}
          >
            <Text style={styles.clickableText}>Newspage Design Credit</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
      <View style={styles.stripContainer}>
        <MaterialCommunityIcons name="copyright" size={18} color="black" />
        <Text style={styles.stripText}> 2020 All Rights Reserved</Text>
      </View>
    </View>
  );
};

DeveloperCreditScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "App Info.",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  socialContainer: {
    paddingVertical: 5,
    flexDirection: "row",
  },
  container: {
    height: "45%",
    flexDirection: "column",
  },
  icon: {
    paddingBottom: 2,
    paddingHorizontal: 5,
  },
  header: {
    height: "20%",
  },
  headText: {
    fontFamily: "montserrat-semibold",
    fontSize: 30,
  },
  infoContainer: {
    // height: "30%",
  },
  clickableText: {
    fontFamily: "opensans-regular",
    color: "#037ffc",
    fontSize: 16,
    padding: 5,
  },
  info: {
    fontSize: 16,
    fontFamily: "opensans-regular",
    color: "grey",
  },
  stripContainer: {
    // height: "5%",
    flexDirection: "row",
    justifyContent: "center",
  },
  stripText: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
});

export default DeveloperCreditScreen;
