import { useQuery } from "@apollo/client";
import { GET_ME_REVIEWS_QUERY } from "../graphql/queries";

export const useCurrentUserReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_ME_REVIEWS_QUERY);

  // Extract reviews from data.me.reviews.edges and get the node for each review
  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return {
    reviews,
    loading,
    error,
    refetch,
  };
};
