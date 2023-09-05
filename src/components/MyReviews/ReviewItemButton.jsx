import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: theme.fonts.main,
  },
});

const ReviewItemButton = ({ backgroundColor, buttonText, onPressFunction }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPressFunction}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ReviewItemButton;
