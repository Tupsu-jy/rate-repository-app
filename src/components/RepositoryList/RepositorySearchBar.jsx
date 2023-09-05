import React, { useEffect, useContext } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import { RepositoryFilterContext } from "./contexts";

const RepositorySearchBar = () => {
  const { searchKeyword, setSearchKeyword } = useContext(
    RepositoryFilterContext
  );
  const [debouncedValue] = useDebounce(searchKeyword, 500);

  useEffect(() => {
    setSearchKeyword(debouncedValue);
  }, [debouncedValue]);

  return (
    <Searchbar
      placeholder="Search"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
  );
};

export default RepositorySearchBar;
