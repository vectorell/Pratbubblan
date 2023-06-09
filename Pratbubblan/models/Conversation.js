import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    chatId: Number,
    participantsId: [],
    creationDate: {type: Date, default: Date.now},
    lastActiveAt: {type: Date, default: Date.now},
    messageIds: [],
    isLocked: Boolean
})

const Conversation = mongoose.model('Conversation', ConversationSchema)

export default Conversation