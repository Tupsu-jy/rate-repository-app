import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigate } from "react-router-native";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useSignOut } from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundTertiary,
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { isLoggedIn, user, loading, error } = useCurrentUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab text="Repositories" onPress={() => navigate("/")} />

        {/* Conditional rendering */}
        {isLoggedIn ? (
          <AppBarTab
            text="Sign out"
            onPress={() => {
              signOut();
              navigate("/");
            }}
          />
        ) : (
          <AppBarTab text="Sign in" onPress={() => navigate("/signin")} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
