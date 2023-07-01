import React, { useState, useEffect, useContext } from "react";
import "../patient/css/style.css";
import "../patient/css/style.min.css";
import { useNavigation, useNavigate } from "react-router-dom";
import EditBlogCard from "../../components/EditBlogCard";
import { UserContex } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageBlogs = () => {
  const [newBlog, setNewBlog] = useState({});
  const [allBlogs, setAllBlogs] = useState([]);
  const { state, dispatch } = useContext(UserContex);
  const navigate = useNavigate();
  const togglePanel = () => {
    let leftPanel1 = document.getElementsByClassName("left-panel-1");
    let leftPanel2 = document.getElementsByClassName("left-panel-2");

    leftPanel1[0].classList.toggle("active");
    leftPanel2[0].classList.toggle("active");
  };

  const postBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8000/blogs?blogid=" + state.editblogid,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newBlog.title,
            content: newBlog.content,
            author: newBlog.author,
            imgurl: newBlog.imgurl,
          }),
        }
      );
      const data = await res.json();
      if (res.status == 201) {
        toast.success("Blog posted successfully!");
        dispatch({ type: "EDIT_BLOG_ID", payload: null });
        setNewBlog({});
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error("Blog not posted! Please try again.");
      console.log(error);
    }
  };

  const getAllBlogs = async () => {
    try {
      const res = await fetch("http://localhost:8000/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200 || data) {
        setAllBlogs(data["data"]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewBlog({ ...newBlog, [name]: value });
  };
  const setEditContent = async (blogid) => {
    if (blogid) {
      try {
        const res = await fetch(
          "http://localhost:8000/blogs?blogid=" + blogid,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.status == 200 || data) {
          setNewBlog({ ...data["data"][0], imgurl: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
     
      <section className="blog-section">
        <div className="left-panel-1 ">
          <h3>Open Blogs</h3>
          <a href="#" onClick={togglePanel}>
            &#9776;
          </a>
        </div>
        <div className="left-panel-2 active">
          <div className="left-panel-heading">
            <h3>Posted Blogs</h3>
            <a href="#" className="close-btn" onClick={togglePanel}>
              &times;
            </a>
          </div>
          <div className="left-panel-content">
            {allBlogs.length > 0 ? (
              allBlogs
                .slice(0)
                .reverse()
                .map((curr) => {
                  return (
                    <EditBlogCard
                      title={curr.title}
                      author={curr.author}
                      content={curr.content}
                      imgurl={curr.imgurl}
                      blogid={curr._id}
                      setEditContent={setEditContent}
                    />
                  );
                })
            ) : (
              <>
                <h5>You haven't posted any blog yet!</h5>
              </>
            )}
          </div>
        </div>
        <div className="content-panel">
          <div class="container">
            <form onSubmit={postBlog} method="POST">
              <h3>Start Posting New Blog on Autism or You can Edit Old One!</h3>
              <label for="title">Post Title</label>
              <input
                type="text"
                id="fname"
                name="title"
                onChange={onInput}
                value={newBlog.title}
                placeholder="write title for post"
                required
              />

              <label for="content">Content</label>
              <textarea
                id="content"
                name="content"
                onChange={onInput}
                value={newBlog.content}
                placeholder="write post content here"
                required
              ></textarea>

              <label for="author">Author</label>
              <input
                type="text"
                id="lname"
                name="author"
                onChange={onInput}
                value={newBlog.author}
                placeholder="write author name"
                required
              />

              <p>add suitable image for post</p>
              <input
                type="file"
                name="imgurl"
                onChange={onInput}
                value={newBlog.imgurl}
                required
              />

              <button type="submit" class="btn btn-outline-secondary">
                post
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageBlogs;
