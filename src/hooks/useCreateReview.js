import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    ownerUsername,
    repositoryName,
    rating,
    review,
  }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName: ownerUsername,
          repositoryName,
          rating: Number(rating),
          text: review,
        },
      },
    });

    return data;
  };

  return [createReview, result];
};
