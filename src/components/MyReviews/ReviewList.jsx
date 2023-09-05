import React from "react";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import Text from "../TextComponents/Text";
import ItemSeparator from "../SharedParts/ItemSeperator";
import { useCurrentUserReviews } from "../../hooks/useCurrentUserReviews";

const ReviewList = () => {
  const { reviews, error, loading } = useCurrentUserReviews();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default ReviewList;
