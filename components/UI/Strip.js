import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";

const Strip = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {props.title}
        </Text>
        <Text style={styles.date}>Friday 24, 2020</Text>
      </View>
      <Image
        source={{
          uri:
            "https://gumlet.assettype.com/nationalherald%2F2020-04%2Fdfde116a-4fe3-4b33-bf16-5d17ad905df0%2Ftectonic.jpg?rect=11%2C0%2C594%2C312&w=1200&auto=format%2Ccompress&ogImage=true",
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 70,
    margin: 5,
  },
  content: {
    width: "80%",
  },

  title: {
    flex: 1,
    alignSelf: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    // fontSize: 30,
  },

  image: {
    width: 50,
    height: 50,
  },
});

export default Strip;
