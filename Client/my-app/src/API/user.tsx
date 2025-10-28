import axios from "axios";
const BASE_URL = "http://localhost:5050/api/message";

export const fetchUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
        withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Fetching users failed:", error);
        throw new Error("Error fetching users");
    }
}