import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "./../components/UI/HeaderButton";
import Strip from "./../components/UI/Strip";
import * as newsActions from "../store/actions/news";
import ScrollableCard from "./../components/UI/ScrollableCard";

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const allNewsObj = useSelector((state) => state.newses.allNews);
  const dispatch = useDispatch();

  const loadNewses = useCallback(async () => {
    setError(null);
    try {
      await dispatch(newsActions.fetchNews());
      // setError("testing");
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadNewses().then(() => setIsLoading(false));
  }, [dispatch, loadNewses]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.customtext}>An error occurred !</Text>
        <Button title="Try again" onPress={loadNewses} />
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
      style={styles.screen}
    >
      <View style={styles.container}>
        {Object.entries(allNewsObj).map((entry) => (
          <ScrollableCard
            navigation={props.navigation}
            key={entry[0]}
            newscontainer={entry}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  screen: {
    paddingVertical: 10,
    // flex: 1,
    // padding: 10,
    backgroundColor: "white",
  },
  container: {
    // borderWidth: 1,
    // height: 400,
  },
  customtext: {
    fontFamily: "montserrat-regular",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
