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
  method: "GET",
  headers: { "Content-Type": "application/json", "Accept": "application/json" }
}

var postRequestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  body: ''
}
  
  class App extends React.Component {
    state = {
    }

    getMeetingState = async () => {
      await fetch("http://192.168.0.159:5000/getState", getRequestOptions )
        .then(async response => {
          if (response.ok) 
          {
          console.log("Response is: " )
          console.log(await response.text())
          console.log(response)
          console.log("State is initial: " + JSON.stringify(this.state))
          this.setState( state => ({open: response.body.message}));
          console.log("State is now: " + JSON.stringify(this.state))
            return response
          }
        })
        .then(async data => {
          console.log("Looking at data now")
        })
        
        this.getImageName();
    }


    changeStateTrue = async () => {
      console.log("Changing state true")
      postRequestOptions.body = JSON.stringify({meetState: true})
      console.log("Request body is:" + postRequestOptions.body)
      await fetch("http://192.168.0.159:5000/saveState", postRequestOptions)
      .then(async response => {
        if (response.ok) return response.json();
      })
      this.setMeetingState();

    }

    changeStateFalse = async () => {
      console.log("Changing state false")
      postRequestOptions.body = JSON.stringify({meetState: false})
      console.log("Request body is:" + postRequestOptions.body)
      await fetch("http://192.168.0.159:5000/saveState", postRequestOptions)
      .then(async response => {
        if (response.ok) return response.json();
      })
      this.setMeetingState();

    }

    setMeetingState = async () => {
      const resp = this.getMeetingState()
      this.setState( state => ({open: resp.message}))
    }
    
    /*

    getMeetingState = () => {
      console.log("Getting meeting state");
      fetch('http://192.168.0.159:5000/getState', getRequestOptions)
        .then( async (response) => { 
          console.log("Response from get is: " + response.json())
          await response.json()
        })
        .then( async (data) => 
        { console.log("Data from get is : " + data)
          this.setState( state => ({open: data.meetState}))
      })
    }

    changeState = (boolValue) => {
      console.log("Changing state")
      postRequestOptions.body = JSON.stringify({meetState: boolValue})
      console.log("Post request options are: " + postRequestOptions)
      console.log("Request body is:" + postRequestOptions.body)
      fetch('http://192.168.0.159:5000/saveState', postRequestOptions)
        .then(async response =>  await response.json())
        .then(data => console.log(data));
      this.getMeetingState();
    }

    */
  
    getImageName = () => this.state.open ? 'no' : 'yes'
  
    render() {
      // this.getMeetingState();
      let imageName = this.getImageName();
      return (  
      <div className="App">
      <header style={{backgroundColor: backColor[imageName]}} className="App-header">
        <img style={{maxWidth: '400px'}} src={imagesPath[imageName]} className="App-logo" alt="logo" />
        <p>
          Are you in a <code>MEETING</code> ?
        </p>
        <button onClick={this.changeStateTrue}>Indeed</button>
        <div> Or nah </div>
        <button onClick={this.changeStateFalse}>No</button>
      </header>
    </div>
  );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

  export default App;