import { View, StyleSheet, ScrollView } from "react-native";
import AppBarTab from "./AppBarTab";
import theme from "../../theme";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useSignOut } from "../../hooks/useSignOut";
import useMyNavigator from "../../hooks/useMyNavigator";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundTertiary,
  },
});

const AppBar = () => {
  const signOut = useSignOut();
  const { isLoggedIn, user, loading, error } = useCurrentUser();
  const { goToHome, goToNewReview, goToMyReviews, goToSignIn, goToSignUp } =
    useMyNavigator();

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab text="Repositories" onPress={goToHome} />

        {/* Conditional rendering */}
        {isLoggedIn ? (
          <>
            <AppBarTab text="Create a review" onPress={goToNewReview} />
            <AppBarTab text="My reviews" onPress={goToMyReviews} />
            <AppBarTab
              text="Sign out"
              onPress={() => {
                signOut();
                goToHome();
              }}
            />
          </>
        ) : (
          <>
            <AppBarTab text="Sign in" onPress={goToSignIn} />
            <AppBarTab text="Sign up" onPress={goToSignUp} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
