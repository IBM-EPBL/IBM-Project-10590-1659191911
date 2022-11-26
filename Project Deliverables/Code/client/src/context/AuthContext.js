import { useContext, createContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [otp, setOtp] = useState();
  const [signUpDetails, setSignUpDetails] = useState({});
  const [userQueries, setUserQueries] = useState([]);

  const navigate = useNavigate();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);

    const userDetails = {
      email: res.user.email,
      username: res.user.displayName,
      accountMethod: "Google",
    };
    console.log(userDetails);
    await axios
      .post("http://localhost:8000/auth/sign-up", userDetails)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          sessionStorage.setItem("token", res.data);
          setUser(jwtDecode(res.data));
          toast.success(`Welcome ${jwtDecode(res.data).username}`);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        userState: [user, setUser],
        otpState: [otp, setOtp],
        signUpDetailsState: [signUpDetails, setSignUpDetails],
        userQueryState: [userQueries, setUserQueries],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
