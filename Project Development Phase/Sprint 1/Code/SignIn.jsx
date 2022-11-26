import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Joi from "joi";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";
import loginBg from "../assets/loginBg.jpg"

const SignIn = () => {
  const { userState, googleSignIn } = UserAuth();

  const [user, setUser] = userState;

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const signInEmailRef = React.createRef();
  const signInPasswordRef = React.createRef();

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = signInEmailRef.current.value;
    const password = signInPasswordRef.current.value;
    console.log({ email, password });

    // VALIDATION
    const emailSchema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
    });
    const passwordSchema = Joi.object({
      password: Joi.string().min(8).max(20).required(),
    });

    const emailErr = emailSchema.validate({ email }).error;
    const passwordErr = passwordSchema.validate({ password }).error;

    if (emailErr && emailErr.message) {
      setEmailError("email" + emailErr.message.slice(7));
    } else {
      setEmailError(null);
    }
    if (passwordErr && passwordErr.message) {
      setPasswordError("password" + passwordErr.message.slice(10));
    } else {
      setPasswordError(null);
    }

    if (!emailErr && !passwordErr) {
      await axios
        .post("http://localhost:8000/auth/sign-in", { email, password })
        .then((res) => {
          sessionStorage.setItem("token", res.data);
          console.log(res.data);
          setUser(jwtDecode(res.data));
          toast.success(`Welcome ${jwtDecode(res.data).username}`);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data === "Invalid Password") {
            setPasswordError(err.response.data);
          } else {
            setEmailError(err.response.data);
          }
        });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style ={{backgroundImage: `url(${loginBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh'}}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        
      }}
    >
      <div style={{ width: "400px",
        marginTop: "7%",
        backgroundColor:"rgb(114,214,203)",
        padding: "4%"}}>
        <h3 style={{textAlign: "center"}}>Sign In</h3>
        <br/>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={signInEmailRef}
              defaultValue={"test@gmail.com"}
              style = {{backgroundColor:"whitesmoke"}}
            />
            {emailError && (
              <Form.Text className="text-danger">* {emailError}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={signInPasswordRef}
              defaultValue={"12345678"}
              style = {{backgroundColor:"whitesmoke"}}
            />
            {passwordError && (
              <Form.Text className="text-danger">* {passwordError}</Form.Text>
            )}
          </Form.Group>
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
              float: "right",
              marginTop: "-8px",
              marginBottom: "10px",
              color:"rgb(0, 0, 255)"
            }}
          >
            Forgot password?
          </Link>
          <Button
            type="submit"
            style={{ width: "300px",backgroundColor:"rgb(63,59,62)",border:"none"}}
            onClick={handleSignIn}
          >
            Submit
          </Button>
          <br />

          <h6 className="text-center">or</h6>
        </Form>
        <GoogleButton
          onClick={handleGoogleSignIn}
          style={{ width: "300px" }}
        />
        <br />
        <p className="text-center">
          <Link
            to="/sign-up"
            style={{
              textDecoration: "none",
              marginTop: "-10px",
              marginBottom: "10px",
              color:"rgb(0, 0, 255)"
            }}
          >
            Doesn't have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
