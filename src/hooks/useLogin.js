import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/user/login",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        //save the user to localstorage
        localStorage.setItem("user", JSON.stringify(res.data));

        // update the auth context
        dispatch({ type: "LOGIN", payload: res.data });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.err);
    }
  };
  return { login, loading, error };
};
