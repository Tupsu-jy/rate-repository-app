import { gql } from "@apollo/client";

//fine i'll do this
export const GET_PARAMETRIZED_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $searchKeyword: String
    $orderBy: AllRepositoriesOrderBy
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      orderBy: $orderBy
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          description
          language
          userHasReviewed
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          reviews {
            edges {
              node {
                createdAt
                rating
              }
            }
          }
        }
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_ME_REVIEWS_QUERY = gql`
  query Me {
    me {
      reviews {
        edges {
          node {
            id
            repository {
              fullName
              id
            }
            userId
            repositoryId
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      language
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

//Mutations
export const AUTHENTICATE = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      id
      reviewCount
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
