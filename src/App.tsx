import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Help from "./components/Help";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";

export const isLocalStorage = true;

function App() {
  function toBoolean(str: string | null) {
    return str?.toLowerCase() === "true";
  }

  let defaultIsAuth = toBoolean(localStorage.getItem("isAuth"));
  if (isLocalStorage) defaultIsAuth = true;
  const [isAuth, setIsAuth] = useState<boolean>(defaultIsAuth);

  return (
    <BrowserRouter basename="/lognote/">
      <Header isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route
          path="/logout"
          element={<Logout setIsAuth={setIsAuth} />}
        ></Route>
        <Route path="/help" element={<Help />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
