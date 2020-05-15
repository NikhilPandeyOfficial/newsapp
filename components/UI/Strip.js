import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const Strip = (props) => {
  // const news = props.navigation.getParam("news");
  const { title, urlToImage, publishedAt } = props.news;
  // console.log(props.onSelect);
  let date = new Date(`${publishedAt}`);
  let TouchCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchCmp = TouchableNativeFeedback;
  }

  return (
    <TouchCmp onPress={props.onSelect} useForeground>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.date}>{date.toLocaleString()}</Text>
        </View>
        <Image
          source={{
            uri: urlToImage,
          }}
          style={styles.image}
        />
      </View>
    </TouchCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 70,
    paddingVertical: 5,
  },
  content: {
    width: "80%",
  },

  title: {
    flex: 1,
    alignSelf: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    // fontSize: 30,
  },

  image: {
    width: 50,
    height: 50,
  },
});

export default Strip;
