import React, { useRef, useState } from 'react';
// import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom';
import LoginGithub from 'react-login-github';
import GitHubIcon from '@material-ui/icons/GitHub';
import { GithubLoginButton } from "react-social-login-buttons";
// const [ details, setDetails ] = useState({});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

const SignupButton = () => {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [showModal, setShow] = useState(false);
  

  // useRef hooks for capturing the text field values to sen to backend
  const userTextField = useRef();
  const pwTextField = useRef();
  const emailTextField = useRef();
  const SSNTextField = useRef();

  // returns all text values from the text fields to return to back end when the complete button is clicked
  const getTextFieldValues = (e) => {
    const textFieldObj = {};
    console.log('event: ', e)
    if (e.key === 'Enter' || e.type === 'click') {
      // need to package this into the a prop or state to take out
      textFieldObj.userText = userTextField.current.value
      textFieldObj.pwText = pwTextField.current.value
      textFieldObj.emailText = emailTextField.current.value
      textFieldObj.SSNText = SSNTextField.current.value
    }
    return textFieldObj
  }

  const handleOpen = () => {
    setShow(true);
  };
  
  const handleClose = () => {
    setShow(false);
  };
   
  /* OAuth Handlers */

  const onSuccess = response => {
    console.log(response);
  }
  const onFailure = response => {
    console.error(response);
    //handle failure
  }

  // make post request to backend when complete button is pressed
  const completeForm = (e) => {

    // get text field values
    const {userText, pwText, emailText, SSNText} = getTextFieldValues(e);

    // make request to back end /login endpoint
    const requestBody = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": userText,
        "password": pwText,
        "email": emailText,
        "SSN": SSNText
      })
    }

    fetch('/signup', requestBody) 
      .then(response => response.json())
      .then(data =>{
        // backend sends back an object with a boolean stating login (for now)
        // use boolean state to improve login logic
        console.log('SignUp state: ', data.signupFail)

        // on successful login close the modal
        if (!data.signupFail) handleClose();

      })
      .catch(err => console.log(err))
    }

  // main modal. signup has 4 text fields: name, pw, email, SSN (lol)
  const signUpModalBody = (
    
    <div style={modalStyle} className={classes.paper}>

      <h2 id="signup-modal-title">Sign Up</h2>
    
      <form id='modalForm' className={classes.root} noValidate autoComplete="off">
        
        <div>
          <TextField 
            required id="textfield-username" 
            label="Username" 
            variant="outlined" 
            inputRef={userTextField}
          />
          <TextField required 
            id="textfield-password" 
            label="Password" 
            type="password" 
            autoComplete="current-password" 
            variant="outlined"
            inputRef={pwTextField} 
          />
        </div>
        
        <div>
          <TextField 
            id="textfield-email" 
            label="Email Address" 
            variant="outlined" 
            inputRef={emailTextField}
          />
          <TextField 
            id="textfield-SSN" 
            label="SSN" 
            variant="outlined" 
            helperText="* Required"
            inputRef={SSNTextField}
          />
        </div>

        <Button 
          variant="contained" 
          color="primary"
          onClick={(e)=> {
            completeForm(e);
            console.log('SignUp Form Submitted')
            }
          }
        >
          Complete
        </Button>
      </form>
      <div id='modalForm'>
        <GoogleLogin
          clientId="569588449540-2nrlh84tujesskj5q3po2n7kmmfvfg3u.apps.googleusercontent.com"
          buttonText="Sign Up"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
  
      <div id='modalForm'>
        <LoginGithub clientId='3149f5abc472c1305402'
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Login"
          className="githubLogin"
        ><GitHubIcon/>Signup with Github</LoginGithub>
    
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
          Sign Up
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showModal}
          onClose={handleClose}
        >
          {signUpModalBody}
        </Modal>
      </div>

      //   function handleClick(e) {
      //     e.preventDefault();
      // }
      //  <button className="signup" onClick={handleClick}>
      //   <Link to='/signup'>
      //     <i className="fas fa-user-plus"></i>Sign Up
      //   </Link>
      //  </button>
       
    )
}

export default SignupButton
