import React, { useCallback, useState, useEffect } from "react";
import { AppLoading } from "expo";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import keys from "../config/keys";
import Strip from "./../components/UI/Strip";
import Story from "./../components/UI/Story";

const SearchScreen = (props) => {
  const [newsArr, setNewsArr] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, onChangeText] = useState("");

  const searchNews = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${value}&apiKey=${keys.NEWS_API_KEY}`
      );
      const resdata = await response.json();
      setNewsArr(resdata.articles);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    // setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search News"
            blurOnSubmit={true}
            onChangeText={(text) => onChangeText(text)}
            onSubmitEditing={() => searchNews()}
            value={value}
          />
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="black" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.customtext}>An error occurred !</Text>
        <Button title="Try again" onPress={loadRestaurants} />
      </View>
    );
  }

  if (value.length <= 0) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search News"
            blurOnSubmit={true}
            onChangeText={(text) => onChangeText(text)}
            onSubmitEditing={() => searchNews()}
            value={value}
          />
        </View>
        <View style={styles.centered}>
          <AntDesign name="search1" color="grey" size={80} />
          <Text style={styles.customtext}>
            Start searching by typing keywords......
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search News"
          blurOnSubmit={true}
          onChangeText={(text) => onChangeText(text)}
          onSubmitEditing={() => searchNews()}
          value={value}
        />
      </View>
      {newsArr.length <= 0 ? (
        <View style={styles.centered}>
          <Text style={styles.customtext}>
            No results found.... Search with some other keyword !
          </Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => searchNews()}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {newsArr.map((news) => (
            <Story
              news={news}
              onUnSave={() => {}}
              onSelect={() =>
                props.navigation.navigate("News", {
                  category: { category: `${value}` },
                  news: {
                    item: news,
                  },
                })
              }
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = (navData) => {
  return {
    // headerTitle: "none",
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  searchBar: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
    height: 36,
    justifyContent: "center",
    marginVertical: 10,
  },
  input: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
  },
  customtext: {
    fontFamily: "montserrat-regular",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default SearchScreen;
