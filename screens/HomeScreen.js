import React from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "./../components/UI/HeaderButton";
import Strip from "./../components/UI/Strip";

const HomeScreen = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.screen}
    >
      <View style={styles.container}>
        <View style={styles.categoryView}>
          <View style={styles.category}>
            <Text numberOfLines={1} style={styles.categoryName}>
              opStories
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={styles.categoryList}
          >
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
          </ScrollView>
        </View>
        <View style={styles.categoryView}>
          <View style={styles.category}>
            <Text numberOfLines={1} style={styles.categoryName}>
              opStories
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={styles.categoryList}
          >
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
          </ScrollView>
        </View>
        <View style={styles.categoryView}>
          <View style={styles.category}>
            <Text numberOfLines={1} style={styles.categoryName}>
              opStories
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={styles.categoryList}
          >
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south koreajhhh it is coun alchol is den flksj  f jlkj lkj j lksjkj"
              source="The Economic Times"
            />
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
            <Strip
              onSelect={() => props.navigation.navigate("News")}
              title="Severe outbreak of Mers in south korea"
              source="The Economic Times"
            />
          </ScrollView>
        </View>
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
  screen: {
    flex: 1,
    padding: 10,
    // backgroundColor: "white",
  },
  container: {
    // borderWidth: 1,
  },
  categoryView: {
    height: 200,
    flexDirection: "row",
  },
  category: {
    width: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    transform: [{ rotate: "-90deg" }],
  },
  catergoryList: {
    width: "80%",
    paddingHorizontal: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
