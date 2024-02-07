import "./App.css";
import "./responsive.css";
import FailFetchMessage from "./Components/FailFetchMessage/FailFetchMessage";
import HomepageMainContent from "./Components/HomepageMainContent/HomepageMainContent";
import LoadingMessage from "./Components/LoadingMessage/LoadingMessage";
import NavBar from "./Components/NavBar/NavBar";
import UniversalFooter from "./Components/UniversalFooter/UniversalFooter";
import { useMainContentContext } from "./Hooks/useMainContentContext";

function App() {
  const { isLoading, successfulInitFetch, displayedParks, isError429 } =
    useMainContentContext();

  document.title = "U.S. National Parks";

  document.body.style.backgroundImage = "none";

  return (
    <>
      {/* HomepageMainContent = SearchTools + AllParksCards OR ErrorOnInitialFetch w/ 'failed to retrieve data' & reloadbtn*/}
      <NavBar notOnHomepage={false} notOnQuizPage={true} />
      {isLoading && !displayedParks.length && <LoadingMessage />}
      {!isLoading && successfulInitFetch && <HomepageMainContent />}
      {!successfulInitFetch && !isLoading && <FailFetchMessage isError429={isError429} />}
      {!isLoading && successfulInitFetch && <UniversalFooter />}
    </>
  );
}

export default App;
