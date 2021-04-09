const Session = require('../models/sessionModel');

const sessionController = {};


sessionController.verifyLogin = (req, res, next) => {

  // verify user has ssid cookie
  if (!Object.prototype.hasOwnProperty.call(req.cookies,'ssid')){
    // if cookie not found, 
    res.locals.reactToken = false;
    const reactTokenErr = 'Session expired, please log in again'
    return next();
      message: reactTokenErr
  } else {
    // if cookie is found, get the session 
    Session.findOne({cookieId: req.cookies.ssid}, (err,session) => {
      if(err) return next({err: 'error in session find one in session controller'});
      // if session isnt found return to main page without REACT TOKEN
      if(!session){
        res.locals.reactToken = false;
        console.log('no session found');
      }
      // go to front page serving no matter state of REACT TOKEN 
      return next();
    });
  }
}


sessionController.startSession = (req, res, next) => {    
  if (res.locals.signupFail) return next();
  if (res.locals.loginFail) return next();
  Session.findOne({cookieId: res.locals.id}, (err, session) => {
    if(session){
      return next();
    }
    else {
      Session.create({cookieId: res.locals.id}, (err, session) => {
        if (err) {
          return next({err: 'Error in start session'});
        }
        else { 
          console.log('created session')
          return next();;
        } 
      });
    }
  });
};

module.exports = sessionController;
