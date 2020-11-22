const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require("../../models/User"); // import User mongoose model

module.exports = {
  // exporting an object that contains a mutation (writing to DB)
  Mutation: {
    async register(   // resolver arguments
      _,
      {
        registerInput: { username, email, password, confirmPassword }, // destructuring inputs from typeDefs > Mutation > registerInput
      },
      context,
      info
    ) {
      //validate user data
      // make sure user doesn't already exist
      // hash pw and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({    // takes the User model
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save(); // res will be encoded. 

      const token = jwt.sign({  // takes a payload to put inside the token when making a token for a user. 
          id: res.id, // all these fields are encoded via the defined 'res' above. 
          email: res.email,
          username: res.username
      }, SECRET_KEY, { expiresIn: '1h'});

      return {
          ...res._doc,  // spread the data of the user.
          id: res._id,
          token
      }
    },
  },
};
