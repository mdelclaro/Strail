import { AsyncStorage } from "react-native";
import { AUTH_SET_TOKEN } from "./types";

import { storeAthlete, retrieveAthlete } from "./index";
import { clientId, clientSecret, authUrl } from "../../config";

import startApp from "../../App";

export const getTokens = code => {
  return dispatch => {
    const grantType = "authorization_code";
    const url = `${authUrl}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}&code=${code}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Falha ao buscar os tokens!");
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then(parsedRes => {
        const expiresAt = parsedRes.expires_at * 1000;
        const accessToken = parsedRes.access_token;
        const refreshToken = parsedRes.refresh_token;
        const name = parsedRes.athlete.firstname;
        const sex = parsedRes.athlete.sex;
        dispatch(storeAthlete(name, sex));
        dispatch(storeTokens(expiresAt, accessToken, refreshToken));
        startApp();
      });
  };
};

export const retrieveToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const stateExpiryDate = getState().auth.expiryDate;
      if (!token || new Date(stateExpiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem("app:auth:token")
          .catch(err => {
            console.log(err);
            reject();
          })
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("app:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(Number(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken, expiryDate));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(() => {
        return AsyncStorage.getItem("app:auth:refreshToken")
          .then(refreshToken => {
            const grantType = "refresh_token";
            const url = `${authUrl}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}&refresh_token=${refreshToken}`;
            return fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              }
            });
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.access_token) {
              console.log("refresh token");
              dispatch(
                storeTokens(
                  parsedRes.expires_at,
                  parsedRes.access_token,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.access_token;
            }
            dispatch(authClearStorage());
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

export const storeTokens = (expiresAt, accessToken, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresAt;
    dispatch(authSetToken(accessToken, expiryDate));
    AsyncStorage.setItem("app:auth:token", accessToken);
    AsyncStorage.setItem("app:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("app:auth:refreshToken", refreshToken);
  };
};

export const authSetToken = (accessToken, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    payload: { accessToken, expiryDate }
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("app:auth:token");
    AsyncStorage.removeItem("app:auth:expiryDate");
    AsyncStorage.removeItem("app:auth:refreshToken");
  };
};

export const authAutoAuth = () => {
  return dispatch => {
    dispatch(retrieveToken())
      .then(() => {
        dispatch(retrieveAthlete());
        startApp();
      })
      .catch(err => {
        console.log(err);
      });
  };
};
