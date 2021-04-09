import React from 'react'
import SignupButton from '../Components/SignupButton.jsx'
import LoginButton from '../Components/LoginButton.jsx'
import { Link } from 'react-router-dom'

class RibbonContainer extends React.Component{
  constructor(props){
    super(props)

  }
  
  render(){
    // const render = [];
    if(this.props.userState === false){
      return(
          <div className='ribboncontainer'>
          {/* <h1>username</h1>
            <input className="usertext" type="text" />
          <h2>password</h2>
          <input className="classtext"type="text" /> */}
          <SignupButton />

          <LoginButton toggleLogin = {() => {this.props.toggleLogin()}} />

          </div>
      )
    }
    return (
      <div className='ribboncontainer'>
        Logged in!
      </div>
    )
  }
}

export default RibbonContainer