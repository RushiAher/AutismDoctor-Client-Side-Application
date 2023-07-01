import React, { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import "./css/style.css";
import "./css/style.min.css";
import { FaUser, FaAddressCard } from "react-icons/fa";
import { MdEmail, MdWork, MdPassword } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    cpassword: "",
  });

  const onInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, phone, address, password, cpassword } = user;
      if (password !== cpassword) {
        setLoading(false);
        return alert("password not matching!");
      }
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          password,
          cpassword,
        })
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        setLoading(false);
        alert("Unable to create user please try again!");
      } else {
        // console.log(data);
        navigate("/signin")
      }
    } catch (error) {
      console.log(error);
      alert("Internal server error! please try again!")
      
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [])
  return (
    <>
      <section className="section">
        <div className="signup-container shadow">
          <form
            className="signup-left-container"
            onSubmit={registerUser}
            // method="POST"
          >
            <h1>Sign Up</h1>

            <FormField
              icon={<FaUser />}
              name="name"
              placeholder="Full Name"
              onInput={onInput}
              type="text"
              value={user.name}
            />
            <FormField
              icon={<MdEmail />}
              name="email"
              placeholder="Email Address"
              onInput={onInput}
              type="email"
              value={user.email}
            />
            <FormField
              icon={<BsFillTelephoneFill />}
              name="phone"
              placeholder="Phone Number"
              onInput={onInput}
              type="Number"
              value={user.phone}
            />
            <FormField
              icon={<FaAddressCard />}
              name="address"
              placeholder="Residential Address"
              onInput={onInput}
              type="text"
              value={user.address}
            />
            <FormField
              icon={<MdPassword />}
              name="password"
              placeholder="Password"
              onInput={onInput}
              type="password"
              value={user.password}
            />
            <FormField
              icon={<MdPassword />}
              name="cpassword"
              placeholder="Confirm Password"
              onInput={onInput}
              type="password"
              value={user.cpassword}
            />

            <button className="signUp-btn btn btn-primary mt-3" type="submit">
              {loading ? (
                <>
                  <div role="status " id="loader">
                    Sign Up...
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
                "Sign Up"
              )}
            </button>
          </form>

          <div className="signup-right-container ">
            <img src={"images/signup.png"} alt="signup-img" />
            <NavLink to="/signin" className="already-signup">
              already signup? please sign in
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
