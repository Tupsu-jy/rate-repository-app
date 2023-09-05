import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import RepositoryListHeader from "./RepositoryListHeader";
import Text from "../TextComponents/Text";
import theme from "../../theme";
import { useRepositories } from "../../hooks/useBetterRepositories";
import { ORDER_BY } from "../../utils/orderByOptions";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const getLatestReviewDate = (reviews) => {
  if (reviews.length === 0) {
    return "1970-01-01T00:00:00Z"; // Return Unix epoch time if reviews is empty
  }

  const latestReview = reviews.reduce((latest, review) =>
    new Date(review.createdAt) > new Date(latest.createdAt) ? review : latest
  );
  return latestReview.createdAt;
};

//Miksi mä hakisin ne uudestaan joka kerta kun voi vaan sortata ne mitä on jo haettu?
const getSortedRepositories = (repos, orderBy) => {
  const sortedRepos = [...repos];
  switch (orderBy) {
    case ORDER_BY.LATEST:
      return sortedRepos.sort(
        (a, b) =>
          getLatestReviewDate(b.reviews.edges) -
          getLatestReviewDate(a.reviews.edges)
      );
    case ORDER_BY.TOP_RATED:
      return sortedRepos.sort((a, b) => b.ratingAverage - a.ratingAverage);
    case ORDER_BY.LOWEST_RATED:
      return sortedRepos.sort((a, b) => a.ratingAverage - b.ratingAverage);
    default:
      return repos;
  }
};

const RepositoryList = () => {
  //const { repositoryNodes, error, loading } = useRepositories();
  const [orderBy, setOrderBy] = useState(ORDER_BY.LATEST);
  const [searchWord, setSearchWord] = useState("");

  let orderDirection;
  let orderByValue;

  switch (orderBy) {
    case ORDER_BY.LATEST:
      orderDirection = "DESC";
      orderByValue = "CREATED_AT";
      break;
    case ORDER_BY.TOP_RATED:
      orderDirection = "DESC";
      orderByValue = "RATING_AVERAGE";
      break;
    case ORDER_BY.LOWEST_RATED:
      orderDirection = "ASC";
      orderByValue = "RATING_AVERAGE";
      break;
    default:
      orderDirection = "DESC";
      orderByValue = "CREATED_AT";
  }

  const { repositoryNodes, error, loading } = useRepositories({
    orderDirection: orderDirection,
    searchKeyword: searchWord,
    orderBy: orderByValue,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  //const sortedRepositoryNodes = getSortedRepositories(repositoryNodes, orderBy);

  return (
    <FlatList
      testID="repository-list"
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader
          selectedValue={orderBy}
          onValueChange={(value) => setOrderBy(value)}
          onSearch={(value) => setSearchWord(value)}
          searchValue={searchWord}
        />
      }
    />
  );
};

export default RepositoryList;
