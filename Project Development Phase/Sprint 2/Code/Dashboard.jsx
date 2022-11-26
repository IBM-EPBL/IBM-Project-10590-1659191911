import React from "react";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { userState } = UserAuth();
  const [user, setUser] = userState;
  return (
    <div>
      {user && (
        <h4 style={{textAlign: "center",padding: "2%"}}>Dashboard</h4>
      )}
      <div>
        <iframe src="https://us1.ca.analytics.ibm.com/bi/?perspective=dashboard&amp;pathRef=.public_folders%2FWebApp%2FVPHD%2BDashboard&amp;closeWindowOnLastView=true&amp;ui_appbar=false&amp;ui_navbar=false&amp;shareMode=embedded&amp;action=view&amp;mode=dashboard&amp;subView=model0000018493a607df_00000002" width="100%" height="750" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen=""></iframe>
      </div>
      <h4 style={{textAlign: "center",padding: "2%"}}>Story</h4>
      <div>
        <iframe src="https://us1.ca.analytics.ibm.com/bi/?perspective=story&amp;pathRef=.public_folders%2FWebApp%2FStory&amp;closeWindowOnLastView=true&amp;ui_appbar=false&amp;ui_navbar=false&amp;shareMode=embedded&amp;action=view&amp;sceneId=model0000018494576d2e_00000002&amp;sceneTime=0" width="100%" height="750" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen=""></iframe>
      </div>
      </div>
  );
};

export default Dashboard;
