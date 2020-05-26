import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
      // const { content, description, publishedAt, title, urlToImage } = news;
      if (isSaved === 0) {
        await dispatch(newsActions.saveNews(news));
        setSaved(1);
      } else if (isSaved === 1) {
        await dispatch(newsActions.unSaveNews());
        setSaved(0);
      }
    } catch (err) {
      console.log("error during saving " + err);
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  return (
    <ScrollView scrollEnabled={true} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.content}>
        <Image
          source={{
            uri: news["urlToImage"],
          }}
          style={styles.image}
        />
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.tagName}> {`#${category}`} </Text>
            <Text style={styles.date}>
              {new Date(news["publishedAt"]).toLocaleString()}
            </Text>
          </View>
        </View>
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
          <Text style={styles.headLine}>{news["title"].split("-")[0]}</Text>
          <Text style={styles.news}>{news["content"]}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    backgroundColor: "white",
  },
  container: {
    // flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "40%",
  },
  top: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagName: {
    fontSize: 12,
    color: "black",
  },
  date: {
    color: "grey",
    fontSize: 12,
  },
  titleContainer: {
    // flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 26,
  },
  newsContent: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  headLine: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
  },
  news: {
    fontSize: 14,
    flex: 1,
    paddingVertical: 12,
    color: "grey",
  },
});

export default NewsArticleScreen;
