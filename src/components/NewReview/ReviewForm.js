import React from "react";
import { useCreateReview } from "../../hooks/useCreateReview";
import useMyNavigator from "../../hooks/useMyNavigator";
import ReviewFormContainer from "./ReviewFormContainer";

const ReviewForm = () => {
  const [createReviewMutation] = useCreateReview();
  const { goToRepository } = useMyNavigator();

  const onSubmit = async (values) => {
    try {
      const { createReview } = await createReviewMutation(values);
      if (createReview && createReview.repositoryId) {
        goToRepository(createReview.repositoryId);
      } else {
        console.log("No repositoryId found in response");
      }
    } catch (e) {
      console.log("Error creating review:", e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
