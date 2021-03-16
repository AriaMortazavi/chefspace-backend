const express = require('express')

const database = require('./database.js')

const app = express()

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