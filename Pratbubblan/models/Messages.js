import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    // msgId: String,
    senderId: String,
    senderName: String,
    recieverId: String,
    recieverName: String,
    msgBody: String,
    sentAt: { type: Date, default: Date.now() }
})

const Message = mongoose.model('Message', MessageSchema)
export default Message