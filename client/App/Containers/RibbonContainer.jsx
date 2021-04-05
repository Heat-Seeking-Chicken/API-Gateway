import React from 'react'
import SignupButton from '../Components/SignupButton.jsx'
import LoginButton from '../Components/LoginButton.jsx'
import { Link } from 'react-router-dom'

class RibbonContainer extends React.Component{
  constructor(props){
    super(props)


    this.doLogIn = this.doLogIn.bind(this)
    this.doSignUp = this.doSignUp.bind(this) 
  }
  
  // invoked when user presses login button
  doLogIn(userStr, pwStr) {

    if(e.key === 'Enter') {

    // debugging
    console.log(' SignUp Button Pressed.')
    console.log(`Username: ${userStr}, Password: ${pwStr}`)

    // get ride of whitespaces from login
    string.replace(/\s+$/, '');

    let requestBody = {
      method: 'POST',
      headers: {
      
        'Content-Type': 'application/json'
      },
      // headers: {'Content-Type': 'text/javascript'},
      // body: JSON.stringify(updatedString)
      body: JSON.stringify(sendObj)
    }
  

    // ping the backend with the 
    fetch('/login', requestBody) 
      .then(response => response.text())
      .then(data => console.log('Data received from backend: ', data))
      .catch(err => console.log(err))
    
    }
  };

  // invoked when user presses sign up button
  doSignUp() {
    console.log(' SignUp Button Pressed.')

  };

  render(){
      return(
          <div className='ribboncontainer'>
          <h1>username</h1>
            <input className="usertext" type="text" />
          <h2>password</h2>
          <input className="classtext"type="text" />

         
          <SignupButton />
    


          <LoginButton />
  
          
          </div>
      )
  }
}

export default RibbonContainer