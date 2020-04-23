import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TopicNewsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text> List of news (of a particular topic) </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TopicNewsScreen;
