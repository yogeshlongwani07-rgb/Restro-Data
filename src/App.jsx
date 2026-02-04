import "bootstrap/dist/css/bootstrap.min.css";
import RestroName from "./RestroName";
import "./css/App.css";
import { locationContext } from "./Context";
import { useState } from "react";
import Navbar from "./Navbar";

function App() {
  let [islocation, setIslocation] = useState(false);
  return (
    <>
      <locationContext.Provider value={{ islocation, setIslocation }}>
        <Navbar />
        <RestroName />
      </locationContext.Provider>
    </>
  );
}

export default App;
