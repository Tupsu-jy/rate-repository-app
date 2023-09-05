import RepositoryListContainer from "./RepositoryListContainer";
import { RepositoryFilterProvider, RepositoryDataProvider } from "./contexts";

const WrappedRepositoryListContainer = () => (
  <RepositoryFilterProvider>
    <RepositoryDataProvider>
      <RepositoryListContainer />
    </RepositoryDataProvider>
  </RepositoryFilterProvider>
);

export default WrappedRepositoryListContainer;
