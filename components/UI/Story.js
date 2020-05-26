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

import * as newsActions from "../../store/actions/news";
import { useDispatch } from "react-redux";

const Story = (props) => {
  const { title, urlToImage, source } = props.news;
  // console.log("inside the story ", props.news);
  // return (
  //   <View>
  //     <Text> what's the problem</Text>
  //   </View>
  // );
  return (
    <TouchableNativeFeedback
      onPress={() => {
        props.onSelect();
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: urlToImage,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.savedContainer}>
            <Text style={styles.source}> {source["name"]} </Text>
            <TouchableNativeFeedback onPress={props.onUnSave}>
              <View style={styles.saveIcon}>
                <MaterialIcons name="bookmark" size={20} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <Text style={styles.title}>{title.split("-")[0]}</Text>

          <View style={styles.btnContainer}>
            <Text style={styles.read}> Read More ... </Text>
            <AntDesign name="right" color="#037ffc" size={14} />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    marginVertical: 5,
    marginHorizontal: 15,
    width: "90%",
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
    width: "80%",
  },
  savedContainer: {
    flexDirection: "row",
    width: "100%",
  },
  saveIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "700",
    width: "100%",
    fontSize: 14,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  read: {
    color: "#037ffc",
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default Story;
