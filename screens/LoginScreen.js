import React, { useReducer, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Button,
  TouchableNativeFeedback,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import Card from "./../components/UI/Card";
import Input from "./../components/UI/Input";

import * as authActions from "../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidites = {
      ...state.inputValues,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidites) {
      updatedFormIsValid = updatedFormIsValid && updatedValidites[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidites: updatedValidites,
      inputValues: updatedValues,
    };
  }
};

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidites: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  const authHandler = async () => {
    const { email, password } = formState.inputValues;
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.login(email, password));
      props.navigation.navigate("App");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const image = {
    uri:
      "https://images.unsplash.com/photo-1551406483-3731d1997540?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  };
  return (
    <KeyboardAvoidingView
      behaviour="padding"
      keyboardverticalOffset={10}
      style={styles.screen}
    >
      <ImageBackground source={image} style={styles.image}>
        <Card style={styles.authContainer}>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid email address"
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            required
            minLength={6}
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid password"
            initialValue=""
          />
          <View style={styles.btnContainer}>
            <Button title="Log In" onPress={authHandler} />
          </View>

          <View style={styles.SignUpContainer}>
            <Text> Don't have an account ? </Text>
            <TouchableNativeFeedback
              onPress={() => {
                props.navigation.navigate("Signup");
              }}
            >
              <Text> Create One </Text>
            </TouchableNativeFeedback>
          </View>
        </Card>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    opacity: 0.8,
  },
  btnContainer: {
    marginTop: 10,
  },
  SignUpContainer: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
});

export default LoginScreen;
