import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.header__text}>Weather App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#85C1E9",
    alignItems: "center",
    justifyContent: "center",
  },
  header__text: {
    color: "white",
    fontSize: 35,
    marginTop: 30,
    fontWeight: "bold",
  },
});

export default Header;
