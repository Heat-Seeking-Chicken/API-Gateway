import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import { Route, BrowserRouter as Router, Switch , Redirect } from "react-router-dom";
import MainPage from './App/Pages/MainPage.jsx';
import LoginPage from './App/Pages/LoginPage.jsx';
import SignupPage from './App/Pages/SignupPage.jsx';
import { useHistory } from 'react-router'


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'loginFail' : true,
            'redirect': null,
        }

        // this.doLogIn = this.doLogIn.bind(this)
    }


  // invoked when user presses login button
  // doLogIn() {
      
  //   let userStr = document.getElementById('username').value;
  //   let pwStr = document.getElementById('password').value;

  //   // debugging
  //   console.log('Login Initiated.')
  //   console.log(`Username: ${userStr}, Password: ${pwStr}`)

  //   // get ride of whitespaces from login
  //   userStr.replace(/\s+$/, '');
    
  //   const sendObj = {'username':userStr, 'password': pwStr}
  //   let requestBody = {
  //     method: 'POST',
  //     headers: {
      
  //       'Content-Type': 'application/json'
  //     },

  //     body: JSON.stringify(sendObj)
  //   }
  
    // ping the backend with the 
    // fetch('/login', requestBody) 
    //   .then(response => response.json())
    //   .then(data =>{
    //     // based on returned login state, change the ribbon\
    //     console.log('loginFail state: ', data.loginFail)
    //     this.setState({'loginFail': data.loginFail})
    //     history.push(path)

    //   })
    //   .catch(err => console.log(err))
    // }

    render(){
        if (this.state.redirect) {
            console.log('inside redirect')
            return (<Router><Route path='/' exact render={(props) => <MainPage loginFail={this.state.loginFail}/>}/></Router>)
        }
        return(
            
           <Router>
              <Route path='/' exact render={(props) => <MainPage loginFail={this.state.loginFail}/>}/> 
              <Route path='/login' exact render={(props) => <LoginPage loginFcn={this.doLogIn}/>}/> 
              <Route path='/signup' exact render={(props) => <SignupPage loginFail={this.state.loginFail}/>}/>
            </Router>   
        )
    }
}


export default App;
