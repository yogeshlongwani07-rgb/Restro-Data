import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import RestroName from "./Restro/RestroName";
import "./css/App.css";

// Navbar and locationContext.Provider are now handled by Layout.jsx
// App just renders the home-page content
function App() {
  return <RestroName />;
}

export default App;
