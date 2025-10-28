import { AuthContext } from "../Pages/App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSignout } from "../API/Auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function Header() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user,setUser } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: sendSignout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signout"] });
  
      alert("Signout Successful!");
      setUser(null); // Clear user from context
      // Navigate to the home page
      navigate("/");
    },
    onError: (error) => {
      console.error("Error signing out:", error);
      alert("Signout failed. Please try again.");
    },
  });
  
  const isLogoutDisabled = !user; // Disable if id is an empty string or undefined
  
  return (
    <div>
      <div className="flex h-[5vh] bg-blue-500 items-center justify-between px-4">
        <h2 className="font-bold text-1xl text-white" onClick={() => navigate("/")}>
          Chat App
        </h2>
        <div className="flex space-x-4 ml-auto font-bold">
          <h2>{user?.name}</h2>
          <button
            onClick={() => mutation.mutate()}
            disabled={isLogoutDisabled} // Disable button if id is empty
            className={`${
              isLogoutDisabled ? "text-gray-400 cursor-not-allowed" : "text-white"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;