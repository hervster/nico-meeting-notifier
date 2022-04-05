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

/*
var someMeetingState = new meetingState({ meetState: false})
someMeetingState.save((err) => {
    if (err) console.log("Error is: " + err);
})
*/

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
    res.send(JSON.stringify({State: result}))
    return JSON.stringify(result);
})

app.post("/saveState", async (req, res) => {
    await setMeetingState(req.body.meetState);
    const messageStr = "State set with: " + req.body.meetState + "!"
    res.send(JSON.stringify({message: messageStr}))
})

const setMeetingState = async (boolState) => {
    const id = "624b499a097154a9b132b510"
    await meetingState.findByIdAndUpdate(id, {meetState: boolState})
}

const getMeetingState = async () => {
    const id = "624b499a097154a9b132b510"
    const newMeetState = await meetingState.findById(id);
    const s = newMeetState.meetState;
    return s;
}

app.listen(5000);