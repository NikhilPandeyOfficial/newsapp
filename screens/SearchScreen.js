import React from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "./../components/UI/HeaderButton";
import Strip from "./../components/UI/Strip";

const SearchScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is Search Screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SearchScreen;
