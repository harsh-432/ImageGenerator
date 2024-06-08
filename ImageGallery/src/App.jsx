import { useContext } from "react";
import Gallery from "./Components/Gallery";
import Navbar from "./Components/Navbar";
import Popup from "./Components/Popup";
import ResultTitle from "./Components/ResultTitle";
import SearchBox from "./Components/SearchBox";
import { stateContext } from "./Context/StateContextProvider";

function App() {
  const { query, show, scroll } = useContext(stateContext);

  return (
    <>
      <div
        className={`h-screen    ${
          scroll ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <Navbar />
        {show && <Popup />}
        {query ? <ResultTitle /> : <SearchBox />}
        <Gallery />
      </div>
    </>
  );
}

export default App;
