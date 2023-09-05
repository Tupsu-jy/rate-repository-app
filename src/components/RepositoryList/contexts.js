import React, { useState, useContext } from "react";
import { useParaRepositories } from "../../hooks/useParaRepositories";
import { ORDER_BY } from "../../utils/orderByOptions";
// 1st Context: For filtering details
export const RepositoryFilterContext = React.createContext();

export function RepositoryFilterProvider({ children }) {
  const [orderBy, _setOrderBy] = useState(ORDER_BY.LATEST);
  const [searchKeyword, setSearchKeyword] = useState("");

  const setOrderBy = (value) => {
    if (Object.values(ORDER_BY).includes(value)) {
      _setOrderBy(value); // Only set the state if the value is valid
    } else {
      console.warn(`Invalid value for orderBy: ${value}`);
    }
  };

  let orderDirection;
  let orderByValue;

  switch (orderBy) {
    case ORDER_BY.LATEST:
      orderDirection = "DESC";
      orderByValue = "CREATED_AT";
      break;
    case ORDER_BY.TOP_RATED:
      orderDirection = "DESC";
      orderByValue = "RATING_AVERAGE";
      break;
    case ORDER_BY.LOWEST_RATED:
      orderDirection = "ASC";
      orderByValue = "RATING_AVERAGE";
      break;
    default:
      orderDirection = "DESC";
      orderByValue = "CREATED_AT";
  }

  return (
    <RepositoryFilterContext.Provider
      value={{
        orderDirection,
        searchKeyword,
        orderByValue,
        orderBy,
        setOrderBy,
        setSearchKeyword,
      }}
    >
      {children}
    </RepositoryFilterContext.Provider>
  );
}

// 2nd Context: For fetched data
export const RepositoryDataContext = React.createContext();

export function RepositoryDataProvider({ children }) {
  const { orderDirection, searchKeyword, orderByValue } = useContext(
    RepositoryFilterContext
  );

  const { repositoryNodes, error, loading, fetchMore } = useParaRepositories({
    orderDirection: orderDirection,
    searchKeyword: searchKeyword,
    orderBy: orderByValue,
    first: 3,
  });

  return (
    <RepositoryDataContext.Provider
      value={{ repositoryNodes, error, loading, fetchMore }}
    >
      {children}
    </RepositoryDataContext.Provider>
  );
}
