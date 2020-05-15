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
        <Text>An error occurred !</Text>
        <Button title="Try again" onPress={loadNewses} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
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

HomeScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="menu" onPress={() => {}} />
      </HeaderButtons>
    ),
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
    // padding: 10,
    // backgroundColor: "white",
  },
  container: {
    // borderWidth: 1,
    // height: 400,
  },
});

export default HomeScreen;
