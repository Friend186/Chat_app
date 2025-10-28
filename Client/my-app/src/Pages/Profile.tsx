import Header from "../component/Header";
import Footer from "../component/Footer";
import { useContext } from "react";
import {AuthContext} from "./App";
function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Header />
      <div className="h-[86vh] p-4">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        <h1>Your name is {user ? user.name : "no name"}</h1>
        <h1>Your Id is {user ? user._id : "no id"}</h1>
        <h1>Your eamil is {user ? user.email : "no email"}</h1>
        <h1>Pic {user ? user.profilePicture : "no profilepicture"}</h1>


      </div>
      <Footer />
    </div>
  );
}

export default Profile;
