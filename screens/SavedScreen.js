import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./../components/UI/HeaderButton";
import Story from "./../components/UI/Story";

const SavedScreen = (props) => {
  // console.log(props.navigation);
  return (
    <View style={styles.screen}>
      <Story
        onSelect={() => props.navigation.navigate("News")}
        title="Severe outbreak of Mers in south korea"
        source="The Economic Times"
      />
    </View>
  );
};

SavedScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="menu" onPress={() => {}} />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="User" iconName="user" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SavedScreen;
