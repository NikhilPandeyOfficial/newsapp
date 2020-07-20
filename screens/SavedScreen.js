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

const SavedScreen = (props) => {
  const savedNewses = useSelector((state) => state.newses.savedNews);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const loadSavedNews = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(newsActions.fetchSavedNews());
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  const unSaveHandler = async (key) => {
    try {
      await dispatch(newsActions.unSaveNews(key));
    } catch (e) {
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadSavedNews().then(() => setIsLoading(false));
  }, [dispatch, loadSavedNews]);

  if (!savedNewses) {
    return (
      <View style={styles.centered}>
        <Text style={styles.customtext}>You haven't saved anything yet...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred !</Text>
        <Button title="Try again" onPress={loadSavedNews} />
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
          <RefreshControl refreshing={isRefreshing} onRefresh={loadSavedNews} />
        }
      >
        {Object.keys(savedNewses).map((element) => (
          <Story
            key={element}
            news={savedNewses[element]}
            onUnSave={() => unSaveHandler(element)}
            onSelect={() =>
              props.navigation.navigate("News", {
                category: { category: "savedNews" },
                news: {
                  item: savedNewses[element],
                },
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

SavedScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Saved",
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
  customtext: {
    fontFamily: "montserrat-regular",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default SavedScreen;
