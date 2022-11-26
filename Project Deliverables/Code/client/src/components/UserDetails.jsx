import React from "react";
import { UserAuth } from "../context/AuthContext";
import UserDetailsForm from "./UserDetailsForm";

const UserDetails = () => {
  const { userState, signUpDetailsState } = UserAuth();
  const [user, setUser] = userState;
  const [signUpDetails, setSignUpDetails] = signUpDetailsState;
  return (
    <div style={{ backgroundColor: "#001e3f"}}>
      <div style={{ marginTop: "56px" }}>
      {!user && (
        <h3 className="text-center" style={{marginTop: "50px", color: "white"}}>
          <i>Please fill the below details to continue signing up</i>
        </h3>
      )}
      <UserDetailsForm />
      </div>
    </div>
  );
};

export default UserDetails;
