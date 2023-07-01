import React, { useContext, useState } from "react";
import { UserContex } from "../App";
import { useNavigate } from "react-router-dom";
import "./css/style.css";
import "./css/style.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentCard = (props) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContex);
  const [timing, setTiming] = useState({
    appointmentTime: "",
    appointmentDate: "",
  });
  const setTestData = (data) => {
    console.log(data);
    dispatch({ type: "TEST_DATA", payload: data });
  };
  const onInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTiming({ ...timing, [name]: value });
  };
  const confirmAppointmet = async (time, date) => {
    try {
      if (date == "" || time == "") {
        toast.info("All fields are neccessary!");
      } else {
        let data = {};
        data.docid = state.testdata.docid;
        data.date = date;
        data.time = time;
        data.testid = state.testdata.testid;
        data.name = state.testdata.patient_name;
        data.email = state.testdata.patient_email;
        console.log(data);
        const res = await fetch(
          "http://localhost:8000/bookappointment?docid=" +
            data.docid +
            "&testid=" +
            data.testid,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const resData = await res.json();
        if (res.status == 200) {
          toast.success("Appointment schedule successfully!");
          setTiming({ appointmentDate: "", appointmentTime: "" });
          props.getAppointments();
        } else {
          alert("error");
        }
        //   console.log(props.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="appointment-container">
        <div className="appointment-info">
          <p>
            <span>Testid:</span>
            {props.data ? props.data.testid : null}
          </p>
          <p>
            <span>Patient Name:</span>{" "}
            {props.data ? props.data.patient_name : null}
          </p>
          <p>
            <span>Patient Age:</span>{" "}
            {props.data ? props.data.patient_age : null} years
          </p>
          <p>
            <span>Patient Gender:</span>{" "}
            {props.data ? props.data.patient_gender : null}
          </p>
          <p>
            <span>Patient DOB:</span>{" "}
            {props.data ? props.data.patient_dob : null}
          </p>
          <p>
            <span>Test Result:</span> {props.data ? props.data.result : null}
          </p>
        </div>
        <div className="button-container">
          <button
            type="button"
            class="btn btn-outline-info"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => setTestData(props.data)}
          >
            Test Details
          </button>
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Test Details
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div className="result-container">
                    <h2>
                      <center>Test Result</center>
                    </h2>
                    <p>
                      <b>Test Id: </b>
                      {state.testdata ? state.testdata.testid : null}
                    </p>
                    <h3>Patient's Information</h3>
                    <div className="patient-info">
                      <p>
                        Name:{" "}
                        {state.testdata ? state.testdata["patient_name"] : null}
                      </p>
                      <p>
                        Age:{" "}
                        {state.testdata ? state.testdata["patient_age"] : null}
                        years
                      </p>
                      <p>
                        DOB:{" "}
                        {state.testdata ? state.testdata["patient_dob"] : null}
                      </p>
                      <p>
                        Gender:
                        {state.testdata
                          ? state.testdata["patient_gender"]
                          : null}
                      </p>
                    </div>
                    <h3>Patient's Response</h3>
                    <div className="response-table">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Test Questions</th>
                            <th scope="col">Your Response</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.testdata ? (
                            <>
                              {state.testdata["questions"].map(
                                (curr, index) => {
                                  return (
                                    <tr>
                                      <th scope="row">{index + 1}</th>
                                      <td>{curr.question}</td>
                                      <td>{curr.answer == 1 ? "Yes" : "No"}</td>
                                    </tr>
                                  );
                                }
                              )}
                            </>
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                    <h3>
                      <b>
                        Result:
                        {state.testdata ? state.testdata["result"] : null}
                      </b>
                    </h3>
                    <p>Date:12-02-2023</p>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() =>
                      setTiming({ appointmentDate: "", appointmentTime: "" })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="schedule-appointment-container">
            <button
              type="button"
              class="btn btn-outline-info"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => setTestData(props.data)}
            >
              Schedule Appointment
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Schedule Appointment
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <label htmlFor="appointmentDate">Appointment Date</label>
                    <input
                      type="date"
                      name="appointmentDate"
                      onChange={onInput}
                      value={timing.appointmentDate}
                      required
                    />
                    <label htmlFor="appointmentTime">Appointment time</label>
                    <p>{state.testdata ? state.testdata.testid : null}</p>
                    <input
                      type="time"
                      name="appointmentTime"
                      onChange={onInput}
                      value={timing.appointmentTime}
                      required
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      id="contirm-appointment"
                      type="submit"
                      class="btn btn-outline-info"
                      onClick={() =>
                        confirmAppointmet(
                          timing.appointmentTime,
                          timing.appointmentDate
                        )
                      }
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() =>
                        setTiming({
                          appointmentDate: "",
                          appointmentTime: "",
                        })
                      }
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentCard;
