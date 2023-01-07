import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMEssage";

export default function useAuth() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "You are now registered!";
    let msgType = "success";

    try {
      const data = await api.post("/user/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function login(user) {
    let msgText = "You are now logged in!";
    let msgType = "success";

    try {
      const data = await api.post("/user/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/");
  }

  function logout() {
    const msgText = "You are now logged out!";
    const msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/");

    setFlashMessage(msgText, msgType);
  }

  async function deleteUserAccount() {
    let msgText = "Account deleted!";
    let msgType = "success";

    try {
      await api
        .delete("/user/deleteaccount", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/");
    
    setFlashMessage(msgText, msgType);
  }

  return { authenticated, register, logout, login, deleteUserAccount };
}
