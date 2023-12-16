import "./App.css";
import { HomepageMainContent } from "./Components/HomepageMainContent/HomepageMainContent";
import { NavBar } from "./Components/NavBar/NavBar";

// destructure things from useMainContentContext as necessary

// If, when retrieving all parks, !request.ok, don't display HomepageMainContent component, rather comp w/ msg & reload btn

function App() {
  return (
    <>
      <NavBar />
      {/* While data is fetching, display msg & animated icon (while isLoading in state is truthy) */}
      {/* HomepageMainContent = SearchTools + AllParksCards OR ErrorOnInitialFetch w/ 'failed to retrieve data' & reloadbtn*/}
      {/* So, in mainContentContext, have state value isLoading. If !response.ok, display ErrorOnInitialFetch */}
      <HomepageMainContent />
    </>
  );
}

export default App;
