import React from "react";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Feedback from "./Feedback";
import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import Query from "./Query";
import jwtDecode from "jwt-decode";

const Home = () => {
  const { userState } = UserAuth();
  const [user, setUser] = userState;

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchUser = () => {
      const userToken = sessionStorage.getItem("token");
      userToken ? setUser(jwtDecode(userToken)) : setUser(null);
    };

    const fetchFeedbacks = async () => {
      await axios
        .get("http://localhost:8000/common/fetch-feedbacks")
        .then((res) => {
          console.log(res.data);
          setFeedbacks(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
    fetchFeedbacks();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "92vh",
        backgroundImage:
          "url('https://img.freepik.com/free-vector/hand-drawn-tropical-leaves-background_23-2148940416.jpg?w=2000')",
        objectFit: "cover",
      }}
    >
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/tiny-cardiology-doctor-nurse-examining-heart-blood-pressure-prescribing-treatment-medical-cardiovascular-checkup-flat-vector-illustration-anatomy-hospital-heart-diseases-health-care-concept_74855-20963.jpg'), radial-gradient( circle 400px at 6.8% 8.3%,  rgba(255,244,169,1) 0%, rgba(255,244,234,1) 100.2% )",

          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",

          backgroundPosition: "right",
          backgroundPositionX: "90%",

          padding: "20px",
          // backgroundImage:
          //   "",
        }}
      >
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif'",
            fontSize: "5rem",
            fontWeight: "",
            marginTop: "10rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif'",
              fontSize: "5.2rem",
              color: "red",
              letterSpacing: "1rem",
              fontWeight: "bolder",
            }}
          >
            Heart
            <br />
          </span>
          Disease Prediction <br />
        </h1>
      </div>
      <div
        style={{
          width: "90%",

          textAlign: "center",
          margin: "8rem",
          padding: "20px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          textAlign: "center",
          fontSize: "1.3rem",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          About US
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
          pariatur iure ad commodi facilis fugit quo sapiente autem provident
          quia, asperiores minima laudantium doloribus totam qui dolore
          exercitationem. Quod, eveniet?Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Nam praesentium maiores excepturi laudantium
          doloribus nesciunt, odit iusto obcaecati non. Tempore totam beatae
          placeat laboriosam veniam. Animi, non! Enim, accusantium odio!
        </p>
      </div>
      
      <hr />
      <div
        style={{
          width: "90%",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "5rem",
          marginBottom: "50px",
        }}
      >
        {" "}
        <h1
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            flex: "1",
            flexBasis: "90%",
          }}
        >
          {" "}
          Our Client Feedbacks
         
        </h1>
        <div style={{ display: "flex",width:"990px",height:"auto",alignItems: "center",justifyContent: "center"}}>
          {feedbacks.map((feedback) => (
            <div
              style={{
                marginLeft: "30px",
                marginTop: "10px",
                // border: "1px solid black",
                width: "300px",
              }}
            >
              <h6>{feedback.feedback}</h6>
              {[...Array(5)].map((_, idx) =>
                idx < feedback.rating ? (
                  <FaStar style={{ color: "orange", fontSize: "25px" }} />
                ) : (
                  <FaStar style={{ color: "black", fontSize: "25px" }} />
                )
              )}
              <h6>-{feedback.username}</h6>
            </div>
          ))}
        </div>
        <hr />
        <Feedback />
        <hr />
        <Query />
      </div>
    </div>
  );
};

export default Home;

