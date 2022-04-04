import nicoOne from './Nico1.jpg'
import nicoTwo from './Nico2.jpg'
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { connectDB, getMeetingState, setMeetingState } from './db.js'

const imagesPath = {
    yes: nicoTwo,
    no: nicoOne
  }

const backColor = {
  no: '#0cf31f',
  yes: '#fa2509'
}
  
const meetingState = getMeetingState()
  class App extends React.Component {
    // Add logic to see what state should be
    // Add logic to change state

    getImageName = () => meetingState ? 'no' : 'yes'
  
    render() {
      const imageName = this.getImageName();
      return (  
      <div className="App">
      <header style={{backgroundColor: backColor[imageName]}} className="App-header">
        <img style={{maxWidth: '400px'}} src={imagesPath[imageName]} className="App-logo" alt="logo" />
        <p>
          Are you in a <code>MEETING</code> ?
        </p>
        <button onClick={setMeetingState(true)}>Indeed</button>
        <div> Or nah </div>
        <button onClick={setMeetingState(false)}>No</button>
      </header>
    </div>
  );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

  export default App;

