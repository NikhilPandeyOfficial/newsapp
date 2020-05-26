import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import * as newsActions from "../store/actions/news";
import CustomHeaderButton from "./../components/UI/HeaderButton";
import Story from "./../components/UI/Story";

const SavedScreen = (props) => {
  const savedNewses = useSelector((state) => state.newses.savedNews);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const loadSavedNews = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(newsActions.fetchSavedNews());
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.screen}
    >
      <View style={styles.container}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default SavedScreen;
