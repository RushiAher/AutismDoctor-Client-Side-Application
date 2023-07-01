import React, { useEffect, useState, useContext } from "react";
import Questionnaire from "../../utilities/questions.js";
import "./css/style.css";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../App";

let prevBtns = document.querySelectorAll(".btn-prev");
let nextBtns = document.querySelectorAll(".btn-next");
let progress = document.getElementById("progress");
let formSteps = document.querySelectorAll(".form-step");
let progressSteps = document.querySelectorAll(".progress-step");

const YourDoctor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContex);
  const [patientData, setPatientData] = useState();
  const callDoctor = async () => {
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

      if (res.status != 200) {
        throw Error(res.error);
      }
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    callDoctor();

    prevBtns = document.querySelectorAll(".btn-prev");
    nextBtns = document.querySelectorAll(".btn-next");
    progress = document.getElementById("progress");
    formSteps = document.querySelectorAll(".form-step");
    progressSteps = document.querySelectorAll(".progress-step");
    let formStepsNum = 0;
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
      });
    });

    function updateFormSteps() {
      formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
          formStep.classList.remove("form-step-active");
      });

      formSteps[formStepsNum].classList.add("form-step-active");
    }

    function updateProgressbar() {
      progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
          progressStep.classList.add("progress-step-active");
        } else {
          progressStep.classList.remove("progress-step-active");
        }
      });

      const progressActive = document.querySelectorAll(".progress-step-active");

      progress.style.width =
        ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPatientData({ ...patientData, [name]: value });
  };
  const submitFormData = async (e) => {
    
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/result", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          1: patientData[1],
          2: patientData[2],
          3: patientData[3],
          4: patientData[4],
          5: patientData[5],
          6: patientData[6],
          7: patientData[7],
          8: patientData[8],
          9: patientData[9],
          10: patientData[10],
          11: patientData[11],
          age: patientData["CAge"],
          patient_contact: patientData["PPhone"],
          gender: patientData["CGender"],
          patient_name: patientData["CName"],
          patient_dob: patientData["CDOB"],
        }),
      });

      const data = await res.json();
      console.log("Res" + JSON.stringify(data));
      if (!data || res.status !== 200) {
        setLoading(false);
        alert("some error has occur please try again!");
      } else {
        dispatch({ type: "RESULT", payload: true });
        dispatch({ type: "TEST_ID", payload: data.testId });
        // console.log("tid>>>>>>"+ data.testId);
        navigate("/result?testid=" + data.testId, {
          replace: true,
          state: { testid: data.testId },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form_container ">
        <form onSubmit={submitFormData} className="form shadow" style={{width:"45%"}} method="POST">
          <h1 className="text-center text-[2.5rem] font-semibold">
            Your Doctor
          </h1>

          <div className="progressbar">
            <div className="progress" id="progress"></div>

            <div
              className="progress-step progress-step-active"
              data-title="Child Details"
            ></div>
            <div className="progress-step" data-title="Parent Details"></div>
            <div className="progress-step" data-title="Questions"></div>
            <div className="progress-step" data-title="Remark"></div>
          </div>

          <div className="form-step form-step-active">
            <div className="input-group">
              <label for="CName">Name</label>
              <input
                type="text"
                name="CName"
                id="CName"
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label for="CAge">Age In Months</label>
              <input
                type="text"
                name="CAge"
                id="CAge"
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label for="CGender">Gender</label>
              <select
                name="CGender"
                className="form-select mt-3"
                aria-label="Default select example"
                required
                onChange={handleChange}
              >
                <option>select your Answer</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label for="CDOB">Date of Birth</label>
              <input
                type="date"
                name="CDOB"
                id="CDOB"
                onChange={handleChange}
                required
              />
            </div>

            <div className="">
              <button
                className="form_btn btn-next width-50 ml-auto"
                type="submit"
              >
                Next
              </button>
            </div>
          </div>

          <div className="form-step">
            <div className="input-group">
              <label for="PName">Name</label>
              <input
                type="text"
                name="PName"
                id="PName"
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label for="PAge">Age</label>
              <input
                type="text"
                name="PAge"
                id="PAge"
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label for="PGender">Gender</label>
              <select
                name="PGender"
                className="form-select mt-3"
                aria-label="Default select example"
                onChange={handleChange}
                required
              >
                <option selected>select your Answer</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label for="PPhone">Phone Number </label>
              <input
                type="text"
                name="PPhone"
                id="PPhone"
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label for="PEmail">Email</label>
              <input
                type="text"
                name="PEmail"
                id="PEmail"
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label for="PAdress">Address</label>
              <input
                type="text"
                name="PAddress"
                id="PAddress"
                required
                onChange={handleChange}
              />
            </div>
            <div className="btns-group">
              <a href="#" className="form_btn btn-prev">
                Previous
              </a>
              <button type="submit" className="form_btn btn-next">
                Next
              </button>
            </div>
          </div>
          <div className="form-step">
            {Questionnaire.map((currElem) => {
              return (
                <>
                  <div className="input-group">
                    <div className="questions">
                      <span>Q.{currElem.id})</span> {currElem.question}
                    </div>
                    <select
                      name={currElem.id}
                      className="form-select mt-3"
                      aria-label="Default select example"
                      onChange={handleChange}
                      required
                    >
                      {currElem.id == 11 ? (
                        <>
                          {" "}
                          <option selected>select your Answer</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </>
                      ) : (
                        <>
                          <option selected>select your Answer</option>
                          <option value="10">Rarely</option>
                          <option value="20">Sometimes</option>
                          <option value="31">Frequently</option>
                          <option value="41">Mostly</option>
                          <option value="51">Always</option>
                        </>
                      )}
                    </select>
                  </div>
                </>
              );
            })}

            <div className="btns-group">
              <a href="#" className="form_btn btn-prev">
                Previous
              </a>
              <button className="form_btn btn-next" type="submit">
                Next
              </button>
            </div>
          </div>
          <div className="form-step">
            <div className="input-group">
              <label for="PAdress">Remark</label>
              <textarea
                type="text"
                name="remark"
                id="remark"
                required
                onChange={handleChange}
                className="p-2"
              />
            </div>
           
            <div className="btns-group">
              <a href="#" className="form_btn btn-prev">
                Previous
              </a>
              <button type="submit" className="form_btn">
                {loading ? (
                  <>
                    <div role="status " id="loader">
                      Generating Result...
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
                  "View Result"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default YourDoctor;
