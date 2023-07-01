import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditBlogCard = (props) => {
  const { state, dispatch } = useContext(UserContex);
  const navigate = useNavigate();
  const deletePost = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/blogs?blogid=" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        toast.success("Post deleted successfully!");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setBlogId = (blogid, setEditContent) => {
    dispatch({ type: "EDIT_BLOG_ID", payload: blogid });
    setEditContent(blogid);
  };
  return (
    <>
      <div className="blog-card-container">
        <div className="blog-content">
          <h3 className="title">{props.title}</h3>
          <p className="author">Author: {props.author}</p>
        </div>
        <div className="btn-container">
          <button
            className="btn btn-outline-info"
            onClick={() => setBlogId(props.blogid, props.setEditContent)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => deletePost(props.blogid)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlogCard;
