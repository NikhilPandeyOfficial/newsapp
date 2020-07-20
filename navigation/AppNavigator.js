import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HomeScreen from "./../screens/HomeScreen";
import SavedScreen from "./../screens/SavedScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import NewsArticleScreen from "./../screens/NewsArticleScreen";
import SearchScreen from "./../screens/SearchScreen";
import AuthScreen from "./../screens/AuthScreen";
import UserScreen from "./../screens/UserScreen";
import CategoryNewsScreen from "./../screens/CategoryNewsScreen";
import StartupScreen from "./../screens/StartupScreen";
import BrowserScreen from "./../screens/BrowserScreen";

const defaultStackNavOptions = {
  // headerStyle: {
  //   height: 110,
  // },
  // headerBackTitleVisible: false,
  headerTitleStyle: {
    // fontSize: 38,
    fontFamily: "montserrat-bold",
  },
};

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    CategoryNews: CategoryNewsScreen,
    News: NewsArticleScreen,
    browser: BrowserScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    News: NewsArticleScreen,
    browser: BrowserScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const SavedNavigator = createStackNavigator(
  {
    Saved: SavedScreen,
    News: NewsArticleScreen,
    browser: BrowserScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const UserNavigator = createStackNavigator(
  {
    User: UserScreen,
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
        tabBarIcon: ({ focused, tintColor }) => {
          // return <Entypo name="home" size={30} />;
          return (
            <AntDesign
              name="home"
              focused={focused}
              color={tintColor}
              size={25}
            />
          );
        },
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <AntDesign
              name="search1"
              focused={focused}
              color={tintColor}
              size={25}
            />
          );

          // return <Ionicons name="ios-search" focused={focused} tintColor={{ tintColor }} size={25} />;
        },
      },
    },
    Saved: {
      screen: SavedNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <AntDesign
              name="book"
              focused={focused}
              color={tintColor}
              size={25}
            />
          );

          // return (
          //   <MaterialIcons name="bookmark-border" focused={focused} tintColor={{ tintColor }} size={25} />
          // );
        },
      },
    },
    User: {
      screen: UserNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <AntDesign
              name="user"
              focused={focused}
              color={tintColor}
              size={25}
            />
          );

          // return <FontAwesome name="user-circle" focused={focused} tintColor={{ tintColor }} size={25} />;
        },
      },
    },
  },
  {
    animationEnabled: true,
    tabBarPosition: "top",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#000000",
      // activeBackgroundColor: "#9678f0",
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
  Startup: StartupScreen,
  Auth: AuthNavigator,
  App: TabNavigator,
});

export default createAppContainer(MainNavigator);
// export default createAppContainer(AuthNavigator);
