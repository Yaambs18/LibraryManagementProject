const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Student = require('../models/students');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.isAdmin = user.isAdmin;
        if(user.isAdmin){
          Admin.findById(user.userId).then(user => {
            req.user = user;
            next();
          })
        }
        else{
          Student.findById(user.userId).then(user => {
              req.user = user;
              next();
          })
        }

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false});
      }

}

module.exports = {
  authenticate
}