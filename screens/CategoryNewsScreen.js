import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import * as newsActions from "../store/actions/news";
import CustomHeaderButton from "./../components/UI/HeaderButton";
import Story from "./../components/UI/Story";

const CategoryNewsScreen = (props) => {
  const [newsarray, setNewsArray] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const loadnews = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      setNewsArray(props.navigation.getParam("newsarray"));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadnews().then(() => setIsLoading(false));
  }, [dispatch, loadnews]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred !</Text>
        <Button title="Try again" onPress={loadnews} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadnews} />
        }
      >
        {Object.keys(newsarray).map((element) => (
          <Story
            key={element}
            news={newsarray[element]}
            onUnSave={() => {}}
            onSelect={() =>
              props.navigation.navigate("News", {
                category: {
                  category: props.navigation.getParam("category"),
                },
                news: {
                  item: newsarray[element],
                },
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

CategoryNewsScreen.navigationOptions = (navData) => {
  const category = navData.navigation.getParam("category");
  return {
    headerTitle: `#${category}`,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default CategoryNewsScreen;
