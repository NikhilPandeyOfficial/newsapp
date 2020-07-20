import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const BrowserScreen = (props) => {
  const uri = props.navigation.getParam("uri");
  return <WebView source={{ uri: uri }} />;
};

BrowserScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("source"),
  };
};

export default BrowserScreen;
