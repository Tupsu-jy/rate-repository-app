import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigate } from "react-router-native";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundTertiary,
  },
});

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab text="Repositories" onPress={() => navigate("/")} />
        <AppBarTab text="Sign in" onPress={() => navigate("/signin")} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
