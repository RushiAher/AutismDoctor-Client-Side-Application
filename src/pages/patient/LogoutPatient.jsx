import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../App";
const LogoutPatient = () => {
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
        dispatch({ type: "RESULT", payload: false });
        dispatch({ type: "TEST_HISTORY", payload: false });
        dispatch({ type: "TEST_ID", payload: null });
        dispatch({ type: "TEST_RESULT", payload: null });
        localStorage.clear();
        return navigate("/signin", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <>
      <h1>this is logout page</h1>
    </>
  );
};

export default LogoutPatient;
