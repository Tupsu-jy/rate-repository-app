import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { BETTER_GET_REPOSITORIES } from "../graphql/queries";
import Constants from "expo-constants";

const client = new ApolloClient({
  link: new HttpLink({ uri: Constants.manifest.extra.apolloUri }),
  cache: new InMemoryCache(),
});

export const useRepositories = async (variables) => {
  try {
    const { data, error, loading, fetchMore } = await client.watchQuery({
      query: BETTER_GET_REPOSITORIES,
      variables,
    });

    if (error) {
      return { error };
    }

    const handleFetchMore = async () => {
      const canFetchMore = !loading && data && data.repositories.edges.length;

      if (!canFetchMore) {
        return;
      }

      await fetchMore({
        variables: {
          after:
            data.repositories.edges[data.repositories.edges.length - 1].node.id,
          ...variables,
        },
      });
    };

    const repositoryNodes = data
      ? data.repositories.edges.map((edge) => edge.node)
      : [];

    return {
      repositoryNodes,
      fetchMore: handleFetchMore,
      loading,
    };
  } catch (error) {
    return { error: error.message };
  }
};
