import { Button } from "@material-tailwind/react";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";

function Login({ setIsAuth }: { setIsAuth: (arg: boolean) => void }) {
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(process.env.REACT_APP_AUTH_UID);
      if (result.user.uid === process.env.REACT_APP_AUTH_UID) {
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
      }
      navigate("/");
      console.log(result);
    });
  };

  return (
    <main className="bg-gray-300">
      <div className="bg-white max-w-sm m-auto p-4 min-h-screen">
        <p className="my-4">ログインします</p>
        <Button onClick={loginWithGoogle} className="">
          Googleでログイン
        </Button>
      </div>
    </main>
  );
}

export default Login;
