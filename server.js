require('dotenv').config()
const express = require('express')
const db = require('./database.js')
const app = express()
const jwt = require('./jwt')


app.use('/', function (req, res, next) {
  //var allowedOrigins = ['http://localhost:3000'];
  var origin = req.headers.origin;
  // if(allowedOrigins.indexOf(origin) > -1){
  //      res.setHeader('Access-Control-Allow-Origin', origin);
  // }
  res.setHeader('Access-Control-Allow-Origin', origin || "*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json())

//creating a new account in sign up
app.post('/users', (req, res) => {
  const {username, email, password, level } = req.body
  db.createUser(username, email, password, level, (error, userId) => {
    if (error){
      res.send({error: error.message})
      return
    }
    res.send({userId, username, email })
  })
})


//Login
app.post('/users/login', (req, res) => {
  const {username, email, password } = req.body
  db.getUser(email, password, (error, user) => {
    if (error){
      res.send("Wrong Log in")
      return
    }
    const accesssToken = jwt.createToken({userId: user.id, username: user.username, email: user.email })
    res.send({ accesssToken, username, email, })
  })
})

 //getting users by their id
 app.get('/users/:id', (req, res) => {
  const id = req.params.id 
  db.userIdentification(id, (error, result) => {
    res.send({result})
  })
})

 //getting users
app.get('/users', (req, res) => {
    db.allUsers((error, result) => {
    res.send({result})
  })
})

 //change user info
 app.post('/users', (req, res) => {
  const {username, email, level } = req.body
  db.changeUserInfo(username, email, level, (error, userId) => {
    if (error){
      res.send({error: error.message})
      return
    }
    res.send({userId, username, email, level })
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})















