import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const logoutHandler = () => {
    logout();
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Workouts
            </Link>
          </div>
          {user ? (
            <div>
              <span className="text-cyan-200 from-orange-500 pr-3">{user.name}</span>
              <button
                onClick={logoutHandler}
                className="text-gray-100 border-cyan-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium"
              >
                Sign up
              </Link>

            </div>
          )

          }



        </div>
      </div>
    </nav>
  );
};

export default Navbar;