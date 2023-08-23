import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { GET_REPOSITORIES } from '../graphql/queries';
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;
  // Get the nodes from the edges array
  const repositoryNodes = data
    ? data.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
