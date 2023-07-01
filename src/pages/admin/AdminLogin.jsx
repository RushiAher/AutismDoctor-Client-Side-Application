import React,{useState,useContext} from 'react'
import FormField from "../../components/FormField"
import { MdEmail, MdPassword } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import "./css/style.css"
import "./css/style.min.css"
import {UserContex} from "../../App"
const AdminLogin = () => {
    const { state, dispatch } = useContext(UserContex);
    const navigate = useNavigate()
    const [admin, setAdmin] = useState()
    const onInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAdmin({ ...admin, [name]: value });
    }

    const loginAdmin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/adminlogin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  adminEmail: admin.email,
                  adminPassword:admin.password
              }),
            });
            const data =await res.json()
            if (res.status != 200) {
                alert("Invalid credentials!");
            } else {
                alert("loggin successful!")
                dispatch({ type: "ADMIN_LOGIN",payload:true});
                navigate("/dashboard", { replace: true });
            }
        } catch (error) {
            alert("Invalid credentials!")
            console.log(error);
        }
    }
    return (
      <>
        <section className="admin-section">
          <div className="login-container">
                    <form onSubmit={loginAdmin}>
                        <h3>Admin Login</h3>
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

              <button type="submit" className="btn btn-primary mt-3 ">
                Login
              </button>
            </form>
          </div>
        </section>
      </>
    );
}

export default AdminLogin
