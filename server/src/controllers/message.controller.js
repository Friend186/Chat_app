import User from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getMessages =async (req, res) => {
    try{
        const {id} = req.params;
        const sender = req.user._id;
        const message = await Message.find({
            $or: [
                {sender: sender, reciever: id},
                {sender: id, reciever: sender}
            ]
        }).sort({createdAt: 1});
        res.status(200).json(message);

    }
    catch{
        res.status(500).json({message: "Internal Server Error"});
    }
};
export const  getUsers = async (req, res) => {
    try{
        const userid = req.user._id;
        //fetch all except me
        const filter = await User.find({_id: {$ne: userid}}).select("-password");
        res.status(200).json(filter);
    }
    catch(error){
        console.error("Error in fetching users:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};
export const sentMessage = async (req, res) => {
    try{
        const {id} = req.params;
        const sender = req.user._id;
        const {text, image} = req.body;
        const newMessage = new Message({
            reciever: id,
            sender: sender,
            text: text,
            image: image
        });
        if(image){
            const uploadedImage = await cloudinary.v2.uploader.upload(profilePicture);
            newMessage.image = uploadedImage.secure_url;
        }
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch{

    }
};
