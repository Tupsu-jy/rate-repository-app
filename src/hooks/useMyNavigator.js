import { useNavigate } from "react-router-native";

const useMyNavigator = () => {
  const navigate = useNavigate();

  return {
    goToHome: () => navigate("/"),
    goToRepository: (repoId) => navigate(`/SingleRepositoryView/${repoId}`),
    goToNewReview: () => navigate("/NewReviewView"),
    goToSignIn: () => navigate("/signin"),
    goToSignUp: () => navigate("/signup"),
    goToMyReviews: () => navigate("/MyReviews"),
  };
};

export default useMyNavigator;
