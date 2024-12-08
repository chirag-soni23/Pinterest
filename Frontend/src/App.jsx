import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/Loading";
import Navbar from "./components/Navbar";
import Pinpage from "./pages/PinPage";
import Create from "./pages/Create";
import Account from "./pages/Account";

function App() {
  const { loading, isAuth, user } = UserData();
  return (
    <>
      {loading ? <Loading /> : <BrowserRouter>
        {isAuth && <Navbar user={user} />}
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />}
          />
          <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />}
          />
          <Route path="/create" element={isAuth ? <Create /> : <Login />}
          />
          <Route path="/login" element={isAuth ? <Home /> : <Login />}
          />
          <Route path="/register" element={<Register />}
          />
          <Route path="/pin/:id" element={isAuth ? <Pinpage user={user} /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>}
    </>

  );
}

export default App;
