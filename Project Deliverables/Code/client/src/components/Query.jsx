import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
const Query = () => {
  const { userState, userQueryState } = UserAuth();

  const [user, setUser] = userState;
  const [userQueries, setUserQueries] = userQueryState;
  const queryRef = React.createRef();

  const [queryError, setQueryError] = useState();

  const handleQuery = async (e) => {
    e.preventDefault();
    if (user === null) {
      return toast.error("Login to write a query", {
        style: {
          fontFamily: "NATS",
          fontSize: "18px",
        },
      });
    } else if (user && user.isAdmin) {
      return toast.error("Only users can write a query", {
        style: {
          fontFamily: "NATS",
          fontSize: "18px",
        },
      });
    } else if (queryRef.current.value.length < 10) {
      return setQueryError("Query should be atleast 10 characters");
    }

    const query = queryRef.current.value;
    console.log({
      userId: user._id,
      username: user.username,
      query: query,
      answer: null,
    });

    await axios
      .post("http://localhost:8000/common/add-query", {
        userId: user._id,
        username: user.username,
        query,
        answer: null,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Your query has been posted", {
          style: {
            fontFamily: "NATS",
            fontSize: "18px",
          },
        });
        setUserQueries([...userQueries, res.data]);
        // navigate("/user-profile")
        queryRef.current.value = "";
        setQueryError(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        width: "350px",
        height: "258px",
        backgroundImage:
          " linear-gradient( 359.5deg,  rgba(17,255,189,1) 5.7%, rgba(151,253,225,1) 83.2% )",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        textAlign: "center",
      }}
    >
      <h6>Any queries?</h6>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* <Form.Label>Feedback</Form.Label> */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} ref={queryRef} />
          </Form.Group>
        </Form.Group>
        {queryError && (
          <>
            <Form.Text className="text-danger">* {queryError}</Form.Text>
            {/* <br />
          <br /> */}
          </>
        )}
        <Button
          variant="dark"
          type="submit"
          style={{ width: "300px" }}
          onClick={handleQuery}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Query;
