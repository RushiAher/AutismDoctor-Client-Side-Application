import React, { useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { UserContex } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContex);

  const RenderMenu = () => {
    if (state.patient && localStorage.getItem("userType") !== "doctor") {
      return (
        <>
          <li class="nav-item active">
            <NavLink className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link " to="/doctor">
              Your Doctor
            </NavLink>
          </li>
          {localStorage.getItem("userType") === "patient" ? (
            <>
              <li class="nav-item">
                <NavLink className="nav-link" to="/result">
                  Test Result
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/testhistory">
                  Test History
                </NavLink>
              </li>
            </>
          ) : null}
          <li class="nav-item">
            <NavLink className="nav-link" to="/schemes">
              Schemes
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact Us
            </NavLink>
          </li>
          {state.loggedin ? (
            <>
              <li class="nav-item">
                <NavLink
                  className="nav-link  bg-zinc-100 rounded-lg md:mr-2"
                  to="/logoutpatient"
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li class="nav-item">
                <NavLink
                  className="nav-link  bg-zinc-100 rounded-lg md:mr-2 "
                  to="/signin"
                >
                  Login
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  className="nav-link  bg-zinc-100 rounded-lg "
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </>
      );
    } else if (localStorage.getItem("userType") === "doctor") {
      return (
        <>
          <li class="nav-item active">
            <NavLink className="nav-link" to="/newappointments">
              New Appointments <span className="sr-only">(current)</span>
            </NavLink>
          </li>

          <li class="nav-item ">
            <NavLink className="nav-link " to="/scheduledappointments">
              Scheduled Appointments
            </NavLink>
          </li>
          <li class="nav-item ">
            <NavLink className="nav-link " to="/test">
              Autism Test
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" to="/appointmenthistory">
              Patient Records
            </NavLink>
          </li>
          
          <li class="nav-item">
            <NavLink className="nav-link bg-zinc-100 rounded-lg" to="/logoutdoctor">
              Logout
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav class="navbar  navbar-expand-lg navbar-light bg-light ">
        <a class="navbar-brand" href="#" onClick={() => navigate("")}>
          <img
            style={{ height: "3rem", width: "4rem" }}
            src={"images/logo.png"}
            alt=""
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
          <ul class="navbar-nav visible ml-auto items-center">
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
