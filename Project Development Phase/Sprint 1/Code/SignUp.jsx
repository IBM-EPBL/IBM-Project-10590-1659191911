import React, { useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import Joi from "joi";
import toast from "react-hot-toast";
import axios from "axios";
import signupBg from "../assets/signupBg.jpg"

const SignUp = () => {
  const { otpState, signUpDetailsState } = UserAuth();

  const [otp, setOtp] = otpState;
  const [signUpDetails, setSignUpDetails] = signUpDetailsState;

  const [usernameError, setUsernameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const signUpUsernameRef = React.createRef();
  const signUpEmailRef = React.createRef();
  const signUpPasswordRef = React.createRef();

  const form = useRef();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const username = signUpUsernameRef.current.value;
    const email = signUpEmailRef.current.value;
    const password = signUpPasswordRef.current.value;
    setSignUpDetails({ username, email, password });
    console.log({ username, email, password });

    // VALIDATION
    const usernameSchema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
    });
    const emailSchema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
    });
    const passwordSchema = Joi.object({
      password: Joi.string().min(8).max(20).required(),
    });
    const usernameErr = usernameSchema.validate({ username }).error;
    const emailErr = emailSchema.validate({ email }).error;
    const passwordErr = passwordSchema.validate({ password }).error;

    if (usernameErr && usernameErr.message) {
      setUsernameError("username" + usernameErr.message.slice(10));
    } else {
      setUsernameError(null);
    }
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

    if (!usernameErr && !emailErr && !passwordErr) {
      const res = await axios.get(
        `http://localhost:8000/auth/auth-user/${email}`
      );
      if (res.data === "Continue") {
        return setEmailError("Email already exist");
        // return console.log(res.data + "Enter another account");
      }
      const localOtp = Math.floor(Math.random() * 1000000 + 1);
      setOtp(localOtp);
      console.log(localOtp);
      document.getElementById("otp").value =
        "Your email confirmation OTP is " + localOtp;
      emailjs
        .sendForm(
          "service_o0h67jj",
          "template_fldwtll",
          form.current,
          "A-XUgIf_QWxYJpLpm"
        )
        .then(
          (result) => {
            console.log(result.text);
            navigate("/otp-auth");
            // toast.success("Otp has sent to our email", {
            //   duration: 6000,
            // });
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div style = {{backgroundImage: `url(${signupBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh'}}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{  width: "400px",
        marginTop: "7%",
        backgroundColor:"rgb(114,214,203)",
        padding: "4%" }}>
        <h3 style={{textAlign:"center"}}>Sign Up</h3>
        <br/>
        <Form ref={form}>
          <Form.Control type="hidden" name="message" id="otp" />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              ref={signUpUsernameRef}
              name="username"
              style = {{backgroundColor:"whitesmoke"}}
            />
            {usernameError && (
              <Form.Text className="text-danger">* {usernameError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={signUpEmailRef}
              name="user_email"
              style = {{backgroundColor:"whitesmoke"}}
            />
            {emailError && (
              <Form.Text className="text-danger">* {emailError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={signUpPasswordRef}
              style = {{backgroundColor:"whitesmoke"}}
            />
            {passwordError && (
              <Form.Text className="text-danger">* {passwordError}</Form.Text>
            )}
          </Form.Group>
          <Button
            variant="dark"
            type="submit"
            style={{ width: "300px",backgroundColor:"rgb(63,59,62)" }}
            onClick={handleSignUp}
          >
            Submit
          </Button>
          <br />
        </Form>
        <br />

        <p className="text-center">
          <Link
            to="/sign-in"
            style={{
              textDecoration: "none",
              marginTop: "-10px",
              marginBottom: "10px",
            }}
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
