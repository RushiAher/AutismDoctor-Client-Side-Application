import React,{useContext} from 'react'
import {UserContex} from "../App"
const BlogCardMin = (props) => {
  const { state, dispatch } = useContext(UserContex);
  const setBlogId = (blogid) => {
    
    dispatch({ type: "CURR_BLOG_ID", payload: blogid })
    // console.log(state.currblogid);
  }
    return (
      <>
        <div className="blog-card-container">
          <div className="blog-content" onClick={()=>setBlogId(props.blogid)}>
            <h3 className="title">{props.title}</h3>
            <p className="author">Author: {props.author}</p>
          </div>
        </div>
      </>
    );
}

export default BlogCardMin
