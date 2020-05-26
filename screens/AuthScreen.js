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
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

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
      ...state.inputValidites,
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

const AuthScreen = (props) => {
  const [isSignUp, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: isSignUp
      ? {
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        },
    inputValidites: isSignUp
      ? {
          email: false,
          password: false,
          confirmPassword: false,
        }
      : {
          email: false,
          password: false,
        },
    formIsValid: false,
  });

  const image = {
    uri:
      "https://images.unsplash.com/photo-1551406483-3731d1997540?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  };

  const authHandler = async () => {
    const { email, password, confirmPassword } = formState.inputValues;
    const action = isSignUp ? authActions.signup : authActions.login;
    setError(null);
    console.log("isSignup ", isSignUp, email, password, confirmPassword);
    if (isSignUp && password !== confirmPassword) {
      setError("Password is not matching");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(action(email, password));
      props.navigation.navigate("App");
    } catch (err) {
      setError(err.message);
      console.log("err " + err.message);
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
            onInputChange={inputChangeHandler}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            initialValue=""
          />
          {isSignUp ? (
            <Input
              id="confirmPassword"
              label="Confirm Password"
              keyboardType="default"
              required
              minLength={6}
              onInputChange={inputChangeHandler}
              autoCapitalize="none"
              errorText="Please enter the same password as above"
              initialValue=""
            />
          ) : (
            <View></View>
          )}
          {isSignUp ? (
            <View style={styles.btnContainer}>
              <Button title="Sign Up" onPress={authHandler} />
            </View>
          ) : (
            <View style={styles.btnContainer}>
              <Button title="Log In" onPress={authHandler} />
            </View>
          )}

          {isSignUp ? (
            <View style={styles.SignUpContainer}>
              <Text> Already have an account ? </Text>
              <TouchableNativeFeedback
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              >
                <Text> Log In </Text>
              </TouchableNativeFeedback>
            </View>
          ) : (
            <View style={styles.SignUpContainer}>
              <Text> Don't have an account ? </Text>
              <TouchableNativeFeedback
                onPress={() => {
                  setIsSignup((prevState) => !prevState);

                  // props.navigation.navigate("Signup");
                }}
              >
                <Text> Create One </Text>
              </TouchableNativeFeedback>
            </View>
          )}
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
    // flex: 1,
    maxWidth: 400,
    // maxHeight: 300,
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

export default AuthScreen;
