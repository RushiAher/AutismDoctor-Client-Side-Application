import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorQuestionnaire from "../../utilities/DoctorQuestionnaire.js";

let prevBtns = document.querySelectorAll(".btn-prev");
let nextBtns = document.querySelectorAll(".btn-next");
let progress = document.getElementById("progress");
let formSteps = document.querySelectorAll(".form-step");
let progressSteps = document.querySelectorAll(".progress-step");

const Test = () => {
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const { state, dispatch } = useContext(UserContex);
     const [patientData, setPatientData] = useState();
    
     const handleChange = (e) => {
       e.preventDefault();
       const name = e.target.name;
       const value = e.target.value;
       setPatientData({ ...patientData, [name]: value });
     };
     const submitFormData = async (e) => {
       console.log("submit form");
       setLoading(true);
       e.preventDefault();
       try {
         const res = await fetch("http://localhost:8000/deeptestresult", {
           method: "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
           },
           credentials: "include",
           body: JSON.stringify({
             ...patientData,
           }),
         });

         const data = await res.json();
           console.log("Res" + JSON.stringify(data));
           console.log(data);
           
           
         if (!data || res.status !== 200) {
           setLoading(false);
           alert("some error has occur please try again!");
         } else {
             setLoading(false);
            dispatch({ type: "DEEP_TEST_RESULT", payload: data.result });
           navigate("/deeptestresult", { replace: true});
         }
       } catch (error) {
         console.log(error);
       }
    };
    
    
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

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
    return (
      <>
         <div className="w-full my-5">
                <form className="form " style={{ width: "60%" }} method="POST">
                  <h1 className="text-center text-[2rem] text-zinc-500 font-semibold">
                    Autism Doctor
                  </h1>

                  <div className="progressbar">
                    <div className="progress" id="progress"></div>

                    <div
                      className="progress-step progress-step-active"
                      data-title="SOCIAL RELATIONSHIPAND RECIPROCITY
"
                    ></div>
                    <div
                      className="progress-step"
                      data-title="EMOTIONAL RESPONSIVENESS"
                    ></div>
                    <div
                      className="progress-step"
                      data-title="SPEECH-LANGUAGE AND COMMUNICATION"
                    ></div>
                    <div
                      className="progress-step"
                      data-title="BEHAVIOUR PATTERNS"
                    ></div>
                    <div
                      className="progress-step"
                      data-title="SENSORY ASPECTS"
                    ></div>
                    <div
                      className="progress-step"
                      data-title="COGNITIVE COMPONENT"
                    ></div>
                  </div>

                  <div
                    className="form-step form-step-active"
                    style={{ marginTop: "7rem" }}
                  >
                    {DoctorQuestionnaire[0].map((currElem) => {
                      return (
                        <>
                          <div className="input-group">
                            <div className="questions">
                              <span>Q.{currElem.id})</span> {currElem.question}
                            </div>
                            <select
                              name={`A-${currElem.id}`}
                              className="form-select mt-3"
                              aria-label="Default select example"
                              onChange={handleChange}
                              required
                            >
                              {currElem.id == 111 ? (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </>
                              ) : (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="1">Rarely</option>
                                  <option value="2">Sometimes</option>
                                  <option value="3">Frequently</option>
                                  <option value="4">Mostly</option>
                                  <option value="5">Always</option>
                                </>
                              )}
                            </select>
                          </div>
                        </>
                      );
                    })}
                    <div className="">
                      <button
                        type="button"
                        className="form_btn btn-next w-1/2 ml-auto"
                      >
                        Next
                      </button>
                    </div>
                  </div>

                  <div className="form-step" style={{ marginTop: "7rem" }}>
                    {DoctorQuestionnaire[1].map((currElem) => {
                      return (
                        <>
                          <div className="input-group">
                            <div className="questions">
                              <span>Q.{currElem.id})</span> {currElem.question}
                            </div>
                            <select
                              name={`B-${currElem.id}`}
                              className="form-select mt-3"
                              aria-label="Default select example"
                              onChange={handleChange}
                              required
                            >
                              {currElem.id == 111 ? (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </>
                              ) : (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="1">Rarely</option>
                                  <option value="2">Sometimes</option>
                                  <option value="3">Frequently</option>
                                  <option value="4">Mostly</option>
                                  <option value="5">Always</option>
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
                      <button
                        type="button"
                        className="form_btn btn-next w-full ml-auto"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="form-step" style={{ marginTop: "7rem" }}>
                    {DoctorQuestionnaire[2].map((currElem) => {
                      return (
                        <>
                          <div className="input-group">
                            <div className="questions">
                              <span>Q.{currElem.id})</span> {currElem.question}
                            </div>
                            <select
                              name={`C-${currElem.id}`}
                              className="form-select mt-3"
                              aria-label="Default select example"
                              onChange={handleChange}
                              required
                            >
                              {currElem.id == 111 ? (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </>
                              ) : (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="1">Rarely</option>
                                  <option value="2">Sometimes</option>
                                  <option value="3">Frequently</option>
                                  <option value="4">Mostly</option>
                                  <option value="5">Always</option>
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
                      <button
                        type="button"
                        className="form_btn btn-next w-full ml-auto"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="form-step" style={{ marginTop: "7rem" }}>
                    {DoctorQuestionnaire[3].map((currElem) => {
                      return (
                        <>
                          <div className="input-group">
                            <div className="questions">
                              <span>Q.{currElem.id})</span> {currElem.question}
                            </div>
                            <select
                              name={`D-${currElem.id}`}
                              className="form-select mt-3"
                              aria-label="Default select example"
                              onChange={handleChange}
                              required
                            >
                              {currElem.id == 111 ? (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </>
                              ) : (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="1">Rarely</option>
                                  <option value="2">Sometimes</option>
                                  <option value="3">Frequently</option>
                                  <option value="4">Mostly</option>
                                  <option value="5">Always</option>
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
                      <button
                        type="button"
                        className="form_btn btn-next w-full ml-auto"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="form-step" style={{ marginTop: "7rem" }}>
                    {DoctorQuestionnaire[4].map((currElem) => {
                      return (
                        <>
                          <div className="input-group">
                            <div className="questions">
                              <span>Q.{currElem.id})</span> {currElem.question}
                            </div>
                            <select
                              name={`E-${currElem.id}`}
                              className="form-select mt-3"
                              aria-label="Default select example"
                              onChange={handleChange}
                              required
                            >
                              {currElem.id == 111 ? (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </>
                              ) : (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="1">Rarely</option>
                                  <option value="2">Sometimes</option>
                                  <option value="3">Frequently</option>
                                  <option value="4">Mostly</option>
                                  <option value="5">Always</option>
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
                      <button
                        type="button"
                        className="form_btn btn-next w-full ml-auto"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="form-step" style={{ marginTop: "7rem" }}>
                    {DoctorQuestionnaire[5].map((currElem) => {
                      return (
                        <>
                          <div className="input-group">
                            <div className="questions">
                              <span>Q.{currElem.id})</span> {currElem.question}
                            </div>
                            <select
                              name={`F-${currElem.id}`}
                              className="form-select mt-3"
                              aria-label="Default select example"
                              onChange={handleChange}
                              required
                            >
                              {currElem.id == 111 ? (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="0">No</option>
                                  <option value="1">Yes</option>
                                </>
                              ) : (
                                <>
                                  <option selected>select your Answer</option>
                                  <option value="1">Rarely</option>
                                  <option value="2">Sometimes</option>
                                  <option value="3">Frequently</option>
                                  <option value="4">Mostly</option>
                                  <option value="5">Always</option>
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
                      <button
                        type="button"
                        className="form_btn btn-next w-full ml-auto"
                      >
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
                      <button
                        type="submit"
                        className="form_btn"
                        onClick={submitFormData}
                      >
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
}

export default Test
