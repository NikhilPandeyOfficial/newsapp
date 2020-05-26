import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HomeScreen from "./../screens/HomeScreen";
import SavedScreen from "./../screens/SavedScreen";
import TopicNewsScreen from "./../screens/TopicNewsScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import NewsArticleScreen from "./../screens/NewsArticleScreen";
import SearchScreen from "./../screens/SearchScreen";
import LoginScreen from "./../screens/LoginScreen";
import AuthScreen from "./../screens/AuthScreen";

const defaultStackNavOptions = {
  // headerStyle: {
  //   height: 110,
  // },
  // headerBackTitleVisible: false,
  // headerTitleStyle: {
  //   fontSize: 38,
  // },
};

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    News: NewsArticleScreen,
    TopicNews: TopicNewsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const SavedNavigator = createStackNavigator(
  {
    Saved: SavedScreen,
    News: NewsArticleScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          // return <Entypo name="home" size={30} />;
          return (
            <MaterialCommunityIcons name="newspaper" color="black" size={25} />
          );
        },
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-search" color="black" size={25} />;
        },
      },
    },
    Saved: {
      screen: SavedNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <MaterialIcons name="bookmark-border" color="black" size={25} />
          );
        },
      },
    },
    User: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <FontAwesome name="user-circle" color="black" size={25} />;
        },
      },
    },
  },
  {
    animationEnabled: true,
    tabBarPosition: "top",
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 50,
        backgroundColor: "white",
      },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    // Login: LoginScreen,
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  App: TabNavigator,
});

export default createAppContainer(MainNavigator);
// export default createAppContainer(AuthNavigator);
