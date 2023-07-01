import React,{useState,useEffect,useContext} from 'react'
import {UserContex} from "../App"
const BlogCard = () => {
    const [blogData, setBlogData] = useState();
    const {state, dispatch} = useContext(UserContex)
  const getBlogData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/blogs?blogid=" + state.currblogid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status == 200 || data) {
        setBlogData(data["data"][0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (state.currblogid) {
      console.log(state.currblogid);
      getBlogData();
    }
  }, [state.currblogid]);
  return (
    <>
      {blogData ? (
        <div className="blog-main-card">
          <h3 className="title">{blogData.title}</h3>
          <img
            src={"images/blog-img-1.jpg"}
            alt="blog-img-1"
            className="blog-img"
          />
          <div className="blog-content">
            <p className="author">
              Author - <b> {blogData.author}</b>
            </p>
            <p className="content">{blogData.content}</p>
            <p className="post-date">Posted on - 12/5/2022</p>
          </div>
        </div>
      ) : (
        <>
          <h5>Please select blog to read</h5>
        </>
      )}
    </>
  );
};

export default BlogCard
