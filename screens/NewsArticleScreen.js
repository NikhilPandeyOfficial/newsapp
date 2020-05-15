import React from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NewsArticleScreen = (props) => {
  const category = props.navigation.getParam("category")["category"];
  const news = props.navigation.getParam("news")["item"];
  console.log(category, news);
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
          <View style={styles.saveIcon}>
            <MaterialIcons name="bookmark-border" size={28} />
          </View>
        </View>
        <View style={styles.newsContent}>
          <Text style={styles.headLine}>{news["title"]}</Text>
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

NewsArticleScreen.navigationOptions = (navData) => {};

export default NewsArticleScreen;
