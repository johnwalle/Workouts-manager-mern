import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const useRegister = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async (name, email, password, setName, setEmail, setPassword) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users", {
                name,
                email,
                password,
            });

            const data = response.data;

            if (response.status === 200) {
                // set the fields empty
                setName("");
                setEmail("");
                setPassword("");
                setError(null);

                // Save the user to local storage
                localStorage.setItem("user", JSON.stringify(data));

                // Update the auth context
                dispatch({ type: "LOGIN", payload: data });
            } else {
                setError("User already registerd.");
            }
        } catch (error) {
            setError("An error occurred while registering. Please try again later.");
        }
    };

    return { register, error };
};

export default useRegister;