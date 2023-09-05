import React from "react";
import { FlatList } from "react-native";
import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";
import Text from "../TextComponents/Text";
import ItemSeparator from "../SharedParts/ItemSeperator";
import useRepository from "../../hooks/useRepository";
import { useParams } from "react-router-native";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, error, loading, fetchMoreReviews } = useRepository(id, 3);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = repository?.reviews?.edges?.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => fetchMoreReviews()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
