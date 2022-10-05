import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Help from "./components/Help";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";

// LocalStorageを使うか Firebaseを使うか
export const isLocalStorage = true;

// basename (package.jsonのhomepageも変更する必要がある)
export const baseUrl = "/lognote/";

function App() {
  // string形式の値がtrueかどうか判定する関数
  function toBoolean(str: string | null) {
    return str?.toLowerCase() === "true";
  }

  // localStorageの設定値をチェック。一度ログインできていると再認証は不要にする。
  let defaultIsAuth = toBoolean(localStorage.getItem("isAuth"));
  if (isLocalStorage) defaultIsAuth = true;

  // 認証済みかどうか
  const [isAuth, setIsAuth] = useState<boolean>(defaultIsAuth);

  return (
    <BrowserRouter basename={baseUrl}>
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
