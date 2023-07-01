import React, { useState, useContext,useEffect } from "react";
import FormField from "../../components/FormField";
import "./css/style.css";
import "./css/style.min.css";
import { MdEmail, MdPassword } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContex } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContex);

  const onInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "email") {
      setEmail(value);
    }
    if (name == "password") {
      setPassword(value);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    let activeTab = document.getElementsByClassName("check-status");
    let pateintTab = activeTab[0].classList.contains("active");
    let doctorTab = activeTab[1].classList.contains("active");
    console.log(pateintTab);
    console.log(doctorTab);
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/login", {
        withCredentials: true,
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          pateintTab,
          doctorTab,
        }),
      });
      const data = await res.json();

      if (res.status == 401 || !data) {
        toast.error("Invalid Credentials!");
        // alert("Invalid credentials!");
        setLoading(false);
      } else {
        toast.success("Login Successful!");
        // alert("login successful!");
        dispatch({ type: "USER_LOGGEDIN", payload: true });
        if (doctorTab) {
          dispatch({ type: "PATIENT", payload: false });
          dispatch({ type: "DOCTOR", payload: true });
          localStorage.setItem('userType', "doctor")
          navigate("/newappointments");
        } else if (pateintTab) {
          dispatch({ type: "PATIENT", payload: true });
          dispatch({ type: "DOCTOR", payload: false });
           localStorage.setItem("userType", "patient");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials!");
    }
  };
  useEffect(() => {
     window.scrollTo({
       top: 0,
       left: 0,
       behavior: "smooth",
     });
  }, []);
  return (
    <>
      <section className="section">
        <div className="signup-container shadow">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <form
            className="signup-left-container "
            onSubmit={loginUser}
            method="POST"
          >
            <h1>Sign In</h1>
            <ul
              class="nav nav-tabs"
              id="myTab"
              style={{ width: "100%", margin: "2rem auto" }}
              role="tablist"
            >
              <li class="nav-item" style={{ width: "50%" }}>
                <a
                  class="nav-link check-status active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Patient
                </a>
              </li>
              <li class="nav-item" style={{ width: "50%" }}>
                <a
                  class="nav-link check-status"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Doctor
                </a>
              </li>
            </ul>
            {/* <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                ...
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                ...
              </div>
             
            </div> */}
            <FormField
              icon={<MdEmail />}
              name="email"
              placeholder="Email Address"
              onInput={onInput}
              type="email"
            />

            <FormField
              icon={<MdPassword />}
              name="password"
              placeholder="Password"
              onInput={onInput}
              type="password"
            />

            <button type="submit" className="signUp-btn btn btn-primary mt-3">
              {loading ? (
                <>
                  <div role="status " id="loader">
                    Sign In...
                    <svg
                      aria-hidden="true"
                      class="inline w-4 h-4 text-gray-200 animate-spin dark:text-white fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    {/* <span class="sr-only">Loading...</span> */}
                  </div>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="signup-right-container">
            <img src={"images/signup.png"} alt="signup-img" />
            <NavLink to="/signup" className="already-signup">
              don't have account? please sign up
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
