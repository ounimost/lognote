import { Button } from "@material-tailwind/react";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Logout({ setIsAuth }: { setIsAuth: (arg: boolean) => void }) {
  const navigate = useNavigate();

  const logout_ = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <main className="bg-gray-300">
      <div className="bg-white max-w-sm m-auto p-4 min-h-screen">
        <p className="my-4">ログアウトします</p>
        <Button onClick={logout_} className="">
          ログアウト
        </Button>
      </div>
    </main>
  );
}

export default Logout;
