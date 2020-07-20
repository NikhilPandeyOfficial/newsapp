import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ReduxThunk from "redux-thunk";
// import logger from "redux-logger";

import newsReducer from "./store/reducers/news";
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";

const fetchFonts = async () => {
  return await Font.loadAsync({
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-lightItalic": require("./assets/fonts/Montserrat-LightItalic.ttf"),

    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    "opensans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};

const rootReducer = combineReducers({
  newses: newsReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
