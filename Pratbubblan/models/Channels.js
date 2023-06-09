import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    channelName: String,
    isLocked: Boolean,
    participantsId: [],
    messages: [],
})

const Channel = mongoose.model('Channel', ChannelSchema)
export default Channel