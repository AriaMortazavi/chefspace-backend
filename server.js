require('dotenv').config()

const express = require('express')

const database = require('./database.js')

const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const bcrypt = require('bcrypt')
// using bcrypt for hashing password

app.use(express.json())

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
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api/allposts', (req, res) => {
  const posting = database.allPosts()
  res.send(
    posting
  )
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.post('/api/createposts', (req, res) => {
  const recipe = req.body

  database.createPost(recipe, (error, recipeID) => {

    if (error) {
      res.send({ error })
      return
    }

    recipe.id = recipeID

    res.send({ recipe })
  })
})




//login and signup
//getting users
app.get('/users', (req, res) => {
  const users = database.allUsers()
  res.json(
    users
  )
})

//Creating new user
app.post('https://chefspace-backend.herokuapp.com/createusers', async (req, res) => {
  const users = database.allUsers()
  try{
  const hashedPassword = await bcrypt.hash(req.body.password, 10) //the 10 is to salt the hash to increase security
  const newUser = {username: req.body.username, email: req.body.email,level: req.body.level, password: hashedPassword }
  users.push(newUser)
  console.log(newUser, users)
  res.status(201).send()
  }catch{
    res.status(500).send()
  }
}) 

//login
app.post('https://chefspace-backend.herokuapp.com/login', async (req, res) => {
  const users = database.allUsers()
  console.log(users)
  const user = users.find(newUser => newUser.email === req.body.email)
  // const user = { email: email}
  if (user == null){
    return res.status(400).send('Cannot find user')
  }
  try{
     //bcrypt compares password to hashed password
     console.log(req.body.password, user.password, user)
   if(await bcrypt.compare(req.body.password, user.password)){
     
     const accesssToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
     res.send({ accesssToken: accesssToken })

   } else {
     res.status(400).send ({error: 'Not allowed'})
   }
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})


app.get('/users', authenticateToken, (req, res) => {
  res.json(post.filter(users => users.email === req.user.email))
})


function authenticateToken (req, res, next){
  const authHeader = req.headers['authorization']
  const token =authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.enx.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

