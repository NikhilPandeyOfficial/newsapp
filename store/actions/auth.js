import { AsyncStorage } from "react-native";

import keys from "../../config/keys";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

const authFunction = async (url, email, password) => {
  const response = await fetch(`${url}` + `${keys.FIREBASE_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  });
  return response;
};

const afterResHandler = async (response, dispatch) => {
  const resData = await response.json();
  dispatch(
    authenticate(
      resData.localId,
      resData.idToken,
      parseInt(resData.expiresIn) * 1000
    )
  );

  const expirationTime = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  );
  await saveDataToStorage(resData.idToken, resData.localId, expirationTime);
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await authFunction(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
      email,
      password
    );

    if (!response.ok) {
      const errData = await response.json();
      const errMessage = errData.error.message;
      let message = "something went wrong !";
      if (errMessage === "EMAIL_EXISTS") {
        message = "This email already exists";
      }
      throw new Error(message);
    }

    await afterResHandler(response, dispatch);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await authFunction(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
      email,
      password
    );

    if (!response.ok) {
      const errorResData = await response.json();

      const errorId = errorResData.error.message;
      let message = "something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid";
      }
      throw new Error(message);
    }

    await afterResHandler(response, dispatch);
  };
};

// export const logout = () => {
//   console.log("called");
//   clearLogoutTimer();
//   // timer = 0;
//   AsyncStorage.removeItem("userData");
//   return { type: LOGOUT };
// };

// const clearLogoutTimer = () => {
//   if (timer) {
//     // clearTimeout is built-in js method to clear the timer
//     console.log(timer);
//     clearTimeout(timer);

//     console.log(timer);
//   }
// };

// const setLogoutTime = (expirationTime) => {
//   return (dispatch) => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const logout = () => {
  clearLogoutTimer();

  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = async () => {
  if (timer) {
    // clearTimeout is built-in js method to clear the timer
    console.log("clearLogoutTimer befor " + timer);

    await clearTimeout(timer);
    console.log("clearLogoutTimer befor " + timer);
  }
};

// auto logout feature
const setLogoutTimer = (expirationTime) => {
  console.log("from setLogoutTimer");
  return (dispatch) => {
    console.log("from setLogoutTimer before " + timer);

    timer = setTimeout(() => {
      // for dispatch logout() we're taking advantage of
      // 'redux-thunk' way of return => dispatch ....
      dispatch(logout());
    }, expirationTime);
    console.log("from setLogoutTimer after " + timer);
  };
};
