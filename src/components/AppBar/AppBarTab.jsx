import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Text from "../TextComponents/Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: theme.colors.textWhite,
    padding: 10,
  },
});

const AppBarTab = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
