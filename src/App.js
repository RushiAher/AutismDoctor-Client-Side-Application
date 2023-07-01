import React, { useReducer, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/patient/Home";
import Blogs from "./pages/patient/Blogs";
import Contact from "./pages/patient/Contact";
import Signin from "./pages/patient/Signin";
import Signup from "./pages/patient/Signup";
import LogoutDoctor from "./pages/doctor/LogoutDoctor";
import LogoutPatient from "./pages/patient/LogoutPatient";
import YourDoctor from "./pages/patient/YourDoctor";
import Menu from "./components/Menu";
import ErrorPage from "./pages/patient/ErrorPage";
import { createContext } from "react";
import { reducer } from "./utilities/UseReducer";
import ResultPage from "./pages/patient/ResultPage";
import TestHistoryPage from "./pages/patient/TestHistoryPage";
import NewAppointments from "./pages/doctor/NewAppointments";
import ScheduledAppointments from "./pages/doctor/ScheduledAppointments";
import AppointmentHistory from "./pages/doctor/AppointmentHistory";
import DeepTestResult from "./pages/doctor/DeepTestResult.jsx";
import Test from "./pages/doctor/Test.jsx";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminHome from "./pages/admin/AdminHome";
import ManageBlogs from "./pages/admin/ManageBlogs";
import ManageDoc from "./pages/admin/ManageDoc";
import ManageMessages from "./pages/admin/ManageMessages";

export const UserContex = createContext();

function App() {
  let initialState = {
    loggedin: false,
    patient: true,
    testid: null,
    testdata:null,
    currtestresult: null,
    testresult: null,
    doctor: false,
    result: false,
    testhistory: false,
    adminloggedin: false,
    currblogid: null,
    editblogid: null,
    editdocid: null,
    usermsg: null,
    deepTestResult:null
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);
  const checkToken = async () => {
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
      if (data["token"]) {
        dispatch({ type: "USER_LOGGEDIN", payload: true });
      } else {
        dispatch({ type: "USER_LOGGEDIN", payload: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
      <UserContex.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<Home />} />
            <Route path="/doctor" element={<YourDoctor />} />
            <Route path="/schemes" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logoutpatient" element={<LogoutPatient />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/testhistory" element={<TestHistoryPage />} />
            <Route path="/newappointments" element={<NewAppointments />} />
            <Route
              path="/scheduledappointments"
              element={<ScheduledAppointments />}
            />
            <Route
              path="/appointmenthistory"
              element={<AppointmentHistory />}
            />
            <Route path="/test" element={<Test />} />
            <Route path="/deeptestresult" element={<DeepTestResult />} />
            <Route path="/logoutdoctor" element={<LogoutDoctor />} />

            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route path="/dashboard" element={<AdminMenu />}>
            <Route index element={<AdminHome />} />
            <Route
              path="/dashboard/managemessages"
              element={<ManageMessages />}
            />
            <Route path="/dashboard/manageblogs" element={<ManageBlogs />} />
            <Route path="/dashboard/managedoc" element={<ManageDoc />} />
          </Route>
        </Routes>
      </UserContex.Provider>
    </>
  );
}

export default App;
