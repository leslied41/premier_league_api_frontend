import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
function App() {
  const login = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {login && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
      {/* the correct way is to use redirect, when there is token, the page would be 
      redirected to dashboarad page. Otherwise, the page should remain in login page
      {login ? <Redirect to="/dashboard" /> : <Home />}
      */}
    </Router>
  );
}

export default App;
