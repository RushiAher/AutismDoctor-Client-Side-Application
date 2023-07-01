import React, { useContext, useState, useEffect } from "react";
import BlogCardMin from "../../components/BlogCardMin";
import BlogCard from "../../components/BlogCard";
import { UserContex } from "../../App";
import { ngoData } from "../../utilities/NgosData"
import SchemeCard from "../../components/SchemeCard"
const Blogs = () => {
  const { state, dispatch } = useContext(UserContex);
  const [allBlogs, setAllBlogs] = useState([]);
  const togglePanel = () => {
    let leftPanel1 = document.getElementsByClassName("left-panel-1");
    let leftPanel2 = document.getElementsByClassName("left-panel-2");
    leftPanel1[0].classList.toggle("active");
    leftPanel2[0].classList.toggle("active");
  };
  // const getAllBlogs = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/blogs", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     if (res.status == 200 || data) {
  //       setAllBlogs(data["data"]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 xl:gap-8 p-4 gap-4">
        {ngoData.map((curr, ind) => {
          return <SchemeCard data={curr} />;
        })}
      </div>
      {/* <section className="blog-section">
        <div className="left-panel-1 ">
          <h3>Open Blogs</h3>
          <a href="#" onClick={togglePanel}>
            &#9776;
          </a>
        </div>
        <div className="left-panel-2 active">
          <div className="left-panel-heading">
            <h3>All Blogs</h3>
            <a href="#" className="close-btn" onClick={togglePanel}>
              &times;
            </a>
          </div>
          <div className="left-panel-content">
            {allBlogs.length > 0 ? (
              allBlogs.slice(0).reverse().map((curr) => {
                return (
                  <BlogCardMin
                    title={curr.title}
                    author={curr.author}
                    blogid={curr._id}
                  />
                );
              })
            ) : (
              <>
                <h5>No blogs are available to read!</h5>
              </>
            )}
          </div>
        </div>
        <div className="content-panel">
          <BlogCard blogid={state.currblogid} />
        </div>
      </section> */}
    </>
  );
};

export default Blogs;
