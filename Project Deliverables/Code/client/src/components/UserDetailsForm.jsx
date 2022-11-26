import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserDetailsForm = () => {
  const { userState, signUpDetailsState } = UserAuth();
  const [user, setUser] = userState;
  const [signUpDetails, setSignUpDetails] = signUpDetailsState;

  useEffect(() => {
    const fetchUser = () => {
      const userToken = sessionStorage.getItem("token");
      userToken ? setUser(jwtDecode(userToken)) : setUser(null);
    };
    fetchUser();
  }, []);

  const ageRef = React.createRef();
  const sexRef = React.createRef();
  const chestPainRef = React.createRef();
  const bpRef = React.createRef();
  const cholesterolRef = React.createRef();
  const fbsRef = React.createRef();
  const ekgRef = React.createRef();
  const maxHrRef = React.createRef();
  const exerciseAnginaRef = React.createRef();
  const stDepressionRef = React.createRef();
  const slopeOfStRef = React.createRef();
  const numberOfVesselsRef = React.createRef();
  const thalliumRef = React.createRef();

  const [ageError, setAgeError] = useState();
  const [sexError, setSexError] = useState();
  const [chestPainError, setChestPainError] = useState();
  const [bpError, setBpError] = useState();
  const [cholesterolError, setCholesterolError] = useState();
  const [fbsError, setFbsError] = useState();
  const [ekgError, setEkgError] = useState();
  const [maxHrError, setMaxHrError] = useState();
  const [exerciseAnginaError, setExerciseAnginaError] = useState();
  const [stDepressionError, setStDepressionError] = useState();
  const [slopeOfStError, setSlopeOfStError] = useState();
  const [numberOfVesselsError, setNumberOfVesselsError] = useState();
  const [thalliumError, setThalliumError] = useState();

  const [buttonName, setButtonName] = useState("Calculate result");
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUserDetails = async (e) => {
    e.preventDefault();
    const age = Number(ageRef.current.value);
    const sex = Number(sexRef.current.value);
    const chestPain = Number(chestPainRef.current.value);
    const bp = Number(bpRef.current.value);
    const cholesterol = Number(cholesterolRef.current.value);
    const fbs = Number(fbsRef.current.value);
    const ekg = Number(ekgRef.current.value);
    const maxHr = Number(maxHrRef.current.value);
    const exerciseAngina = Number(exerciseAnginaRef.current.value);
    const stDepression = Number(stDepressionRef.current.value);
    const slopeOfSt = Number(slopeOfStRef.current.value);
    const numberOfVessels = Number(numberOfVesselsRef.current.value);
    const thallium = Number(thalliumRef.current.value);

    // console.log(typeof sex);
    // console.log(stDepression);
    let error1 = 0;
    let error2 = 0;
    let error3 = 0;
    let error4 = 0;
    let error5 = 0;
    let error6 = 0;
    let error7 = 0;
    let error8 = 0;
    let error9 = 0;
    let error10 = 0;
    let error11 = 0;
    let error12 = 0;
    let error13 = 0;

    if (!age || age < 1) {
      setAgeError("Enter valid age");
      error1 = 1;
    } else {
      setAgeError(null);
      error1 = 0;
    }
    if (sex < 0 || sex > 1) {
      setSexError("Select 0 or 1");
      error2 = 1;
    } else {
      setSexError(null);
      error2 = 0;
    }
    if (chestPain < 1 || chestPain > 4) {
      setChestPainError("Value should be between 1 to 4");
      error3 = 1;
    } else {
      setChestPainError(null);
      error3 = 0;
    }
    if (!bp || bp < 94 || bp > 200) {
      setBpError("Value should be between 94 to 200");
      error4 = 1;
    } else {
      setBpError(null);
      error4 = 0;
    }
    if (!cholesterol || cholesterol < 100 || cholesterol > 600) {
      setCholesterolError("Value should be between 100 to 600");
      error5 = 1;
    } else {
      setCholesterolError(null);
      error5 = 0;
    }
    if (fbs < 0 || fbs > 1) {
      setFbsError("Value should be 0 or 1");
      error6 = 1;
    } else {
      setFbsError(null);
      error6 = 0;
    }
    if (ekg < 0 || ekg > 2) {
      setEkgError("Value should between 0 to 2");
      error7 = 1;
    } else {
      setEkgError(null);
      error7 = 0;
    }
    if (!maxHr || maxHr < 70 || maxHr > 250) {
      setMaxHrError("Value should be between 70 to 250");
      error8 = 1;
    } else {
      setMaxHrError(null);
      error8 = 0;
    }
    if (exerciseAngina < 0 || exerciseAngina > 1) {
      setExerciseAnginaError("Value should be 0 or 1");
      error9 = 1;
    } else {
      setExerciseAnginaError(null);
      error9 = 0;
    }
    if (stDepression < 0 || stDepression > 10) {
      setStDepressionError("Value should be between 0 to 10");
      error10 = 1;
    } else {
      setStDepressionError(null);
      error10 = 0;
    }
    if (slopeOfSt < 1 || slopeOfSt > 3) {
      setSlopeOfStError("Value should be between 1 to 3");
      error11 = 1;
    } else {
      setSlopeOfStError(null);
      error11 = 0;
    }
    if (numberOfVessels < 0 || numberOfVessels > 3) {
      setNumberOfVesselsError("Value should be between 1 to 3");
      error12 = 1;
    } else {
      setNumberOfVesselsError(null);
      error12 = 0;
    }
    if (thallium < 3 || thallium > 7) {
      setThalliumError("Value should be between 3 to 7");
      error13 = 1;
    } else {
      setThalliumError(null);
      error13 = 0;
    }
    if (
      !error1 &&
      !error2 &&
      !error3 &&
      !error4 &&
      !error5 &&
      !error6 &&
      !error7 &&
      !error8 &&
      !error9 &&
      !error10 &&
      !error11 &&
      !error12 &&
      !error13
    ) {
      console.log("hello");
      setButtonName("Your result is loading...");
      setLoading(true);
      const newUser = {
        ...signUpDetails,
        userDetails: {
          age,
          sex,
          chestPain,
          bp,
          cholesterol,
          fbs,
          ekg,
          maxHr,
          exerciseAngina,
          stDepression,
          slopeOfSt,
          numberOfVessels,
          thallium,
        },
      };
      console.log(newUser);
      if (!user) {
        await axios
          .post("http://localhost:8000/auth/sign-up", newUser)
          .then((res) => {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("justSignedUp", null);
            console.log(res.data);
            setUser(jwtDecode(res.data.token));
            toast(res.data.answer, {
              duration: 6000,
            });
            navigate("/");
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .post(`http://localhost:8000/user/add-user-details/${user._id}`, {
            age,
            sex,
            chestPain,
            bp,
            cholesterol,
            fbs,
            ekg,
            maxHr,
            exerciseAngina,
            stDepression,
            slopeOfSt,
            numberOfVessels,
            thallium,
          })
          .then((res) => {
            console.log(res.data);
            toast.success(res.data, {
              duration: "6000",
            });
            setButtonName("Add details");
            setLoading(false);
            // navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div>
      

      <div
        style={{
          // width: "90%",
          backgroundColor: "rgb(114,214,203)",
          
        }}
      ><div className="text-center">
      <h3 style={{color: "black",padding:"1%"}}>
        <i>User Details</i>
      </h3>
    </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "30px",
            color:"black", fontSize:"bold",
          }}
        >
          <div style={{ width: "300px", padding: "15px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                ref={ageRef}
              />
              {ageError && (
                <i className="text-info">* {ageError}</i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sex</Form.Label>
              <Form.Select aria-label="Default select example" ref={sexRef}>
                <option value="-1" hidden>
                  Select sex
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
              </Form.Select>
              {sexError && (
                <i className="text-info">* {sexError}</i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Chest Pain</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={chestPainRef}
              >
                <option value="-1" hidden>
                  Select chest pain
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Select>
              {chestPainError && (
                <i className="text-info">
                  * {chestPainError}
                </i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>BP</Form.Label>
              <Form.Control type="number" placeholder="Enter BP" ref={bpRef} />
              {bpError && (
                <i className="text-info">* {bpError}</i>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cholesterol</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cholesterol"
                ref={cholesterolRef}
              />
              {cholesterolError && (
                <i className="text-info">
                  * {cholesterolError}
                </i>
              )}
            </Form.Group>
          </div>

          <div style={{ width: "300px", padding: "15px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fbs</Form.Label>
              <Form.Select aria-label="Default select example" ref={fbsRef}>
                <option value="-1" hidden>
                  Select fbs
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
              </Form.Select>
              {fbsError && (
                <i className="text-info">* {fbsError}</i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ekg</Form.Label>
              <Form.Select aria-label="Default select example" ref={ekgRef}>
                <option value="-1" hidden>
                  Select ekg
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Select>
              {ekgError && (
                <i className="text-info">* {ekgError}</i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Max HR</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Max HR"
                ref={maxHrRef}
              />
              {maxHrError && (
                <i className="text-info">* {maxHrError}</i>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Exercise Angina</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={exerciseAnginaRef}
              >
                <option value="-1" hidden>
                  Select exercise angina
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
              </Form.Select>
              {exerciseAnginaError && (
                <i className="text-info">
                  * {exerciseAnginaError}
                </i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ST Depression</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ST depression"
                defaultValue={0}
                ref={stDepressionRef}
              />
              {stDepressionError && (
                <i className="text-info">
                  * {stDepressionError}
                </i>
              )}
            </Form.Group>
          </div>

          <div style={{ width: "300px", padding: "15px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Slope of ST</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={slopeOfStRef}
              >
                <option value="-1" hidden>
                  Select slope of ST
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
              {slopeOfStError && (
                <i className="text-info">
                  * {slopeOfStError}
                </i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Number of vessels fluro</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={numberOfVesselsRef}
              >
                <option value="-1" hidden>
                  Select number of vessels fluro
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
              {numberOfVesselsError && (
                <i className="text-info">
                  * {numberOfVesselsError}
                </i>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Thallium</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={thalliumRef}
              >
                <option value="-1" hidden>
                  Select thallium
                </option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </Form.Select>
              {thalliumError && (
                <i className="text-info">* {thalliumError}</i>
              )}
            </Form.Group>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="success"
            type="submit"
            style={{ width: "300px", marginBottom: "76px" }}
            onClick={handleUserDetails}
          >
            {buttonName}
            
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsForm;
