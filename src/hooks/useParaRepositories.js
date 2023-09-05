import { useQuery } from "@apollo/client";
import { GET_PARAMETRIZED_REPOSITORIES } from "../graphql/queries";

export const useParaRepositories = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(
    GET_PARAMETRIZED_REPOSITORIES,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
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
    error,
  };
};
