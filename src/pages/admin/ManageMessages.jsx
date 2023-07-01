import React,{useEffect,useState} from "react";
import "./css/style.css";
import "./css/style.min.css";
import MsgCard from "../../components/MsgCard"
const ManageMessages = () => {
    const [Messages, setMessages] = useState([])
    const getMessages = async () => {
      try {
          const res = await fetch("http://localhost:8000/getusermessages", {
              method: "GET",
              headers: {
                  "Content-Type":"application/json"
              }
          });
          const data = await res.json();
          console.log(data["data"]);
          setMessages(data["data"]);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        getMessages();
    }, []);
  return (
    <>
      <div className="msg-section">
       
              {
                  Messages.length > 0 ? Messages.map((curr) => {
                      return <MsgCard data={curr}/>;
                  }): null
              }
             
       
   
        
      </div>
    </>
  );
};

export default ManageMessages;
