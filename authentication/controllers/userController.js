const User = require('../models/userModel');

const userController = {};

// create a new user account
userController.createUser = (req, res, next) => {
  console.log("req body username: ", req.body.username)
  console.log("req body password: ", req.body.password)
  
  User.create({username: req.body.username, password: req.body.password}, (err, user) => {
    if (err) {

      res.locals.signupFail = true;
      console.log('herherehere', err);
      // console.log(err)
      const dupUserErr = 'Username is already taken';
      return next({
        // log: 'userController.createUser',
        message: dupUserErr
      });
    } else {
      console.log('User Successfully Created')
      res.locals.id = user._id.toString();
      return next();
    }
  });
};
/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  User.findOne({username: req.body.username}, 'username password', (err, user) => {
    if (err){
      console.log('user schema: ', User);
      res.locals.loginFail = true;
      return next({
        log: 'userController.verifyUser',
        message: { err: 'userController.verifyUser: An error occurred' }
      });
    }
    
    if (!user) {
      // redirect if incorrect pw or nonexistent user
      res.locals.loginFail = true;
      // return res.status(200).send('/signupfail'); 
      const noUserRecErr = 'User does not exist'
      return next({
        message: noUserRecErr
      });
    }
    else {
      // check that password is correctly matching hashed password
      res.locals.id = user._id.toString();

      user.comparePw(req.body.password, function(err, isMatch) {
        res.locals.loginFail = isMatch ? false : true 
        return next();
      }); 
    }

  });
};


module.exports = userController;