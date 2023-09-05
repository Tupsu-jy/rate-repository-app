import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return { repositoryNodes, error, loading };
};

export default useRepositories;
