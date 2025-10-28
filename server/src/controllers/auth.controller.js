import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
    });
  }catch (error) {
    console.error("Error in creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
};
export const signin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if(!userExists){
            return res.status(400).json({message: "User does not exist"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }
        generateToken(res, userExists._id);
        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            profilePicture: userExists.profilePicture,
        });
    }
    catch{
        return res.status(500).json({message: "Internal Server Error"});
    }
    
};
export const logout =  async (req, res) => {
    try{
        res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        });
        res.status(200).json({message: "Logged out successfully"});

    }
    catch{
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export const updateprofile = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const userId = req.user._id;
      const { name, profilePicture } = req.body;
  
      if (!profilePicture) {
        return res.status(400).json({ message: "Profile picture is required" });
      }
  
      const uploadedImage = await cloudinary.v2.uploader.upload(profilePicture);
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, profilePicture: uploadedImage.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };