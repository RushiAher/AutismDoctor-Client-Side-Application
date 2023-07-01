import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/DoctorCard";
import { UserContex } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResultPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContex);
  const [DoctorsData, setDoctorsData] = useState([]);
  const [patientId, setPatientId] = useState();

  const checkLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setPatientId(data.user._id);
      if (!res.status == 200) {
        throw Error(res.error);
      }
    } catch (error) {
      navigate("/");
    }
  };
  const getTestResult = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/gettestresult?testid=" + state.testid,
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
      // console.log(data['data']);
      dispatch({ type: "TEST_RESULT", payload: data["data"] });
    } catch (error) {
      console.log(error);
    }
  };
  const getDoctorsData = async () => {
    try {
      const res = await fetch("http://localhost:8000/getdoctordata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // console.log(data['data']);
      setDoctorsData(data["data"]);
      // console.log(state.testid);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorsData();
    checkLogin();
    if (state.testid) {
      console.log("yes");
      getTestResult();
    }
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
      <section className="result-section">
        {state.testid ? (
          <>
            <div className="result-container shadow">
              <h2 className="text-[1.5rem] md:text-[2rem] font-semibold text-zinc-500">
                <center>Test Result</center>
              </h2>
              <p>
                <b>Test Id: </b>
                {state.testid}
              </p>
              <h3 className="mt-3 ">Patient's Information</h3>
              <div className="patient-info">
                <p>
                  {state.testresult
                    ? `Name:  ${state.testresult[0]["patient_name"]}`
                    : null}
                </p>
                <p>
                  {state.testresult
                    ? `Age: ${state.testresult[0]["patient_age"]}`
                    : null}{" "}
                  Months
                </p>
                <p>
                  {state.testresult
                    ? `DOB: ${state.testresult[0]["patient_dob"]}`
                    : null}
                </p>
                <p>
                  {state.testresult
                    ? `Gender: ${state.testresult[0]["patient_gender"]}`
                    : null}
                </p>
                <p>
                  {state.testresult
                    ? `Contact No.: ${state.testresult[0]["patient_contact"]}`
                    : null}
                </p>
              </div>
              <h3 className="mb-3">Patient's Response</h3>
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
                    {state.testresult ? (
                      <>
                        {state.testresult[0]["questions"].map((curr, index) => {
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
                        })}
                      </>
                    ) : null}
                  </tbody>
                </table>
              </div>
              {/* <p className="text-xl font-normal my-2">
                Autism Score:
                {state.testresult
                  ? ` ${state.testresult[0]["autismScore"]} out of 50`
                  : null}
              </p> */}
              {/* <p className="text-xl font-normal my-2">
                Autism Percentage:
                {state.testresult
                  ? state.testresult[0]["autismPercentage"]
                  : null}
              </p>
              <p className="text-xl font-normal my-2 ">
                Autism Stage:
                {state.testresult ? state.testresult[0]["autismStage"] : null}
              </p> */}
              <p className="text-xl  font-normal my-2">
                Result:
                {state.testresult ? ` ${state.testresult[0]["result"]}` : null}
              </p>
              <p className="mt-2 relative text-end">
                Date:
                {state.testresult
                  ? state.testresult[0]["date"].slice(0, 10)
                  : null}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className="card_container p-2 md:p-4"
              style={{ width: "100%" }}
            >
              <div className="test_card">
                You haven't conducted test yet!
                <br />
                Take our 5 minutes autism test to check wether your child is
                autistic or not!
              </div>
              <div className=" d-flex justify-content-center mt-3">
                <button
                  className="btn  mx-2 btn-outline-info"
                  type="submit"
                  onClick={() => navigate("/doctor")}
                >
                  Take Test
                </button>
              </div>
            </div>
          </>
        )}
      </section>
      {state.testid ? (
        <div className="card_container w-full mt-5 p-2 md:p-4">
          <div className="test_card">
            Get expert's opinion!! Book your appointment today.
            <br />
            OR
            <br /> You can test again
          </div>
          <div className=" d-flex justify-content-center mt-3">
            <button
              className="btn  mx-2 btn-outline-info"
              type="submit"
              onClick={() => navigate("/doctor")}
            >
              Test Again
            </button>
          </div>
        </div>
      ) : null}

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8">
        {DoctorsData.map((curr) => {
          return (
            <DoctorCard
              name={curr.name}
              phone={curr.phone}
              address={curr.address}
              degree={curr.degree}
              experiance={curr.experiance}
              docid={curr._id}
              data={state.testresult ? state.testresult[0] : null}
            />
          );
        })}
      </div>
    </>
  );
};

export default ResultPage;
