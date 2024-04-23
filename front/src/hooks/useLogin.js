import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password, setEmail, setPassword) => {

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Clear the input fields
        setEmail('');
        setPassword('');
        setError(null);

        // Save the user to local storage
        localStorage.setItem("user", JSON.stringify(data));

        // Update the auth context
        dispatch({ type: "LOGIN", payload: data });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      }
    }
  };

  return { login, error };
};

export default useLogin;