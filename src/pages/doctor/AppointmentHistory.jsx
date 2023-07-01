import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../App";

const AppointmentHistory = () => {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState([]);
  const [docid, setDocid] = useState();
  const { state, dispatch } = useContext(UserContex);
  const [timing, setTiming] = useState({
    appointmentTime: "",
    appointmentDate: "",
  });
  const getAppointments = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/getappointmentdata?confirmAppointment=" +
          true +
          "&visited=" +
          true,
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
  const setTestData = (data) => {
    // console.log(data);
    dispatch({ type: "TEST_DATA", payload: data });
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <>
      {appointmentData.length > 0 ? (
        <>
          <div className="p-8 flex flex-col w-full items-center min-h-[90vh]">
            <div>
              <p className="text-xl font-semibold text-zinc-700 mb-4 p-2">
                Patient Records
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
                    <option selected>All</option>
                    <option value="7-day">Today</option>
                    <option value="7-day">Last Day</option>
                    <option value="7-day">Last 7 Days</option>
                    <option value="7-day">Last 30 Days</option>
                    <option value="7-day">Last Month</option>
                    <option value="7-day">Last Year</option>
            
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
              <div class="relative max-w-max overflow-x-auto shadow-md sm:rounded-lg">
                <table class="max-w-max text-sm text-left text-gray-500 ">
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
                        Appointment Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Appointment Time
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Screening test results
                      </th>
                      {/* <th scope="col" class="px-6 py-3">
                        Deep Test Result
                      </th> */}
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
                                {/* <td class="px-6 py-4">
                              {curr ? curr.autismStage : null}
                            </td> */}
                                <td class="px-6 py-4">
                                  {curr.appointmentSchedule.length > 0
                                    ? curr.appointmentSchedule[0]
                                        .appointmentDate
                                    : null}
                                </td>
                                <td class="px-6 py-4">
                                  {console.log(curr)}
                                  {curr.appointmentSchedule.length > 0
                                    ? curr.appointmentSchedule[0]
                                        .appointmentTime
                                    : null}
                                </td>
                                <td class="text-center">
                                  {/* <button
                              type="button"
                              data-toggle="modal"
                              data-target="#testDetailsModal"
                              class="text-white bg-cyan-400 hover:bg-cyan-300 focus:ring-2 focus:ring-cyan-300 font-medium rounded-lg text-sm px-3 py-2 mr-2"
                              onClick={() => setTestData(curr)}
                            >
                              View
                            </button> */}
                                  <p
                                    className="text-blue-700 hover:underline cursor-pointer"
                                    data-toggle="modal"
                                    data-target="#testDetailsModal"
                                    onClick={() => setTestData(curr)}
                                  >
                                    View
                                  </p>
                                </td>
                                {/* <td className="text-center">
                                  <p
                                    className="text-blue-700 hover:underline cursor-pointer"
                                    data-toggle="modal"
                                    data-target="#deep-test-Modal"
                                    onClick={() => setTestData(curr)}
                                  >
                                    View
                                  </p> */}
                                  {/* <button
                              data-toggle="modal"
                              data-target="#deep-test-Modal"
                              onClick={() => setTestData(curr)}
                              type="button"
                              class="text-white  bg-cyan-400 hover:bg-cyan-300 focus:ring-2 focus:ring-cyan-300 font-medium rounded-lg text-sm px-3 py-2 mr-4"
                            >
                              View
                            </button> */}
                                {/* </td> */}
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
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full items-center justify-center min-h-[90vh]">
            {/* <p className="text-xl font-semibold text-zinc-500">
              No Records Available
            </p> */}
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-cyan-300"
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
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppointmentHistory;
