import mongoose from 'mongoose';

const meetingStateSchema = new mongoose.Schema({meetState: Boolean});
meetingStateSchema.methods.getState = function getState() {
    return this.meetState;
}
meetingStateSchema.methods.setState = function setState(input) {
    this.meetState = input;
}

const meetingState = mongoose.model("inMeeting", meetingStateSchema);
const NicoMeetingState = new meetingState(false);
    NicoMeetingState.save();

const CONNECTION_URL =
    ''

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}    

const getMeetingState = async () => {
    const newMeetState = await meetingState.find();
    const s = newMeetState.getState();
    console.log("Meeting state is: " + s);
    return s;
}

const setMeetingState = async (stateInput) => {
    const newMeetState = await meetingState.find();
    newMeetState.setMeetingState(stateInput);
    newMeetState.save();
} 

export { connectDB, getMeetingState, setMeetingState }