import React, { useRef, useState } from 'react';
// import useStyles from './ribbonButtons';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
// import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom';
import LoginGithub from 'react-login-github';
import GitHubIcon from '@material-ui/icons/GitHub';
import { GithubLoginButton } from "react-social-login-buttons";


// styles the modal to be in the center of the screen
function getModalStyle() {

  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// modal styling hook
const useStyles = makeStyles((theme) => ({
  
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #7BDFF2',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


// main login button function. brings in react hooks and sets state of the modal
const LoginButton = (props) => {

  // modal set up: styling, location, and initializes to not show at first page load
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle); 
  const [showModal, setShow] = useState(false); 
  
  // useRef hooks for capturing the text field values to sen to backend
  const userTextField = useRef();
  const pwTextField = useRef();

  // returns all text values from the text fields to return to back end when the complete button is clicked
  const getTextFieldValues = (e) => {
    const textFieldObj = {};
    console.log('event: ', e)
    if (e.key === 'Enter' || e.type === 'click') {
      // need to package this into the a prop or state to take out
      textFieldObj.userText = userTextField.current.value
      textFieldObj.pwText = pwTextField.current.value
    }
    return textFieldObj
  }

  // callback fcns to open/close modal from event handlers
  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  /* OAuth Handlers */

  const onSuccess = response => {
    console.log(response);

  //   fetch('/oauth', requestBody) 
  //   .then(response => response.json())
  //   .then(data =>{
  //     // backend sends back an object with a boolean stating login (for now)
  //     // use boolean state to improve login logic
  //     console.log('loginFail state: ', data.loginFail)
  //     setState({'loginFail': data.loginFail})

  //   })
  //   .catch(err => console.log(err))
  // }

  // close the modal
    handleClose();
  };

  const onFailure = response => {
    console.error(response);
    //handle failure
  }

  // make post request to backend when complete button is pressed
  const completeForm = (e) => {

    // get text field values
    const {userText, pwText} = getTextFieldValues(e);

    // make request to back end /login endpoint
    const requestBody = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": userText,
        "password": pwText
      })
    }

    fetch('/login', requestBody) 
      .then(response => response.json())
      .then(data =>{
        // backend sends back an object with a boolean stating login (for now)
        // use boolean state to improve login logic
        console.log('loginFail state: ', data.loginFail)
        if(data.loginFail == false){
          props.toggleLogin();
          handleClose();
        }

      })
      .catch(err => console.log(err))
    }
    
  // main modal. login has 2 text fields: name, pw
  const logInModalBody = (

    <div style={modalStyle} className={classes.paper}>
      
      <h2 id="signup-modal-title">Welcome Back! Please Log In</h2>
  
      <form id="modalForm" className={classes.root} noValidate autoComplete="off">
  
        <div>
          <TextField 
            required id="textfield-username" 
            label="Username" 
            variant="outlined" 
            inputRef={userTextField}
          />
        </div>
  
        <div>
          <TextField 
            required id="textfield-password" 
            label="Password" 
            type="password" 
            autoComplete="current-password" 
            variant="outlined" 
            // onKeyPress={(e) => getTextFieldValues(e)}
            inputRef={pwTextField}
          />
        </div>
  
        <div>
          <TextField 
            id="outlined-basic" 
            label="Email Address" 
            variant="outlined" 
          />
        </div>
  
        <Button 
          variant="contained" 
          color="primary"
          onClick={(e)=> {
            completeForm(e);
            console.log('Login Form Submitted')
            }
          }
          >
            Complete
        </Button>
  
      </form>
      
      <div>
        <GoogleLogin
          clientId="569588449540-2nrlh84tujesskj5q3po2n7kmmfvfg3u.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
  
      <div>
        <LoginGithub clientId='3149f5abc472c1305402'
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Login"
          className="githubLogin"
        ><GitHubIcon/>Login with Github</LoginGithub>
    
      </div>
      
    </div>
  );

    return(
      <div>
        <Button 
          onClick={handleOpen} 
          variant="outlined" 
          color="primary"
        >
          Log In
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showModal}
          onClose={handleClose}
        >
          {logInModalBody}
        </Modal>
      </div>
    )
}


  // <button className="login">
  //    <Link to='login'>
  //     <i className="fas fa-sign-in-alt" > Login</i>
  //   </Link>
  // </button>

  


export default LoginButton;