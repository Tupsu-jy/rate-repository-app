import React from "react";
import { render } from "@testing-library/react-native";

import RepositoryList from "../../components/RepositoryList";
import useRepositories from "../../hooks/useRepositories";

// Mock the hook
jest.mock("../../hooks/useRepositories", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    repositoryNodes: [],
    error: null,
    loading: false,
  })),
}));

describe("RepositoryList", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<RepositoryList />);
    const listView = getByTestId("repository-list");
    expect(listView).toBeTruthy();
  });

  describe("Loading State", () => {
    it("displays loading state", () => {
      useRepositories.mockReturnValue({
        repositoryNodes: [],
        error: null,
        loading: true,
      });

      const { getByText } = render(<RepositoryList />);
      expect(getByText("Loading...")).toBeDefined();
    });
  });
  describe("Error State", () => {
    it("displays error message", () => {
      useRepositories.mockReturnValue({
        repositoryNodes: [],
        error: { message: "Some error occurred" },
        loading: false,
      });

      const { getByText } = render(<RepositoryList />);
      expect(getByText("Error: Some error occurred")).toBeDefined();
    });
  });

  describe("Displaying Items", () => {
    it("displays repository items", () => {
      const mockData = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      // Mock the return value of useRepositories hook
      useRepositories.mockReturnValue({
        repositoryNodes: mockData.edges.map((edge) => edge.node), // Extract the node values
        error: null,
        loading: false,
      });

      const { getAllByTestId, getByText, getAllByText } = render(
        <RepositoryList />
      );
      const items = getAllByTestId("repository-item");

      // Expect two repository items to be rendered
      expect(items).toHaveLength(2);

      // Expect the details of the first repository to be correctly rendered
      const firstRepo = mockData.edges[0].node;
      expect(getByText(firstRepo.fullName)).toBeTruthy();
      expect(getByText(firstRepo.description)).toBeTruthy();
      expect(getByText(String(firstRepo.ratingAverage))).toBeTruthy();
      const firstRepoReviewCountElements = getAllByText(
        String(firstRepo.reviewCount)
      );
      expect(firstRepoReviewCountElements.length).toBeGreaterThanOrEqual(1);

      // Expect the details of the second repository to be correctly rendered
      const secondRepo = mockData.edges[1].node;
      expect(getByText(secondRepo.fullName)).toBeTruthy();
      expect(getByText(secondRepo.description)).toBeTruthy();
      expect(getByText(String(secondRepo.ratingAverage))).toBeTruthy();
      const secondRepoReviewCountElements = getAllByText(
        String(secondRepo.reviewCount)
      );
      expect(secondRepoReviewCountElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});
