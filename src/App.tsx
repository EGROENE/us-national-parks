import "./App.css";
import { FailInitFetchMessage } from "./Components/FailInitFetchMessage/FailInitFetchMessage";
import { HomepageMainContent } from "./Components/HomepageMainContent/HomepageMainContent";
import { LoadingMessage } from "./Components/LoadingMessage/LoadingMessage";
import { NavBar } from "./Components/NavBar/NavBar";
import { useMainContentContext } from "./Hooks/useMainContentContext";

function App() {
  const { isLoading, successfulInitFetch } = useMainContentContext();
  return (
    <>
      {/* HomepageMainContent = SearchTools + AllParksCards OR ErrorOnInitialFetch w/ 'failed to retrieve data' & reloadbtn*/}
      <NavBar />
      {isLoading ? <LoadingMessage /> : <HomepageMainContent />}
      {!successfulInitFetch && !isLoading && <FailInitFetchMessage />}
    </>
  );
}

export default App;
