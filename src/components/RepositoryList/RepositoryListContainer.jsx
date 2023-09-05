import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import RepositoryListHeader from "./RepositoryListHeader";
import Text from "../TextComponents/Text";
import theme from "../../theme";
import { RepositoryDataContext } from "./contexts";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return <RepositoryListHeader />;
  };

  render() {
    return (
      <RepositoryDataContext.Consumer>
        {({ repositoryNodes, error, loading, fetchMore }) => {
          if (loading && !repositoryNodes) return <Text>Loading...</Text>;
          if (error) return <Text>Error: {error.message}</Text>;

          return (
            <FlatList
              testID="repository-list"
              data={repositoryNodes}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({ item }) => <RepositoryItem item={item} />}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={this.renderHeader}
              onEndReached={() => fetchMore()}
              onEndReachedThreshold={0.5}
            />
          );
        }}
      </RepositoryDataContext.Consumer>
    );
  }
}

export default RepositoryListContainer;
