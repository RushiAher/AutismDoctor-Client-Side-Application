import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../patient/css/style.css";
import "../patient/css/style.min.css";
import EditDocCard from "../../components/EditDocCard";
import { UserContex } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ManageDoc = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContex);
  const [allDocs, setAllDocs] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    cpassword: "",
    experiance: "",
    degree: "",
  });
  const togglePanel = () => {
    let leftPanel1 = document.getElementsByClassName("left-panel-1");
    let leftPanel2 = document.getElementsByClassName("left-panel-2");
    leftPanel1[0].classList.toggle("active");
    leftPanel2[0].classList.toggle("active");
  };
  const getAllDocs = async () => {
    try {
      const res = await fetch("http://localhost:8000/getdoctordata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200 || data) {
        setAllDocs(data["data"]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      if (newDoctor.password !== newDoctor.cpassword) {
        return toast.error("password does not match!");
      }
      // console.log(state.editdocid);
      const res = await fetch(
        "http://localhost:8000/registerdoc?docid=" + state.editdocid,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newDoctor.name,
            email: newDoctor.email,
            phone: newDoctor.phone,
            degree: newDoctor.degree,
            experiance: newDoctor.experiance,
            address: newDoctor.address,
            password: newDoctor.password,
            cpassword: newDoctor.cpassword,
          }),
        }
      );
      var data = await res.json();
      console.log(data);
      if (res.status == 403) {
        alert("Email already exists!");
      } else if (res.status == 201) {
        dispatch({ type: "EDIT_DOC_ID", payload: null });
        toast.success(data.message);
        navigate("/dashboard", { replace: true });
      } else if (res.status == 422) {
        toast.info("Please provide neccessary fields!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setEditContent = async (docid) => {
    if (docid) {
      try {
        const res = await fetch(
          "http://localhost:8000/getdoctordata?docid=" + docid,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (res.status == 200 || data) {
          setNewDoctor({ ...data["data"][0], password: "", cpassword: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewDoctor({ ...newDoctor, [name]: value });
  };
  useEffect(() => {
    getAllDocs();
  }, []);
  return (
    <>
      <section className="blog-section">
        <div className="left-panel-1 ">
          <h3>Open</h3>
          <a href="#" onClick={togglePanel}>
            &#9776;
          </a>
        </div>
        <div className="left-panel-2 active">
          <div className="left-panel-heading">
            <h3>Registered Doctors</h3>
            <a href="#" className="close-btn" onClick={togglePanel}>
              &times;
            </a>
          </div>
          <div className="left-panel-content">
            {allDocs.length > 0 ? (
              allDocs
                .slice(0)
                .reverse()
                .map((curr) => {
                  return (
                    <EditDocCard
                      name={curr.name}
                      degree={curr.degree}
                      docid={curr._id}
                      setEditContent={setEditContent}
                    />
                  );
                })
            ) : (
              <>
                <h5>You haven't added any doctor's info yet!</h5>
              </>
            )}
          </div>
        </div>
        <div className="content-panel">
          <div class="container">
            <form onSubmit={addDoctor} method="POST" id="editdocform">
              <h3>Add Doctor</h3>
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={onInput}
                value={newDoctor.name}
                required
                placeholder="write doctor's name"
              />
              <label for="degree">Degree</label>
              <input
                type="text"
                name="degree"
                onChange={onInput}
                value={newDoctor.degree}
                required
                placeholder="eg. MBBS, DNB - Psychiatry"
              />
              <label for="experiance">Experiance</label>
              <input
                type="text"
                name="experiance"
                onChange={onInput}
                value={newDoctor.experiance}
                required
                placeholder="eg.write years of experiance"
              />
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={onInput}
                value={newDoctor.email}
                required
                placeholder="eg. example@gmail.com"
              />
              <label for="phone">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={onInput}
                value={newDoctor.phone}
                required
                placeholder="eg. 1234567890"
              />
              <label for="address">Address</label>
              <input
                type="text"
                name="address"
                onChange={onInput}
                value={newDoctor.address}
                required
                placeholder="write clinic address"
              />
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={onInput}
                value={newDoctor.password}
                required
                placeholder=""
              />
              <label for="cpassword">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                onChange={onInput}
                value={newDoctor.cpassword}
                required
                placeholder=""
              />

              <button type="submit" class="btn btn-outline-secondary">
                Add
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageDoc;
