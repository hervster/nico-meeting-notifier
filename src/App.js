import nicoOne from './Nico1.jpg'
import nicoTwo from './Nico2.jpg'
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

const imagesPath = {
    yes: nicoTwo,
    no: nicoOne
  }

const backColor = {
  no: '#0cf31f',
  yes: '#fa2509'
}

const getRequestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
}

var postRequestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: ''
}
  
  class App extends React.Component {
    state = {
      open: true
    }

    getMeetingState = () => {
      console.log("Getting meeting state")
      fetch('http://192.168.0.159:5000/getState', getRequestOptions)
        .then(response => response.json())
        .then( (data) => 
        { console.log("Data is : " + data)
          this.setState({open: data.meetState})
      })
    }

    changeState = (boolValue) => {
      console.log("Changing state")
      postRequestOptions.body = JSON.stringify({meetState: boolValue})
      fetch('http://192.168.0.159:5000/saveState', postRequestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
      this.getMeetingState()
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
        <button onClick={this.changeState(true)}>Indeed</button>
        <div> Or nah </div>
        <button onClick={this.changeState(false)}>No</button>
      </header>
    </div>
  );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

  export default App;