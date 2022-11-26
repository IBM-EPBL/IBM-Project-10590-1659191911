import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import axios from "axios";
import Joi from "joi";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const signUpEmailRef = React.createRef();
  const resetOtpRef = React.createRef();
  const newPasswordRef = React.createRef();
  const confirmNewPasswordRef = React.createRef();

  const [activeForm, setActiveForm] = useState("form1");
  const [email, setEmail] = useState();
  const [localOtp, setLocalOtp] = useState();
  const [emailError, setEmailError] = useState();
  const [otpError, setOtpError] = useState();
  const [newPasswordError, setNewPasswordError] = useState();
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState();

  const form = useRef();

  const navigate = useNavigate();

  const handleSendResetPasswordOtp = async (e) => {
    e.preventDefault();
    const userEmail = signUpEmailRef.current.value;
    console.log(userEmail);

    // VALIDATION
    const emailSchema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
    });
    const emailErr = emailSchema.validate({ email: userEmail }).error;
    console.log(emailErr);
    if (emailErr && emailErr.message) {
      setEmailError("email" + emailErr.message.slice(7));
    } else {
      setEmailError(null);
      const res = await axios.get(
        `http://localhost:8000/auth/auth-user/${userEmail}`
      );
      if (res.data === "No user found") {
        setEmailError("No user found");
        return console.log(res.data + "Enter another account");
      }
      setEmail(userEmail);
      const otp = Math.floor(Math.random() * 1000000 + 1);
      setLocalOtp(otp);
      document.getElementById("otp").value =
        "Your reset password OTP is " + otp;
      console.log(otp);
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
            setActiveForm("form2");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const handleAuthOtp = (e) => {
    e.preventDefault();
    const confirmOtp = resetOtpRef.current.value;
    console.log(localOtp, confirmOtp);

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

    if (localOtp === Number(confirmOtp)) {
      setActiveForm("form3");
    } else {
      console.log("Enter correct OTP");
      setOtpError("Enter correct OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const confirmNewPassword = confirmNewPasswordRef.current.value;

    //VALIDATION
    const passwordSchema = Joi.object({
      password: Joi.string().min(8).max(20).required(),
    });
    const newPasswordErr = passwordSchema.validate({
      password: newPassword,
    }).error;
    const confirmNewPasswordErr = passwordSchema.validate({
      password: confirmNewPassword,
    }).error;

    // console.log(newPasswordErr.message, confirmNewPasswordErr.message);
    if (newPasswordErr && newPasswordErr.message) {
      setNewPasswordError("password" + newPasswordErr.message.slice(10));
    } else {
      setNewPasswordError(null);
    }
    if (confirmNewPasswordErr && confirmNewPasswordErr.message) {
      return setConfirmNewPasswordError(
        "password" + confirmNewPasswordErr.message.slice(10)
      );
    } else {
      setConfirmNewPasswordError(null);
    }
    console.log(!newPasswordErr &&
      !confirmNewPasswordErr &&
      newPassword === confirmNewPassword);

    if (
      !newPasswordErr &&
      !confirmNewPasswordErr &&
      newPassword === confirmNewPassword
    ) {
      const updatedUserDetails = {
        email,
        password: newPassword,
      };
      await axios
        .post("http://localhost:8000/auth/reset-password", updatedUserDetails)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            toast.success(res.data);
            navigate("/sign-in");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Enter correct password");
      setConfirmNewPasswordError("Enter correct password");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      {activeForm === "form1" && (
        <div style={{ width: "300px" }}>
          <h3>Reset Password</h3>
          <Form ref={form}>
            <Form.Control type="hidden" name="message" id="otp" />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email to send otp"
                ref={signUpEmailRef}
                name="user_email"
              />
              {emailError && (
                <Form.Text className="text-danger">* {emailError}</Form.Text>
              )}
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              style={{ width: "300px" }}
              onClick={handleSendResetPasswordOtp}
            >
              Send Otp
            </Button>
          </Form>
        </div>
      )}
      {activeForm === "form2" && (
        <div style={{ width: "300px" }}>
          <h3>OTP</h3>
          <Form ref={form} id="otpForm">
            <Form.Control type="hidden" name="message" id="otp" />
            <Form.Control
              type="hidden"
              name="user_email"
              ref={signUpEmailRef}
              value={email}
            />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Enter Otp that have been sent to your mail
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Otp"
                ref={resetOtpRef}
              />
              {otpError && (
                <Form.Text className="text-danger">* {otpError}</Form.Text>
              )}
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              style={{ width: "300px" }}
              onClick={handleAuthOtp}
            >
              Confirm
            </Button>
            <span
              onClick={() => {
                handleSendResetPasswordOtp();
                resetOtpRef.current.value = "";
                setOtpError(null);
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  marginTop: "-10px",
                  marginBottom: "10px",
                }}
              >
                Resend otp to {email}?
              </Link>
            </span>
            <br />
            <span
              onClick={() => {
                setActiveForm("form1");
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  marginTop: "15px",
                  marginBottom: "10px",
                }}
                to="/forgot-password"
              >
                Change account?
              </Link>
            </span>
          </Form>
        </div>
      )}
      {activeForm === "form3" && (
        <div style={{ width: "300px" }}>
          <h3>Reset Password</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={newPasswordRef}
              />
              {newPasswordError && (
                <Form.Text className="text-danger">
                  * {newPasswordError}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the password again"
                ref={confirmNewPasswordRef}
              />
              {confirmNewPasswordError && (
                <Form.Text className="text-danger">
                  * {confirmNewPasswordError}
                </Form.Text>
              )}
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              style={{ width: "300px" }}
              onClick={handleResetPassword}
            >
              Confirm
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
