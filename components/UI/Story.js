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
          <View style={styles.headContainer}>
            <View style={styles.sourceContainer}>
              <Text style={styles.source}> {source["name"]} </Text>
            </View>
            <TouchableNativeFeedback
              style={styles.savedContainer}
              onPress={props.onUnSave}
            >
              <MaterialIcons name="bookmark" size={20} />
            </TouchableNativeFeedback>
          </View>
          <View>
            <Text numberOfLines={2} style={styles.title}>
              {title}
            </Text>
          </View>
          <View style={styles.btnOuterContainer}>
            <View style={styles.btnInnerContainer}>
              <Text style={styles.readText}> Read More ... </Text>
              <AntDesign name="right" style={styles.readIcon} color="#037ffc" />
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    margin: 10,
    // borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    width: "30%",
  },
  textContainer: {
    // marginLeft: 5,
    // borderWidth: 1,
    paddingHorizontal: 5,
    width: "70%",
  },
  image: {
    width: "100%",
    borderRadius: 10,
    height: "100%",
  },
  headContainer: {
    flexDirection: "row",
  },
  sourceContainer: {
    width: "90%",
    // alignItems: "flex-start",
  },
  savedContainer: {
    width: "10%",
  },
  source: {
    // fontWeight: "700",
    fontFamily: "montserrat-bold",
    // paddingLeft: ,
    // borderWidth: 1,
  },
  title: {
    // fontWeight: "700",
    fontFamily: "montserrat-semibold",
    paddingHorizontal: 5,
    // borderWidth: 1,
  },
  btnInnerContainer: {
    flexDirection: "row",
  },
  btnOuterContainer: {
    alignItems: "flex-end",
  },
  readText: {
    color: "#037ffc",
    fontFamily: "montserrat-lightItalic",
    // fontStyle: "italic",
  },
  readIcon: {
    padding: 5,
  },
});

export default Story;
