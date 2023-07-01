import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ScheduledAppointments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { state, dispatch } = useContext(UserContex);
  const [patientData, setPatientData] = useState();
  const [appointmentData, setAppointmentData] = useState([]);
  const [docid, setDocid] = useState();
  const [timing, setTiming] = useState({
    appointmentTime: "",
    appointmentDate: "",
  });
  const deleteAppointment = async (testid, docid) => {
    try {
      const res = await fetch(
        "http://localhost:8000/bookappointment?docid=" +
          docid +
          "&testid=" +
          testid,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        console.log("inside delete");
        toast.success("Appointment deleted successfully!");
        getAppointments();
        navigate("/scheduledappointments", { replace: true });
      } else {
        alert("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAppointments = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/getappointmentdata?confirmAppointment=" +
          true +
          "&visited=" +
          false,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("dahajh   " + data.data);
      setAppointmentData(data.data);
      setDocid(data["docid"]);
    } catch (error) {
      console.log(error);
    }
  };
  const onInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTiming({ ...timing, [name]: value });
  };
  const rescheduleAppointmet = async (time, date) => {
    try {
      console.log("data" + time + date);
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
            data.testid +
            "&reschedule=" +
            true,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              date: date,
              time: time,
            }),
          }
        );

        const resData = await res.json();
        console.log("hello" + resData);
        if (res.status == 200) {
          toast.success("Appointment reschedule successfully!");
          setTiming({ appointmentDate: "", appointmentTime: "" });
          getAppointments();
          navigate("/scheduledappointments", { replace: true });
        } else {
          alert("error");
        }
        //   console.log(props.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const markVisited = async () => {
    try {
      let data = {};
      data.docid = state.testdata.docid;
      data.testid = state.testdata.testid;
      const res = await fetch(
        "http://localhost:8000/bookappointment?docid=" +
          data.docid +
          "&testid=" +
          data.testid +
          "&visited=" +
          true,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            visited: true,
          }),
        }
      );

      const resData = await res.json();

      if (res.status == 200) {
        toast.success("Successfully Marked Visited!");
        getAppointments();
        navigate("/scheduledappointments", { replace: true });
      } else {
        alert("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setTestData = (data) => {
    // console.log(data);
    dispatch({ type: "TEST_DATA", payload: data });
  };

  useEffect(() => {
     window.scrollTo({
       top: 0,
       left: 0,
       behavior: "smooth",
     });
    getAppointments();
  }, []);
 
  return (
    <>
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

      {appointmentData.length > 0 ? (
        <>
          <div className="p-8 flex flex-col w-full items-center min-h-[90vh]">
            <div>
              <p className="text-xl font-semibold text-zinc-700 mb-4 p-2">
                Appointment Schedule
              </p>
              <div className="flex flex-row justify-between mb-3 items-center w-full min-h-max gap-x-4">
                <div className="flex">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  ></label>
                  <select
                    id="days"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 "
                  >
                    <option selected>Today</option>
                    <option value="7-day">Tomorrow</option>
                    <option value="30-day">All</option>
                  </select>
                </div>

                <form class="flex items-center">
                  <label for="simple-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                      placeholder="Search"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="p-2.5 ml-2 text-sm font-medium text-white bg-cyan-300 rounded-lg border border-blue-700 hover:bg-cyan-400 focus:ring-4 focus:outline-none focus:ring-cyan-300 "
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </form>
              </div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 ">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Test ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Patient Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Age
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Contact Number
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Autism Stage
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Appointment Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Appointment Time
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Screening test results
                      </th>
                      {/* <th scope="col" class="px-6 py-3">
                        Conduct Deep Test
                      </th> */}
                      <th scope="col" class="px-6 py-3">
                        options
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentData
                      ? appointmentData.map((curr) => {
                          return (
                            <>
                              <tr class="bg-white border-b hover:bg-gray-50 ">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  {curr ? curr.testid : null}
                                </th>
                                <td class="px-6 py-4">
                                  {curr ? curr.patient_name : null}
                                </td>
                                <td class="px-6 py-4">
                                  {curr ? curr.patient_age : null}
                                </td>
                                {/* <td class="px-6 py-4">
                              {curr ? curr.patient_gender : null}
                            </td>  */}
                                <td class="px-6 py-4">
                                  {curr ? curr.patient_contact : null}
                                </td>
                                {/* <td class="px-6 py-4">
                              {curr ? curr.autismScore : null}
                            </td>
                            <td class="px-6 py-4">
                              {curr ? curr.autismPercentage : null}
                            </td> */}
                                <td class="px-6 py-4">
                                  {curr ? curr.autismStage : null}
                                </td>
                                <td class="px-6 py-4">
                                  {curr.appointmentSchedule.length > 0
                                    ? curr.appointmentSchedule[0]
                                        .appointmentDate
                                    : null}
                                </td>
                                <td class="px-6 py-4">
                                  {curr.appointmentSchedule.length > 0
                                    ? curr.appointmentSchedule[0]
                                        .appointmentTime
                                    : null}
                                </td>
                                <td class="text-center">
                                  <button
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#testDetailsModal"
                                    class="text-white bg-cyan-400 hover:bg-cyan-300 focus:ring-2 focus:ring-cyan-300 font-medium rounded-lg text-sm px-3 py-2 mr-2"
                                    onClick={() => setTestData(curr)}
                                  >
                                    View
                                  </button>
                                </td>
                                {/* <td className="text-center">
                                  <button
                                    // data-toggle="modal"
                                    // data-target="#deepTest-Modal"
                                    onClick={() => setShowForm(true)}
                                    type="button"
                                    class="text-white  bg-cyan-400 hover:bg-cyan-300 focus:ring-2 focus:ring-cyan-300 font-medium rounded-lg text-sm px-3 py-2 mr-4"
                                  >
                                    Deep Test
                                  </button>
                                </td> */}
                                <td className="text-center flex flex-col gap-y-2 justify-center items-start my-1">
                                  <p
                                    className="text-blue-500 hover:underline cursor-pointer"
                                    data-toggle="modal"
                                    data-target="#schedule-Modal"
                                    onClick={() => setTestData(curr)}
                                  >
                                    Reschedule
                                  </p>
                                  <p
                                    className="text-green-500 hover:underline cursor-pointer"
                                    onClick={markVisited}
                                  >
                                    Mark Visited
                                  </p>
                                  <p
                                    className="text-red-500 hover:underline cursor-pointer"
                                    onClick={() =>
                                      deleteAppointment(curr.testid, curr.docid)
                                    }
                                  >
                                    Delete
                                  </p>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>

            {/* test details modal */}
            <div
              class="modal fade"
              id="testDetailsModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="testDetailsModalTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title " id="exampleModalLongTitle">
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
                      <h2 className="text-[2.5rem] font-semibold">
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
                          {state.testdata
                            ? state.testdata["patient_name"]
                            : null}
                        </p>
                        <p>
                          Age:{" "}
                          {state.testdata
                            ? state.testdata["patient_age"]
                            : null}
                          years
                        </p>
                        <p>
                          DOB:{" "}
                          {state.testdata
                            ? state.testdata["patient_dob"]
                            : null}
                        </p>
                        <p>
                          Gender:
                          {state.testdata
                            ? state.testdata["patient_gender"]
                            : null}
                        </p>
                        <p>
                          Patient's Contact:
                          {state.testdata
                            ? state.testdata["patient_contact"]
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
                                        <td>
                                          {index == 10
                                            ? curr.answer == 0
                                              ? "No"
                                              : "Yes"
                                            : curr.answer == 1
                                            ? "Rarely"
                                            : curr.answer == 2
                                            ? "Sometimes"
                                            : curr.answer == 3
                                            ? "Frequently"
                                            : curr.answer == 4
                                            ? "Mostly"
                                            : curr.answer == 5
                                            ? "Always"
                                            : null}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </>
                            ) : null}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xl font-normal my-2">
                        Autism Score:
                        {state.testdata ? state.testdata["autismScore"] : null}
                        out of 50
                      </p>
                      <p className="text-xl font-normal my-2">
                        Autism Percentage:
                        {state.testdata
                          ? state.testdata["autismPercentage"]
                          : null}
                      </p>
                      <p className="text-xl font-normal my-2 ">
                        Autism Stage:
                        {state.testdata ? state.testdata["autismStage"] : null}
                      </p>
                      {/* <h3>
                  <b>
                    Result:
                    {state.testdata ? state.testdata["result"] : null}
                  </b>
                </h3> */}
                      <p className="mt-2 relative text-end">
                        Date:
                        {state.testdata
                          ? state.testdata["date"].slice(0, 10)
                          : null}
                      </p>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="py-2.5 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200  hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 "
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reschedule modal */}
            <div className="schedule-appointment-container">
              <div
                className="modal fade"
                id="schedule-Modal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Reschedule Appointment
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
                      <label htmlFor="appointmentTime" className="mt-3">
                        Appointment time
                      </label>

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
                          rescheduleAppointmet(
                            timing.appointmentTime,
                            timing.appointmentDate
                          )
                        }
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        class="py-2.5 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200  hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 "
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
        </>
      ) : (
        <>
          <div className="flex w-full items-center justify-center min-h-[90vh]">
            <p className="text-xl font-semibold text-zinc-500">
              No Appointments for Today
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ScheduledAppointments;
