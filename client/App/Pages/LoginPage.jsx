import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import GoogleLogin from 'react-google-login'
import ReactDOM from 'react-dom';
import LoginGithub from 'react-login-github';

// const gh_clientid = `${process.env.GH_CLIENTID}`;

const LoginPage = (props) => {
  const history = useHistory();

  const routeChange=()=> {
    let path = `/`;
    history.push(path);
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  const onSuccess = response => console.log(response);
  const onFailure = response => console.error(response);

  return(
    <div className='loginpage'>
      <div className='loginbox'>
              <img className='wunderpuss' src='https://upload.wikimedia.org/wikipedia/commons/7/73/Komodo5_28-12-11_-_47a_alert_%286695807463%29.jpg'/>
              {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
              <input id='username' type='text' placeholder='Enter your username here' className='form username' />
              <input id='password' type='password' placeholder='Enter your password here' className='form password' />
              <button className="login" onClick={() => {props.loginFcn(), routeChange()}}>
                  <i className="fas fa-sign-in-alt" >Login bitch</i>
              </button>
              <GoogleLogin
              clientId="569588449540-2nrlh84tujesskj5q3po2n7kmmfvfg3u.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              />
              <LoginGithub clientId='3149f5abc472c1305402'
              onSuccess={onSuccess}
              onFailure={onFailure}/>
      </div>
    </div>
  )
}

export default LoginPage