import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faRightFromBracket,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { isLocalStorage } from "../App";

function Header({ isAuth }: { isAuth: boolean }) {
  // LocalStorage Mode
  if (isLocalStorage) {
    return (
      <header className="bg-gray-800 p-3 flex justify-center">
        <p className="text-white font-bold text-center">logNote</p>
        <nav className="mx-4">
          <Link className="text-white mx-2" to="/">
            <FontAwesomeIcon className="mx-2" icon={faHouse} />
            <span className="text-xs">Home</span>
          </Link>
          <Link className="text-white mx-2" to="/help">
            <FontAwesomeIcon className="mx-2" icon={faCircleQuestion} />
            <span className="text-xs">About</span>
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-gray-800 p-3 flex justify-center">
      <p className="text-white font-bold text-center">LogNote</p>
      <nav className="mx-4">
        <Link className="text-white mx-2" to="/">
          <FontAwesomeIcon className="mx-2" icon={faHouse} />
          <span className="text-xs">Home</span>
        </Link>
        {!isAuth ? (
          <Link className="text-white mx-2" to="/login">
            <FontAwesomeIcon className="mx-2" icon={faRightToBracket} />
            <span className="text-xs">Login</span>
          </Link>
        ) : (
          <Link className="text-white mx-2" to="/logout">
            <FontAwesomeIcon className="mx-2" icon={faRightFromBracket} />
            <span className="text-xs">Logout</span>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
