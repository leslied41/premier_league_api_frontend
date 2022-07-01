import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
function App() {
  const login = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={!login ? <Navigate replace to="/" /> : <Dashboard />}
        />
      </Routes>
      {/* the correct way is to use redirect, when there is token, the page would be 
      redirected to dashboarad page. Otherwise, the page should remain in login page
      {login ? <Redirect to="/dashboard" /> : <Home />}
      */}
      {/* now for the latest version of react router dom v6, the methond above has been deprecated.
      Current correct way is like this:
      <Route exact path="/"  element={!logged ? <Navigate replace to="/signin" /> : <Dashboard />}/>
      */}
    </Router>
  );
}

export default App;
