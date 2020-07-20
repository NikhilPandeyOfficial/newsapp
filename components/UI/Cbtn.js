import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Cbtn = (props) => {
  return (
    <TouchableNativeFeedback useForeground={true} onPress={props.onPress}>
      <View style={styles.outer}>
        <View style={styles.cbtn}>
          <View style={styles.left}>
            {props.icon ? (
              <MaterialCommunityIcons
                name={props.icon}
                style={styles.icon}
                color="black"
              />
            ) : (
              <View></View>
            )}
          </View>
          <View style={styles.right}>
            <Text style={{ ...styles.text, ...props.style }}>{props.text}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={styles.icon}
              color="black"
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  outer: {
    borderRadius: 20,
  },
  cbtn: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    // alignItems: "flex-end",
    // height: 40,
    // borderWidth: 1,
  },
  left: {
    flexDirection: "row",
    width: "10%",
  },
  right: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  text: {
    width: "85%",
    // borderWidth: 1,
    paddingVertical: 5,
    // justifyContent: "center",
    paddingLeft: 5,
    fontSize: 16,
    fontFamily: "montserrat-medium",
  },
  icon: {
    // borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 18,
  },
});

export default Cbtn;
