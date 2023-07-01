import React,{useContext} from "react";
import { UserContex } from "../App";
const TestHistoryCard =   (props) => {
      const { state, dispatch } = useContext(UserContex);
 
    const setResult = (data) => {
        console.log("test history card "+data);
       dispatch({ type: "CURR_TEST_RESULT", payload: data });
   }
  return (
    <>
      <div className="test-history-container px-4 py-2">
        <div className="info">
          <p>
            <b>Test Id: </b>
            {props.data ? props.data.testid : null}
          </p>
          <p>
            <b>Test Result: </b>
            {props.data ? props.data.result : null}
          </p>
          <p>
            <b>Test Date: </b>
            {props.data ? new Date(props.data.date).toLocaleDateString() : null}
          </p>
        </div>
        <button
          type="button"
          className="p-2 bg-[#17a2b8] rounded-md"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => setResult(props.data)}
        >
          View Details
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
                <h5 className="modal-title" id="exampleModalLongTitle">
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
                  <h2 className="text-[1.5rem] mb-3 md:text-[2rem] font-semibold text-zinc-500">
                    <center>Test Result</center>
                  </h2>
                  <p>
                    <b>Test Id: </b>
                    {state.currtestresult ? state.currtestresult.testid : null}
                  </p>
                  <h3>Patient's Information</h3>
                  <div className="patient-info">
                    <p>
                      {state.currtestresult
                        ? `Name: ${state.currtestresult["patient_name"]}`
                        : null}
                    </p>
                    <p>
                      {state.currtestresult
                        ? `Age: ${state.currtestresult["patient_age"]}`
                        : null}
                      years
                    </p>
                    <p>
                      {state.currtestresult
                        ? `DOB: ${state.currtestresult["patient_dob"]}`
                        : null}
                    </p>
                    <p>
                      {state.currtestresult
                        ? `Gender: ${state.currtestresult["patient_gender"]}`
                        : null}
                    </p>
                    <p>
                      {state.currtestresult
                        ? `Contact No.: ${state.currtestresult["patient_contact"]}`
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
                        {state.currtestresult ? (
                          <>
                            {state.currtestresult["questions"].map(
                              (curr, index) => {
                                return (
                                  <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{curr.question}</td>
                                    <td>
                                      {curr.answer == 1
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
                    {state.currtestresult
                      ? `Autism Score: ${state.currtestresult["autismScore"]}`
                      : null}{" "}
                    out of 50
                  </p>
                  {/* <p className="text-xl font-normal my-2">
                    Autism Percentage:
                    {state.currtestresult
                      ? state.currtestresult["autismPercentage"]
                      : null}
                  </p>
                  <p className="text-xl font-normal my-2 ">
                    Autism Stage:
                    {state.currtestresult
                      ? state.currtestresult["autismStage"]
                      : null}
                  </p> */}
                  <p className="text-xl  font-normal my-2">
                    {state.currtestresult
                      ? ` Result: ${state.currtestresult["result"]}`
                      : null}
                  </p>
                  <p className="mt-2 relative text-end">
                    Date:
                    {state.currtestresult
                      ? state.currtestresult["date"].slice(0, 10)
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
  );
};

export default TestHistoryCard;
