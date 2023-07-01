import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDocCard = (props) => {
  const { state, dispatch } = useContext(UserContex);
  const navigate = useNavigate();
  const deleteDoc = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/registerdoc?docid=" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        toast.success("Doctor's info deleted successfully!");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setDocId = (docid, setEditContent) => {
    dispatch({ type: "EDIT_DOC_ID", payload: docid });
    setEditContent(docid);
  };
  return (
    <>
      <div className="blog-card-container">
        <div className="blog-content">
          <h3 className="title">{props.name}</h3>
          <p className="author">Degree: {props.degree}</p>
        </div>
        <div className="btn-container">
          <button
            className="btn btn-outline-info"
            onClick={() => setDocId(props.docid, props.setEditContent)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteDoc(props.docid)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditDocCard;
