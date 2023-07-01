import React, { useEffect, useState } from "react";
import TestHistoryCard from "../../components/TestHistoryCard";
import DoctorCardMin from "../../components/DoctorCardMin";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TestHistoryPage = () => {
  const navigate = useNavigate();
  const [testHistoryRes, setTestHistoryRes] = useState([]);
  const [DoctorsData, setDoctorsData] = useState([]);
  const getDoctorsData = async () => {
    try {
      const res = await fetch("http://localhost:8000/getdoctordata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      setDoctorsData(data["data"]);
      // console.log(state.testid);
    } catch (error) {
      console.log(error);
    }
  };
  const getTestHistory = async () => {
    try {
      const res = await fetch("http://localhost:8000/gettesthistory", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setTestHistoryRes(data["testHistory"]);
      //   console.log(data["testHistory"]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTestHistory();
    getDoctorsData();
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
      <div className="history-section w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 p-8 place-content-evenly w-full md:w-2/3">
          {testHistoryRes.length > 0 ? (
            testHistoryRes
              .slice(0)
              .reverse()
              .map((curr, ind) => {

                return <TestHistoryCard data={curr} />;
              })
          ) : (
            <div className="card_container  col-span-2 p-2 md:p-4">
              <div className="test_card">
                No test history available!
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
          )}
        </div>
        <div className="right-section w-1/3">
          <h2>Visit Autism Specialist</h2>
          <div className="doc-sec">
            {DoctorsData.map((curr) => {
              return (
                <DoctorCardMin
                  name={curr.name}
                  phone={curr.phone}
                  address={curr.address}
                  degree={curr.degree}
                  experiance={curr.experiance}
                  docid={curr._id}
                  data={
                    testHistoryRes
                      ? testHistoryRes[testHistoryRes.length - 1]
                      : null
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestHistoryPage;
