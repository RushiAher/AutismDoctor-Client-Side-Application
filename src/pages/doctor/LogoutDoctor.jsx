import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../App";
const LogoutDoctor = () => {
  const { state, dispatch } = useContext(UserContex);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.status === 200) {
          throw new Error(res.error);
        }
        dispatch({ type: "USER_LOGGEDIN", payload: false });
        dispatch({ type: "PATIENT", payload: true });
        dispatch({ type: "DOCTOR", payload: false });
        localStorage.clear();
        return navigate("/signin", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <div>
      <h1>logout page</h1>
    </div>
  );
};

export default LogoutDoctor;
