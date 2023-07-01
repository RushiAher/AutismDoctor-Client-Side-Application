import React, { useContext, useState } from "react";
import "./css/style.css";
import "./css/style.min.css";
import { UserContex } from "../App";
import { useEffect } from "react";
const TestResultCard = () => {
  const [testData, setTestData] = useState();
  const { state, dispatch } = useContext(UserContex);

  const getTestResult = async () => {
    try {
      const res = await fetch("http://localhost:8000/gettestresult", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          testid: state.testid,
        }),
      });
      let data = await res.json();
      // console.log("testdat>>>" + JSON.stringify(data.testResult));
      // data =  JSON.stringify(data.testResult);
      // console.log(data.testResult);
      setTestData(data.testResult);
      console.log(testData[0]["patient_name"]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(state.testid);
    if (state.testid) {
      getTestResult();
    }  
  },[]);
  return (
    <>
      <div className="result-container">
        <h2>
          <center>Test Result</center>
        </h2>
        <p>
          <b>Test Id: </b>
          {state.testid}
        </p>
        <div className="patient-info">
          <h3>Patient's Information</h3>
          {/* <p>Name: {testData[0]["patient_name"]}</p>
          <p>Age: {testData[0]["patient_age"]} years</p>
          <p>DOB: {testData[0]["patient_dob"]}</p>
          <p>Gender: {testData[0]["patient_gender"]}</p> */}
        </div>
        <h3>patient's Response</h3>
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
              <tr>
                <th scope="row">1</th>
                <td>Child responding to you calling his/her name?</td>
                <td>No</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Ease of getting eye cotact from child?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Child pointing to objects he/she wants?</td>
                <td>No</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>
                  child pointing to draw your attention to his/her interests?
                </td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>
          <b>Result: Autistic</b>
        </h3>
        <p>Date:12-02-2023</p>
      </div>
    </>
  );
};

export default TestResultCard;
