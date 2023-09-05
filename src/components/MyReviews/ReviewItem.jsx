import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import ReviewItemButton from "./ReviewItemButton"; // Make sure you've imported the button component.
import theme from "../../theme";
import { useCurrentUserReviews } from "../../hooks/useCurrentUserReviews";
//they should all be export default or maybe in same file. But whatever its just school work. Its ugly tho
import useMyNavigator from "../../hooks/useMyNavigator";
import { useDeleteReview } from "../../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.backgroundSecondary,
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "flex-start", // Corrected value
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
  },
  ratingContainer: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
  },
  userInfoContainer: {
    flexDirection: "column",
    flex: 1,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    marginTop: 3,
    fontFamily: theme.fonts.main,
  },
  reviewText: {
    marginTop: 5,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

const ReviewItem = ({ review }) => {
  const navigate = useMyNavigator();
  const [deleteReview] = useDeleteReview();
  const { refetch } = useCurrentUserReviews();

  const viewRepo = (repoId) => {
    navigate.goToRepository(repoId);
  };

  const deleteReviewOnPressFunction = (reviewId) => {
    Alert.alert(
      "Delete Review", // Alert Title
      "Are you sure you want to delete this review?", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"), // Logging the cancellation for now
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteReview({ reviewId }); // Actual deletion happens here
            refetch();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>{review.repository.fullName}</Text>
          <Text style={styles.date}>
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <ReviewItemButton
          backgroundColor="blue"
          buttonText="View Repository"
          onPressFunction={() => viewRepo(review.repository.id)}
        />
        <ReviewItemButton
          backgroundColor="red"
          buttonText="Delete Repository"
          onPressFunction={() => deleteReviewOnPressFunction(review.id)}
        />
      </View>
    </View>
  );
};

export default ReviewItem;
