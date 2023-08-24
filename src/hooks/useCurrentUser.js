import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";

export const useCurrentUser = () => {
  const { data, error, loading } = useQuery(ME_QUERY);

  const isLoggedIn = Boolean(data && data.me);

  return {
    isLoggedIn,
    user: data ? data.me : null,
    loading,
    error,
  };
};
