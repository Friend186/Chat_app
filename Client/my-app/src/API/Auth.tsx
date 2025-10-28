import axios from "axios";

const BASE_URL = "http://localhost:5050/api/auth";

// Expected response type from backend
export interface SignResponse {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
}

// Signup
export const sendSignup = async (userData: { name: string; password: string; email: string }): Promise<SignResponse> => {
  try {
    const response = await axios.post<SignResponse>(
      `${BASE_URL}/signup`, // URL
      userData,             // ✅ send data here
      {
        withCredentials: true, // ✅ include cookies if backend sets them
      }
    );
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw new Error("Error sending signup data");
  }
};

export const sendSignin = async (userData: { password: string; email: string }): Promise<SignResponse> => {
    try {
      const response = await axios.post<SignResponse>(
        `${BASE_URL}/signin`, // URL
        userData,             // ✅ send data here
        {
          withCredentials: true, // ✅ include cookies if backend sets them
        }
      );
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Error sending signup data");
    }
  };
  interface SignoutResponse {
    message: string;
  }
  
  export const sendSignout = async (): Promise<SignoutResponse> => {
    try {
      const response = await axios.post<SignoutResponse>(`${BASE_URL}/logout`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error("Error logging out");
    }
  };