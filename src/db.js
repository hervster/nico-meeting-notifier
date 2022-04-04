const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");

// DB setup

mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'NicoMeeting',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to NicoMeeting database'));

const MeetingStateSchema = new mongoose.Schema({
    meetState: { 
        type: Boolean,
        required: true,
        }
    });

MeetingStateSchema.methods.getState = function getState() {
    return this.meetState;
}

MeetingStateSchema.methods.setState = function setState(input) {
    this.meetState = input;
}

const meetingState = mongoose.model("inMeeting", MeetingStateSchema);
meetingState.createIndexes();

// Express
const app = express();
console.log("App listening at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("App is Working");

})

app.get("/getState", async(res) => {
    let result = getMeetingState();
    res.send("State is: " + result)
    return result;
})

app.post("/saveState", async (req, res) => {
    setMeetingState(req.body.meetState);
    console.log("State set")
})

/*
app.post("/saveState", async (req, res) => {
    try {
        const meetingState = new meetingState(request.body);
        let result = await meetingState.save();
        result = result.toObject();
        if (result) {
            res.send()
        }
    }
})
*/
/*

const NicoMeetingState = new meetingState(false);
    NicoMeetingState.save();

const CONNECTION_URL =
    'mongodb://localhost:27017/NicoMeeting/React'

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
*/
const getMeetingState = async () => {
    const newMeetState = await meetingState.find();
    const s = newMeetState.getState();
    console.log("Meeting state is: " + s);
    return s;
}

const setMeetingState = async (stateInput) => {
    const newMeetState = await meetingState.find();
    newMeetState.setState(stateInput);
    newMeetState.save();
} 

export { getMeetingState, setMeetingState }