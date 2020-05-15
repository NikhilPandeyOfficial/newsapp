import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Story = (props) => {
  const TouchCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.version >= 21) {
    TouchCmp = TouchableNativeFeedback;
  }

  return (
    <TouchCmp
      onPress={() => {
        props.onSelect();
      }}
    >
      <View style={{ ...styles.container }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.savedContainer}>
            <Text style={styles.source}> {props.source} </Text>
            <View style={styles.saveIcon}>
              <MaterialIcons name="bookmark" size={20} />
            </View>
          </View>
          <Text style={styles.title}>{props.title}</Text>

          <View style={styles.btnContainer}>
            <Text style={styles.read}> Read More ... </Text>
            <AntDesign name="right" color="#037ffc" size={14} />
          </View>
        </View>
      </View>
    </TouchCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    marginVertical: 15,
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    borderRadius: 10,
    height: "100%",
    borderWidth: 1,
  },
  textContainer: {
    padding: 5,
  },
  savedContainer: {
    flexDirection: "row",
    width: "75%",
  },
  saveIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "700",
    width: "80%",
    fontSize: 16,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    width: "75%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  read: {
    color: "#037ffc",
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default Story;
