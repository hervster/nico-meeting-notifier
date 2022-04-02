import nicoOne from './Nico1.jpg'
import nicoTwo from './Nico2.jpg'
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import mongoose from 'mongoose';
import express from 'express';

const imagesPath = {
    yes: nicoTwo,
    no: nicoOne
  }

const backColor = {
  no: '#0cf31f',
  yes: '#fa2509'
}


// DB Stuff ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const meetingStateSchema = new mongoose.Schema({meetState: Boolean});
const meetingState = mongoose.model("inMeeting", meetingStateSchema);

const app = express.Router()

const createMeetingState = async () => {
    const NicoMeetingState = await new meetingState();
    return NicoMeetingState
}

const updateMeetingState = async (response) => {
    const meetingState = await meetingState.findOne({})
    meetingState.meetState = response 
    await meetingState.save()
    return meetingState
}

app.get("/", async (req, res ) => {
    let response = await createMeetingState()
    return response
})

app.put("/", async (req, res ) => {
    let response = await updateMeetingState()
    return response
})

app.listen(5000, () => console.log('API is running...'))
// DB Stuff ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  class App extends React.Component {
    state = {
      open: true,
      inMeeting: true
    }

    

    toggleImage = () => {
      this.setState(state => ({ open: !state.open }))
    }
  
    getImageName = () => this.state.open ? 'no' : 'yes'
  
    render() {
      const imageName = this.getImageName();
      return (  
      <div className="App">
      <header style={{backgroundColor: backColor[imageName]}} className="App-header">
        <img style={{maxWidth: '400px'}} src={imagesPath[imageName]} className="App-logo" alt="logo" />
        <p>
          Are you in a <code>MEETING</code> ?
        </p>
        <button onClick={this.toggleImage}>Indeed</button>
        <div> Or nah </div>
        <button onClick={this.toggleImage}>No</button>
      </header>
    </div>
  );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

  export default App;

