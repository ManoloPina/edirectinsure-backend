import express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userSchema from './schemas/usersSchema';
import projectSchema from './schemas/projectSchema';
import cors from 'cors';
import expressJwt from 'express-jwt';
import userModel from './models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const server = express();
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const saltRounds = 10;

mongoose.connect('mongodb://localhost:27017/edirectinsurel', { useMongoClient: true });

const connection = mongoose.connection;


connection.once('open', () => {
  console.log('Connection to database was successfull!!');
});

server.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }, (err, user) => {

    bcrypt.compare(password, user.password, (err, response) => {
      if (!err) {
        const token = jwt.sign({ sub: user.id }, jwtSecret);
        res.send({ token, user });
      }else {
        res.sendStatus(401);
        return;
      }
    });




  });

});


server.post('/signup', (req, res) => {

  let { name, email, password } = req.body;

  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {

    password = hash;

    userModel.create({ name, email, password }, (err, user) => {

      const token = jwt.sign({ sub: user.id }, jwtSecret);

      res.send({ token, user });
    });

  });



});

server.use('/users', bodyParser.json(), graphqlExpress((req) => ({
  schema: userSchema,
  context: { user: req.user }
})));

server.use('/projects', bodyParser.json(), graphqlExpress((req) => ({
  schema: projectSchema,
  context: { user: req.user }
})));


server.listen(4000, () => {
  console.log('Listening on port 4000');
});