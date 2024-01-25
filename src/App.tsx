import "./App.css";
import { FailFetchMessage } from "./Components/FailFetchMessage/FailFetchMessage";
import { HomepageMainContent } from "./Components/HomepageMainContent/HomepageMainContent";
import { LoadingMessage } from "./Components/LoadingMessage/LoadingMessage";
import { NavBar } from "./Components/NavBar/NavBar";
import { UniversalFooter } from "./Components/UniversalFooter/UniversalFooter";
import { useMainContentContext } from "./Hooks/useMainContentContext";

function App() {
  const { isLoading, successfulInitFetch, displayedParks, errorCode } =
    useMainContentContext();

  document.title = "U.S. National Parks";

  return (
    <>
      {/* HomepageMainContent = SearchTools + AllParksCards OR ErrorOnInitialFetch w/ 'failed to retrieve data' & reloadbtn*/}
      <NavBar notOnHomepage={false} />
      {isLoading && !displayedParks.length && <LoadingMessage />}
      {!isLoading && successfulInitFetch && <HomepageMainContent />}
      {!successfulInitFetch && !isLoading && <FailFetchMessage errorCode={errorCode} />}
      {!isLoading && successfulInitFetch && <UniversalFooter />}
    </>
  );
}

export default App;
