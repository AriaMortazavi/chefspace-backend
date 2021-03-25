require('dotenv').config()
const express = require('express')
const db = require('./database.js')
const app = express()
const jwt = require('./jwt')

const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


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
  const {username, email, password, level } = req.body
  db.getUser(email, password, (error, user) => {
    if (error){
      res.send("Wrong Log in")
      return
    }
    const accesssToken = jwt.createToken({userId: user.id, username: user.username, email: user.email, level: user.level })
    res.send({ accesssToken, username, email, level})
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

// IMAGE UPLOAD
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

app.post('/images', upload.single('image'), (req, res) => {
  const imagePath = req.file.path
  const description = req.body.description

  console.log(description, imagePath)
  res.send({description, imagePath})
})

/**
Old Code

// upload image
app.post('/images', upload.single(image), (req, res) => {
  const file = req.file;
  console.log(file);
  const description = req.body.description;
  res.send("hi");
})

// create posts
app.post('/posts', (req, res) => {
  const {postId, description, image, likes, dislikes} = req.body
  db.createPost(postId, description, image => {
    res.send({id: postId, description, image})
  })
})

*/

// get all posts
app.get('/posts/all', (req, res) => {
  db.getPosts((result) => {
    res.send({result})
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
















