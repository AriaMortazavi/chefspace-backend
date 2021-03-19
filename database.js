let posting = [
  {
    id: 1,
    postImg: "url(https://assets1.ignimgs.com/2019/05/31/mario-64---button-1559263987447.jpg)",
    postText: "This is my recipe",
    postLike: 6,
    postDislike: 1,
  },
]
require('dotenv').config()

const express = require('express')

const database = require('./database.js')

const app = express()

const jwt = require('jsonwebtoken')

var mysql = require('mysql');

const db = mysql.createConnection({
  host='us-cdbr-east-03.cleardb.com',
  user='bb491c74803cee',
  password='261b5a80',
  database='heroku_9a60365cb76f207',
})

db.connect( (error) => {
  if (error){
    console.log(error)
  } else {
    console.log("MY SQL CONNECTED....")
  }
})

function allPosts() {
  return posting
}
exports.allPosts = allPosts

function createPost(recipe) {
  recipe.id = posting.length + 1
  posting.push(recipe)
  return recipe
}
exports.createPost = createPost




function allUsers() {
  return db
}
exports.allUsers = allUsers



