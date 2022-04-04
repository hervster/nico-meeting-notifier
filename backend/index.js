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
        required: true
        }
    });

const meetingState = mongoose.model("NicoInMeeting", MeetingStateSchema);
var someMeetingState = new meetingState({ meetState: false})
someMeetingState.save((err) => {
    if (err) console.log("Error is: " + err);
})
meetingState.createIndexes();

// Express
const app = express();
console.log("App listening at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("App is Working");

})

app.get("/getState", async(req, res) => {
    let result = await getMeetingState();
    res.send("State is: " + result)
    return result;
})

app.post("/saveState", async (req, res) => {
    setMeetingState(req.body.meetState);
    res.end("State set!")
})

const setMeetingState = async (boolState) => {
    let id = '624b499a097154a9b132b510'
    meetingState.findByIdAndUpdate(id, {meetState: boolState})
}

const getMeetingState = async () => {
    console.log("Finding state")
    let id = '624b499a097154a9b132b510'
    const newMeetState = await meetingState.findById(id);
    const s = newMeetState.meetState;
    return s;
}

app.listen(5000);