import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Header from "./components/Header";
import { Converter } from "./components/utils";

export default function App() {
  const [text, setText] = useState();
  const [apiData, setApiData] = useState(false);

  const InputEvent = (val) => {
    setText(val);
  };

  useEffect(() => {
    const GetData = async () => {
      try {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=322c9ca1e007fa1cb48e0dd25f0c6e44`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.cod === 200) {
              setApiData(data);
            } else {
              setApiData(false);
            }
          });
      } catch {}
    };
    GetData();
  }, [text]);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Header />
        <View style={styles.app__container}>
          <TextInput
            style={styles.app__input}
            placeholder="Enter City"
            onChangeText={InputEvent}
          />
          <View style={styles.app__main_info}>
            {!apiData ? (
              <Text style={styles.not_found}>
                No Data, try entering country
              </Text>
            ) : (
              <React.Fragment>
                <Text style={styles.con_heading}>{`📍 ${apiData.name}`}</Text>
                <View style={styles.next_sub_view}>
                  <Text style={styles.con_sub}>
                    {apiData.weather[0].description}
                  </Text>
                  <Text style={styles.con_sub}>
                    {`${parseInt(Converter(apiData.main.temp))} °C`}
                  </Text>
                </View>
                <View style={styles.next_sub_view}>
                  <Text style={styles.con_sub}>
                    {`Feels Like ${parseInt(
                      Converter(apiData.main.feels_like)
                    )} °C`}
                  </Text>
                </View>
                <View style={styles.add_info}>
                  <Text style={styles.add_text}>
                    {`Max ${parseInt(
                      Converter(apiData.main.temp_max)
                    )} °C | Min ${parseInt(
                      Converter(apiData.main.temp_min)
                    )} °C`}
                  </Text>
                </View>
              </React.Fragment>
            )}
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85C1E9",
    alignItems: "center",
  },
  app__container: {
    marginTop: 30,
  },
  app__input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "coral",
    width: 300,
    height: 50,
    fontSize: 20,
    padding: 10,
    borderRadius: 30,
  },
  app__main_info: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  not_found: {
    color: "white",
    fontSize: 20,
  },
  con_heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  con_sub: {
    color: "white",
    fontSize: 30,
  },
  next_sub_view: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  add_info: {
    marginTop: 10,
  },
  add_text: {
    color: "white",
    fontSize: 20,
  },
});
