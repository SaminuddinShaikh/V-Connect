import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authActions";

import PageRender from "./customRouter/PageRender";

import Home from "./pages/home";
import Login from "./pages/login";

import Alert from "./components/alert/Alert";
import NavBar from "./components/header/NavBar";
import Register from "./pages/register";
import PrivateRouter from "./customRouter/PrivateRouter";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {auth.token && <NavBar />}
          <Routes>
            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
          {auth.token && (
            <>
              <PrivateRouter exact path="/:page" element={<PageRender />} />
              <PrivateRouter exact path="/:page/:id" element={<PageRender />} />
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
