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
          console.log("Data is: ")
          console.log(data)
          // this.setState({open: data.message})
          return data;
        })
        console.log("Result is: ")
        console.log(result)
        return result;
    }

    async componentDidMount() {
      const st = await this.getMeetingState()
      const im = this.getImageName(st.message)
      this.setState({open: st.message, imgName: im})
      this.forceUpdate();
    }

    async componentWillUnmount() {
    }



    changeStateTrue = async () => {
      console.log("Changing state true")
      postRequestOptions.body = JSON.stringify({meetState: true})
      console.log("Request body is:" + postRequestOptions.body)
      await fetch("http://192.168.0.159:5000/saveState", postRequestOptions)
      .then(async response => {
        if (response.ok) return response.json();
      })
    }

    changeStateFalse = async () => {
      console.log("Changing state false")
      postRequestOptions.body = JSON.stringify({meetState: false})
      console.log("Request body is:" + postRequestOptions.body)
      await fetch("http://192.168.0.159:5000/saveState", postRequestOptions)
      .then(async response => {
        if (response.ok) return response.json();
      })
    }

    changeStateTrueWrapper = async () =>{
      await this.changeStateTrue();
      const st = await this.getMeetingState()
      this.setState({open: st.message, imgName: 'yes'})
      this.forceUpdate()
      console.log("State is: " + JSON.stringify(this.state))
    }

    changeStateFalseWrapper = async () =>{
      await this.changeStateFalse();
      const st = await this.getMeetingState()
      this.setState({open: st.message, imgName: 'no'})
      this.forceUpdate()
      console.log("State is: " + JSON.stringify(this.state))
    }
  
    getImageName = (value) => value ? 'yes' : 'no'
  
    render() {
      let imageName = this.state.imgName
      console.log("Image name is: " + imageName);
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