import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableNativeFeedback,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import * as newsActions from "../store/actions/news";
import { useDispatch } from "react-redux";

const NewsArticleScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSaved, setSaved] = useState(0);

  const category = props.navigation.getParam("category")["category"];
  const news = props.navigation.getParam("news")["item"];

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred !", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const saveNewsHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (isSaved === 0) {
        await dispatch(newsActions.saveNews(news));
        setSaved(1);
      } else if (isSaved === 1) {
        await dispatch(newsActions.unSaveNews());
        setSaved(0);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  if (!news["content"]) news["content"] = "";

  if (!news["description"]) news["description"] = "";

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Image
          source={{
            uri: news["urlToImage"],
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.strip}>
          <Text style={styles.tagName}> {`#${category}`} </Text>
          <Text style={styles.date}>
            {new Date(news["publishedAt"]).toLocaleString()}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> {news["source"]["name"]} </Text>
            <TouchableNativeFeedback onPress={saveNewsHandler}>
              <View style={styles.saveIcon}>
                <MaterialIcons
                  name={isSaved == 0 ? "bookmark-border" : "bookmark"}
                  size={28}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.newsContent}>
            <Text style={styles.headLine}>{news["title"]}</Text>
            <Text style={styles.news}>
              {news["content"].length > news["description"].length
                ? `${news["content"].substring(0, 200)}...`
                : `${news["description"].substring(0, 200)}...`}
            </Text>
          </View>
          <View style={styles.btnOuterContainer}>
            <View style={styles.btnInnerContainer}>
              <TouchableNativeFeedback
                onPress={() => {
                  props.navigation.navigate("browser", {
                    uri: news.url,
                    source: news.source.name,
                  });
                }}
              >
                <Text style={styles.readText}> Read Full Ariticle...</Text>
              </TouchableNativeFeedback>
              <AntDesign name="right" style={styles.readIcon} color="#037ffc" />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

NewsArticleScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  content: {
    height: "40%",
    backgroundColor: "white",
  },
  container: {
    height: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  strip: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagName: {
    fontSize: 14,
    color: "black",
    fontFamily: "montserrat-bold",
  },
  date: {
    // color: "grey",
    fontFamily: "montserrat-light",

    fontSize: 14,
  },
  titleContainer: {
    // borderWidth: 1,
    paddingTop: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    // borderWidth: 1,
    fontSize: 26,
    fontFamily: "montserrat-bold",
  },
  newsContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headLine: {
    // borderWidth: 1,
    fontSize: 22,
    paddingHorizontal: 5,
    fontFamily: "montserrat-semibold",
    // fontWeight: "bold",
  },
  news: {
    // borderWidth: 1,
    fontSize: 14,
    fontFamily: "opensans-regular",
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: "grey",
  },
  btnInnerContainer: {
    flexDirection: "row",
  },
  btnOuterContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    alignItems: "flex-end",
  },
  readText: {
    color: "#037ffc",
    // fontStyle: "italic",
    fontFamily: "montserrat-lightItalic",
  },
  readIcon: {
    padding: 3,
  },
});

export default NewsArticleScreen;
