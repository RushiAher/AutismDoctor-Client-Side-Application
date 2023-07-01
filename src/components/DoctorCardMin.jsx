import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorCardMin = (props) => {
  const bookAppointment = async () => {
    console.log("inside");
    try {
      console.log("props data"+JSON.stringify(props.data.testid))
      const res = await fetch("http://localhost:8000/bookappointment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          testid: props.data.testid,
          patient_name: props.data.patient_name,
          patient_age: props.data.patient_age,
          patient_dob: props.data.patient_dob,
          patient_gender: props.data.patient_gender,
          patient_contact: props.data.patient_contact,
          questions: props.data.questions,
          result: props.data.result,
          autismScore: props.data.autismScore,
          autismPercentage: props.data.autismPercentage,
          autismStage: props.data.autismStage,
          docid: props.docid,
        }),
      });

      const data = await res.json();
      console.log("docmincard"+ props.data)
      console.log("Appointment"+data);
      if (res.status == 200) {
        toast.success(
          "Appointment request send successfully you will get notified by eamil regarding to appointment schedule!"
        );
      }
    } catch (error) {
      toast.info("Before booking visit first conduct test first!");
      console.log(error);
    }
  };
  return (
    <>
      <div className="doc-container-min">
        <div className="doc-middle-container">
          <h2>{props.name}</h2>
          <p className="degree">{props.degree}</p>
          <p className="experiance">{props.experiance}</p>
          <p className="phone">
            <b>phone:</b> {props.phone}
          </p>
          <p className="address">
            <b>Address:</b> {props.address}
          </p>
        </div>
        <div className="doc-right-container">
          <button className="btn btn-outline-info" onClick={bookAppointment}>
            Book Clinic Visit
          </button>
          <button className="btn btn-outline-info">Read About Doctor</button>
        </div>
      </div>
    </>
  );
};

export default DoctorCardMin;
