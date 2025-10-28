import React, { useState, createContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Signin';
import Signup from './Signup';
import Home from './Home';
import Mainlayout from './Mainlayout';
import Setting from './Setting';
import Profile from './Profile';

// Define the shape of the User type
export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
}

// Create the AuthContext
export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export default function App() {
  // Define the user state
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainlayout" element={<Mainlayout />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </AuthContext.Provider>
  );
}