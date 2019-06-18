var model = require('../models').slave_database;
var bcrypt = require("bcrypt-nodejs");
let jwt = require('jsonwebtoken');
const config = require('../config.js');

module.exports = {
    checkUser: async function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', config.allowedUrl);
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send(
                'Request missing username or password param'
            );
        }
          
        try {
          model.User.findOne({ where: { username: username } }).then(function (user) {
              
              if (!user) {
                  console.log('user not found');
                  res.status(400).json({
                    success: false,
                    message: 'user not valid',
                    token: null
                  });
              } 
              var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
              if (!passwordIsValid) {
                res.status(403).json({
                  success: false,
                  message: 'password not valid',
                  token: null
                });
              } else {
                let token = jwt.sign({id: user.id},
                  config.secret,
                  { expiresIn: '24h' }
                );
                res.status(200).json({
                  success: true,
                  message: 'Authentication successful!',
                  token: token
                });
              }
          });
        } catch (err) {
          res.status(400).json({
            success: false,
            message: 'invalid username or password',
            token: null
          });
        }
          
    },

  addUser: async function (req, res) {
    const { username, password, email } = req.body;
    console.log(req.body)
    if (!username || !password || !email) {
      return res.status(400).send(
        'Request missing username or password or email param'
      );
    }
        
    try {
      let user = await model.User.create(req.body)
      .then(user => res.json(user))
    } catch (err) {
      return res.status(400).send('invalid username or password');
    }    
  }
}