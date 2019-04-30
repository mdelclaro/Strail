import { Alert } from "react-native";
import { Navigation } from "react-native-navigation";
import { SET_ACTIVITY } from "./types";
import { retrieveToken, uiStartLoading, uiStopLoading } from "./index";

export const getActivity = id => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(retrieveToken())
      .catch(err => {
        dispatch(uiStopLoading());
        console.log(err);
      })
      .then(token => {
        console.log("Token na activity -> " + token);
        const url = `https://www.strava.com/api/v3/activities/${id}?include_all_efforts=`;
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
          .then(res => res.json())
          .then(parsedRes => {
            console.log(JSON.stringify(parsedRes));
            const activityName = parsedRes.name;
            const polyline = parsedRes.map.polyline;
            dispatch(uiStopLoading());
            dispatch(setActivity(activityName, polyline));
            Navigation.push("stack", {
              component: {
                name: "app.Activity",
                options: {
                  topBar: {
                    visible: true,
                    drawBehind: true,
                    transparent: true,
                    translucent: true,
                    noBorder: true,
                    elevation: 0,
                    background: { color: "transparent" },
                    backButton: {
                      color: "#fc6d07"
                    }
                  }
                }
              }
            });
          })
          .catch(err => {
            dispatch(uiStopLoading());
            Alert.alert(
              "Erro",
              "Atividade não encontrada...",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            console.log(err);
            console.log("fetch error");
          });
      });
  };
};

export const setActivity = (name, polyline) => {
  return {
    type: SET_ACTIVITY,
    payload: { name, polyline }
  };
};
