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

    constructor(props){
      super(props);

    this.state = {}

    this.changeStateTrueWrapper = this.changeStateTrueWrapper.bind(this)
    this.changeStateFalseWrapper = this.changeStateFalseWrapper.bind(this)
    this.getMeetingState = this.getMeetingState.bind(this)
  }
  
    getMeetingState = async () => {
      const result = 
       await fetch("http://192.168.0.159:5000/getState", getRequestOptions )
        .then(async response => {
          if (response.ok) 
          { return await response.json() } else
          { console.log("Errors occured")}
        })
        .then(async data => {
          return data;
        })
        return result;
    }

    async componentDidMount() {
      const st = await this.getMeetingState()
      const im = this.getImageName(st.State)
      this.setState({open: st.State, imgName: im})
      this.forceUpdate();
    }

    async componentWillUnmount() {
    }



    changeStateTrue = async () => {
      postRequestOptions.body = JSON.stringify({meetState: true})
      await fetch("http://192.168.0.159:5000/saveState", postRequestOptions)
      .then(async response => {
        if (response.ok) return response.json();
      })
    }

    changeStateFalse = async () => {
      postRequestOptions.body = JSON.stringify({meetState: false})
      await fetch("http://192.168.0.159:5000/saveState", postRequestOptions)
      .then(async response => {
        if (response.ok) return response.json();
      })
    }

    changeStateTrueWrapper = async () =>{
      await this.changeStateTrue();
      const st = await this.getMeetingState()
      this.setState({open: st.State, imgName: 'yes'})
      this.forceUpdate()
    }

    changeStateFalseWrapper = async () =>{
      await this.changeStateFalse();
      const st = await this.getMeetingState()
      this.setState({open: st.State, imgName: 'no'})
      this.forceUpdate()
    }
  
    getImageName = (value) => value ? 'yes' : 'no'

    meetingState = setInterval(async () => {
      const meetState =  await this.getMeetingState();
       if ( this.state.open !== undefined && 
        ( meetState.State !== this.state.open) ) {
        window.location.reload();
      }
        }, 30000)
  
    render() {
      let imageName = this.state.imgName
      return (  
      <div className="App">
      <header style={{backgroundColor: backColor[imageName]}} className="App-header">
        <img style={{maxWidth: '400px'}} src={imagesPath[imageName]} className="App-logo" alt="logo" />
        <p>
          Are you in a <code>MEETING</code> ?
        </p>
        <button onClick={this.changeStateTrueWrapper}>Indeed</button>
        <div> Or nah </div>
        <button onClick={this.changeStateFalseWrapper}>No</button>
      </header>
    </div>
  );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

  export default App;