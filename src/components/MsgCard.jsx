import React, { useState } from "react";
import "./css/style.css";
import "./css/style.min.css";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsPersonCircle } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";
import UserMsgCard from "../components/UserMsgCard";
const ManageMessages = (props) => {
  const [data, setdata] = useState(props.data);
  return (
    <>
      <div className="msg-container">
        <div className="user-info">
          <p className="name">
            <span>
              <BsPersonCircle />
            </span>
            {data.name}
          </p>
          <p className="email">
            <span>
              <MdEmail />
            </span>
            {data.email}
          </p>
          <p className="phone">
            <span>
              <BsFillTelephoneFill />
            </span>
            {data.phone}
          </p>
          <p className="phone">
            <span>
              <TbMessageCircle />
            </span>
            Messages
          </p>
        </div>
        <div className="user-msg">
          {data.messages.map((curr) => {
            console.log(curr);
            return <UserMsgCard msg={curr.message} email={curr.email}/>;
          })}
         
        </div>
      </div>
    </>
  );
};

export default ManageMessages;
