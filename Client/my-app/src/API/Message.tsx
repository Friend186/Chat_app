import axios from "axios";

const BASE_URL = "http://localhost:5050/api/message";

export interface Message {
  receiver: string;
  sender: string;
  text: string;
  image: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
}

// Fetch all users
export const fetchUser = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Fetching users failed:", error);
    throw new Error("Error fetching users");
  }
};

// Fetch messages with a specific receiver
export const fetchMessages = async (receiverId: string): Promise<Message[]> => {
  try {
    const response = await axios.get<Message[]>(`${BASE_URL}/${receiverId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Fetching messages failed:", error);
    throw new Error("Error fetching messages");
  }
};

// Send a message
export const sentMessage = async (messageData: Message): Promise<Message> => {
  try {
    const response = await axios.post<Message>(
      `${BASE_URL}/sent/${messageData.receiver}`,
      messageData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Sending message failed:", error);
    throw new Error("Error sending message");
  }
};
