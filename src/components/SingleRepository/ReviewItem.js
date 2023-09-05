import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.backgroundSecondary,
    flexDirection: "row",
    alignItems: "flex-start",
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
