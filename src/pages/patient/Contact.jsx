import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/style.css";
import "./css/style.min.css";
import { FaAddressCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import AddressCard from "../../components/AdressCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    
  })
  const getContactFrom = async () => {
    try {
      const res = await fetch("http://localhost:8000/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
             credentials: "include",
      });
      const data = await res.json();
      // console.log(data.user);
      setUser({...user,name:data.user.name, email:data.user.email, phone:data.user.phone})
      // console.log(data);
      // console.log("hwllo");
      if (!res.status === 200) {
        throw Error(res.error);
      }
    } catch (error) {
      console.log(error);
      navigate("/contact");
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    getContactFrom();
  }, []);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  const submitContact = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/contact", {
        withCredentials: true,
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          message:user.message
        }),
      });
      const data = await res.json();
      if (res.status == 401 || !data) {
        toast.info("Please fill form properly!")
      } else {
        toast.success("Message send successfully!");
        setUser({ ...user, message:"" });
      }
    } catch (error) {
      console.log(error);
      toast.info("Please fill form properly!");
    }

  }
  return (
    <>
      <section className="contact-section">
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
        <div className="contact-main-container">
          <div className="contact-info">
            <AddressCard
              name="Email"
              value="rushiaher@gmail.com"
              icon={<MdEmail />}
            />
            <AddressCard
              name="Phone"
              value="9320304913"
              icon={<BsFillTelephoneFill />}
            />
            <AddressCard
              name="Address"
              value="Nashik"
              icon={<FaAddressCard />}
            />
          </div>
          <div className="contact-form">
            <form onSubmit={submitContact} method="POST">
              <h3>Get In touch</h3>
              <div class="form-row mt-3">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="col">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Your Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="col">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Your Phone Number"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <textarea
                  name="message"
                  class="form-control mt-3"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={user.message}
                  placeholder="Message"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary send-msg-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
