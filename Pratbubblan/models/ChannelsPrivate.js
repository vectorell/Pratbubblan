import mongoose from "mongoose";

const PrivateChannelSchema = new mongoose.Schema({
    channelName: String,
    isLocked: Boolean,
    participantsId: [],
    messages: [],
})

const PrivateChannel = mongoose.model('Privatechannel', PrivateChannelSchema)
export default PrivateChannel