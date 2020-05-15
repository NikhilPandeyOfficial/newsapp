import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import Strip from "./Strip";

const ScrollableCard = (props) => {
  const newsarray = props.newscontainer[1];
  const category = props.newscontainer[0];
  return (
    <View style={styles.categoryView}>
      <View style={styles.category}>
        <Text numberOfLines={1} style={styles.categoryName}>
          {category}
        </Text>
      </View>

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
    backgroundColor: "white",
    justifyContent: "center",
  },
  categoryName: {
    transform: [{ rotate: "-90deg" }],
    justifyContent: "flex-start",
  },
  categoryList: {
    marginTop: 15,
    paddingTop: 5,
    paddingLeft: 5,
    marginLeft: 15,
  },
});

export default ScrollableCard;
