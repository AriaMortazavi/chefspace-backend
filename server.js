const express = require('express')

const database = require('./database.js')

const app = express()

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
app.get('/users', (req, res) => {
  const users = database.allUsers()
  res.json(
    users
  )
})

app.post('/createusers', async (req, res) => {
  const users = database.allUsers()
  try{
  const hashedPassword = await bcrypt.hash(req.body.password, 10) //the 10 is to salt the hash to increase security
  const newUser = {username: req.body.username, email: req.body.email,level: req.body.level, password: hashedPassword }
  users.push(newUser)
  res.status(201).send()
  }catch{
    res.status(500).send()
  }
})

app.post('/createusers/login', async (req, res) => {
  const users = database.allUsers()
  const createusers = users.find(user => user.email = reeq.body.email)
  if (user == null){
    return res.status(400).send('Cannot find user')
  }
  try{
     //bcrypt compares password to hashed password
   if(await bcrypt.compare(req.body.password, user.password)){
    res.send('Sucess')
   } else {
     res.send ('Not allowed')
   }
  } catch {
    res.status(500).send()
  }
})