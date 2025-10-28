import Header from "../component/Header";
import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSignin } from "../API/Auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./App";

function Signin() {
  const { setUser } = useContext(AuthContext); // get setUser from context
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mutation for signup
  const mutation = useMutation({
    mutationFn: sendSignin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      alert("Signup Successful!");
      // update context with new user data
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        profilePicture: data.profilePicture,
      });

      // navigate to profile
      navigate("/profile");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert("Signup failed. Please try again.");
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ✅ prevent page reload

    const userData = {  email, password };
    mutation.mutate(userData);
  };

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold underline mb-6 text-center">
        Signin Page
      </h1>

      <form
        onSubmit={handleSubmit} // ✅ submit handled by form instead of button click
        className="max-w-md mx-auto flex flex-col"
      >
        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          {mutation.isPending ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signin;
