const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 3000;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const userController = require('../authentication/controllers/userController');
const cookieController = require('../authentication/controllers/cookieController');
const sessionController = require('../authentication/controllers/sessionController');
const apiController = require('../authentication/controllers/apiController');

// Mongoose Database connection
console.log('CONNECTING TO MONGO DB');
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;   
mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('CONNECTED TO MONGO DB') 
});

// express parsers
app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser())
app.use(                //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);

// Serve static file build route 
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve the home page
app.get('/', 
    sessionController.verifyLogin,
    (req, res) => {
        if (res.locals.isLogged) res.send('is logged')
        res.status(200).sendFile(path.join(__dirname, '../index.html'));
    }
);

// app.get('/signup', 
//     sessionController.verifyLogin, 
//     (req, res) => {
//         if (res.locals.isLogged) res.send('is logged')
//         res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
//     }
// );

// app.get('/login', 
//     sessionController.verifyLogin, 
//     (req, res) => {
//         if (res.locals.isLogged) res.send('is logged')
//         res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
//     }
// );

// get the user signin information from frontend to login
// login information is inside request body
app.post('/signup', 
    (req, res, next) => {console.log('Signup req body in backend: ', req.body), next()},
    userController.createUser,
    cookieController.setSSIDCookie,  
    sessionController.startSession, 
    (req, res) => {
        res.status(200).send(res.locals) 
    }
);

// search button 
// GET request to server, 
    // take the request, and parse into a usable API fetch request, spits back out the response and send to the front page
app.post('/search', 
    apiController.googleBooks,
    apiController.newYorkTimes,
    (req, res) => {
    res.status(200).json(res.locals.data)
})

// verify user is logged in. no subsequent middleware is activated unless user is verified. float the 
// check for verification at the last middleware, where it can be directed to different endpoints depending on the state of successful login
app.post('/login', 
    (req, res, next) => {console.log('Login req body in backend: ', req.body), next()},
    userController.verifyUser, 
    cookieController.setSSIDCookie,  
    sessionController.startSession, 
    (req, res) => {    
        if (res.locals.signupFail) console.log('invalid login credentials')  
        else {
            res.status(200).send(res.locals)   
        }
    }
);

// handle unrecognized requests with 404
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// ADD FAILED VERIFYUSER ERROR HANDLER
// ADD USERSCHEMA PRE ERROR HANDLER

/**
 * Global error handler
 */
 app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    // console.log(errorObj.log);
    console.log('Local Obj: ', res.locals)
    if(res.locals.signupFail) console.log("invalid signup credentials")
    if(res.locals.loginFail) console.log("invalid login credentials")

    console.log('Error log: ', errorObj.log);
    console.log('Error msg: ', errorObj.message);
    return res.status(errorObj.status).json(errorObj.message);
  });



app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`)
  })