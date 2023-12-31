import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import Constants from "expo-constants";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewReview from "./NewReview";
import MyReviews from "./MyReviews";
import SingleRepository from "./SingleRepository";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundPrimary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/SingleRepositoryView/:id"
          element={<SingleRepository />}
        />
        <Route path="/NewReviewView" element={<NewReview />} />
        <Route path="/MyReviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
