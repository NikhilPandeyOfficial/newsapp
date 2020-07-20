import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import Strip from "./Strip";

const ScrollableCard = (props) => {
  const newsarray = props.newscontainer[1];
  const category = props.newscontainer[0];
  return (
    <View style={styles.categoryView}>
      <TouchableNativeFeedback
        onPress={() => {
          props.navigation.navigate("CategoryNews", {
            category: category,
            newsarray: newsarray,
          });
        }}
      >
        <View style={styles.category}>
          <Text numberOfLines={1} style={styles.categoryName}>
            {category}
          </Text>
        </View>
      </TouchableNativeFeedback>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={styles.categoryList}
      >
        {newsarray.map((item, key) => (
          <Strip
            key={key}
            onSelect={() =>
              props.navigation.navigate("News", {
                news: { item },
                category: { category },
              })
            }
            news={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryView: {
    height: 200,
    flex: 1,
    flexDirection: "row",
  },
  category: {
    width: "20%",
    // height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    // paddingBottom: 50,
    // borderWidth: 1,
  },
  categoryName: {
    transform: [{ rotate: "-90deg" }],
    fontFamily: "montserrat-bold",
    // height: "100%",
    // justifyContent: "flex-end",
    // borderWidth: 1,
  },
  categoryList: {
    marginTop: 15,
    paddingTop: 5,
    paddingLeft: 5,
    marginLeft: 15,
  },
});

export default ScrollableCard;
