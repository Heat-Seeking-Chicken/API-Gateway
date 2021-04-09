import React from 'react'
import SignupButton from '../Components/SignupButton.jsx'
import LoginButton from '../Components/LoginButton.jsx'
import { Link } from 'react-router-dom'

class RibbonContainer extends React.Component{
  constructor(props){
    super(props)

  }
  
  render(){
      return(
        // If user is signed in, hide signup/login buttons. 
          <div className='ribboncontainer'>
          {this.props.loginFail ? <SignupButton /> : null}
  
          {this.props.loginFail ? <LoginButton /> : null}

          </div>
      )
  }
}

export default RibbonContainer