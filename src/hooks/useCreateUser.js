import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER } from "../graphql/queries";

export const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_NEW_USER);

  const createUser = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    return data;
  };

  return [createUser, result];
};
