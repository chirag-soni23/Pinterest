import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/Loading";

function App() {
  const { loading, isAuth } = UserData();
  return (
    <>
      {loading ? <Loading /> :
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Home /> : <Login />}
            />
            <Route
              path="/login"
              element={isAuth ? <Home /> : <Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
          </Routes>
        </BrowserRouter>}
    </>

  );
}

export default App;
