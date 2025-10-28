import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    }, {timestamps: true}
);
const Message = mongoose.model("Message", messageSchema);
export default Message;