import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { userState } = UserAuth();

  const [user, setUser] = userState;
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand nav_left" to="/">
          <span>&nbsp;&nbsp;IBM</span>
        </Link>
        <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav ms-auto nav_space">
            <li>
              <Link
                class="nav-item nav-link px-4 nav_item"
                id="navbar-fnt"
                onClick={handleNavCollapse}
                to="/"
              >
                Home
              </Link>
            </li>
            {user &&
              (user.isAdmin ? (
                <li>
                  <Link
                    class="nav-item nav-link px-4 nav_item"
                    id="navbar-fnt"
                    onClick={handleNavCollapse}
                    to="/admin-dashboard"
                  >
                    Admin-Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    class="nav-item nav-link px-4 nav_item"
                    id="navbar-fnt"
                    onClick={handleNavCollapse}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                
              ))}

            {user && !user.isAdmin && (
              <li>
                <Link
                  class="nav-item nav-link px-4 nav_item"
                  id="navbar-fnt"
                  onClick={handleNavCollapse}
                  to="/user-profile"
                >
                  Profile
                </Link>
              </li>
            )}
            <li>
              {user?.username ? (
                <Link
                  class="nav-item nav-link px-4 nav_item"
                  id="navbar-fnt"
                  onClick={handleNavCollapse}
                  to="/sign-in"
                >
                  <span
                    onClick={() => {
                      setUser(null);
                      sessionStorage.clear();
                      signOut(auth);
                    }}
                  >
                    Logout
                  </span>
                </Link>
              ) : (
                <Link
                  class="nav-item nav-link px-4  nav_item"
                  id="navbar-fnt"
                  onClick={handleNavCollapse}
                  to="/sign-in"
                >
                  Sign In
                </Link>
              )}
            </li>
            <br />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
