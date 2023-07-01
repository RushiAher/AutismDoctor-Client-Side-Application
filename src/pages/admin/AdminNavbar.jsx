import React,{useContext} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {UserContex} from "../../App"
import { useEffect } from "react";
const AdminNavbar = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContex)
  const logoutAdmin = () => {
    dispatch({ type: "ADMIN_LOGIN", payload: false });
    navigate("/", { replace: true });
  }
  useEffect(() => {
    if (!state.adminloggedin) {
      navigate("/", { replace: true });
    }
  }, [])
  return (
    <>
      <nav class="navbar navbar-expand-lg visible navbar-light bg-light ">
        <a class="navbar-brand" href="#">
          <img
            src={"images/logo.png"}
            style={{ height: "3rem", width: "4rem" }}
            alt="logo"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav visible mr-auto">
            <li class="nav-item active hidden">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard <span class="sr-only">(current)</span>
              </NavLink>
            </li>
            <li class="nav-item active">
              <NavLink className="nav-link" to="/dashboard/manageblogs">
                Blogs
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/dashboard/managedoc">
                Doctors
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/dashboard/managemessages">
                Messages
              </NavLink>
            </li>
          </ul>

          <button
            class="btn btn-outline-secondary visible my-2 my-sm-0"
            onClick={logoutAdmin}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
