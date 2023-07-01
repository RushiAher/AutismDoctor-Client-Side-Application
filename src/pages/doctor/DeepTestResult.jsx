import React, { useEffect, useContext, useState } from "react";
import { UserContex } from "../../App";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const DeepTestResult = () => {
      const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContex);
  return (
    <>
      <div className="w-full flex justify-center items-center min-h-[90vh]">
        <div className="bg-white w-[35%] p-4 shadow rounded-lg">
          <p className="text-2xl font-semibold text-zinc-500 text-center mb-4">
            Test Result
          </p>
          <p className="text-xl text-black font-normal my-2">
            {state.deepTestResult
              ? `Autism Score: ${state.deepTestResult.totalScore} out of 200`
              : null}
          </p>
          <p className="text-xl text-black font-normal my-2">
            {state.deepTestResult
              ? `Autism Percentage: ${state.deepTestResult.autismPercentage}`
              : null}
          </p>
          <p className="text-xl text-black font-normal my-2">
            {state.deepTestResult
              ? `Autism Stage: ${state.deepTestResult.autismStage} `
              : null}
          </p>
          <div className="flex w-full justify-end">
            <button
              type="button"
              class="text-white bg-cyan-600 mt-5 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              onClick={() => navigate("/scheduledappointments")}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeepTestResult;
