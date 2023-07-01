import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DoctorCard = (props) => {
  const bookAppointment = async () => {
    try {
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
      console.log("Appointment "+data);
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
      <div class="w-[20rem] bg-white border border-gray-200 rounded-lg shadow ">
        <div className="flex justify-center items-center mt-2">
          <img
            className="rounded-full w-[8rem] h-[8rem] "
            src={"images/doclogo.png"}
            alt=""
          />
        </div>
        <div class="p-3">
          <a href="#">
            <h5 class="text-2xl font-bold tracking-tight text-gray-900 ">
              {props.name}
            </h5>
          </a>

          <p className="mt-2 font-normal text-gray-700">{props.experiance}</p>
          <p className="mt-2 font-normal text-gray-700">
            <b>phone:</b> {props.phone}
          </p>
          <p className="mb-t font-normal text-gray-700">
            <b>Address:</b> {props.address}
          </p>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#17a2b8] rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 mt-5"
            onClick={bookAppointment}
          >
            Book Clinic Visit
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* <div className="doc-container hidden w-[30%]">
        <div className="doc-left-container">
          <img src={"images/doclogo.png"} alt="doclogo" />
        </div>
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
          <button className="book-btn btn" onClick={bookAppointment}>
            Book Clinic Visit
          </button>
          <button className="about-btn btn">Read About Doctor</button>
        </div>
      </div> */}
    </>
  );
};

export default DoctorCard;
