import React, { useState, useRef } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Joi from "joi";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import jwtDecode from "jwt-decode";

const OtpAuth = () => {
  const { userState, otpState, signUpDetailsState } = UserAuth();

  const [user, setUser] = userState;
  const [otp, setOtp] = otpState;
  const [signUpDetails, setSignUpDetails] = signUpDetailsState;

  const [otpError, setOtpError] = useState();

  const confirmOtpRef = React.createRef();
  const navigate = useNavigate();
  const form = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const confirmOtp = confirmOtpRef.current.value;
    console.log(otp, confirmOtp);

    // VALIDATION
    const otpSchema = Joi.object({
      otp: Joi.number().required(),
    });
    const otpErr = otpSchema.validate({ otp: confirmOtp }).error;
    if (otpErr && otpErr.message) {
      return setOtpError("otp" + otpErr.message.slice(5));
    } else {
      setOtpError(null);
    }

    if (otp === Number(confirmOtp)) {
      await axios
        .post("http://localhost:8000/auth/sign-up", signUpDetails)
        .then((res) => {
          sessionStorage.setItem("token", res.data);
          console.log(res.data);
          setUser(jwtDecode(res.data));
          toast.success("Account has been created successfully", {
            duration: 6000,
          });
          navigate("/user-details");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Enter correct OTP");
      setOtpError("Enter correct OTP");
    }
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    setOtpError(null);
    document.getElementById("otpForm").reset();
    const resentOtp = Math.floor(Math.random() * 1000000 + 1);
    console.log(resentOtp);
    setOtp(resentOtp);
    document.getElementById("otp").value =
      "Your reset password OTP is " + resentOtp;
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
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <Form
        style={{ padding: "10px", borderRadius: "10px" }}
        ref={form}
        id="otpForm"
      >
        {/* <h3>OTP</h3> */}
        <Form.Control type="hidden" name="message" id="otp" />
        <p className="text-success">Otp has sent to {signUpDetails.email}</p>
        <Form.Control
          type="hidden"
          name="user_email"
          value={signUpDetails.email}
        />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            ref={confirmOtpRef}
          />
          {otpError && (
            <Form.Text className="text-danger">* {otpError}</Form.Text>
          )}
        </Form.Group>
        <Button
          variant="dark"
          type="submit"
          style={{ width: "300px" }}
          onClick={handleSignUp}
        >
          Submit
        </Button>
        <br />
        <span onClick={handleResendOtp}>
          <Link
            style={{
              textDecoration: "none",
              marginTop: "-10px",
              marginBottom: "10px",
            }}
          >
            Resend otp to {signUpDetails.email}?
          </Link>
        </span>
        <br />
        <span>
          <Link
            style={{
              textDecoration: "none",
              marginTop: "15px",
              marginBottom: "10px",
            }}
            to="/sign-up"
          >
            Change account?
          </Link>
        </span>
        <br />
      </Form>
    </div>
  );
};

export default OtpAuth;
