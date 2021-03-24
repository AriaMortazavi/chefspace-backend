require('dotenv').config()

const express = require('express')

const database = require('./database.js')

const app = express()

const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = {
    host:'us-cdbr-east-03.cleardb.com',
    user:'bb491c74803cee',
    password:'261b5a80',
    database:'heroku_9a60365cb76f207',
  }


  function createUser (username, email, password, level, callback){
    var connection = mysql.createConnection(db);
    const query = `
      INSERT INTO users (username, email, password, level) VALUES (?, ?, ?, ?)
      ` 

    bcrypt.hash(password, 12, (error, hashed) => {
      if (error){
        callback(error)
        return
      }
    const params = [username, email, hashed, level]

    connection.query(query, params, function (error, result, fields) {
      connection.destroy()
      callback(error, result.insertId)
      console.log(error, result)
    })
  })
}

exports.createUser = createUser


function getUser (email, password, callback){
  var connection = mysql.createConnection(db);
  const query = `
    SELECT id, username, email, password, level
    FROM users
    WHERE email = ?
  `
    const params = [email]

    connection.query(query, params, (error, results) => {
      connection.destroy()

      if (!results || results.length===0){
        callback(Error("Wrong Log in"))
        return
    }

    const user = results [0]

    bcrypt.compare(password, user.password, (error, same) => {
      if (error){
        callback(error)
        return
      }

      if (!same){
        callback(Error("Bad password"))
        return
      }

    callback(null, user)
    })
  })
}

exports.getUser = getUser

function allUsers (callback){
  var connection = mysql.createConnection(db);
  const query = `
    SELECT *
    FROM users
  `
    connection.query(query, (error, result) => {
      connection.destroy()
      console.log(result)
      callback(error, result)   
    })
  }

exports.allUsers = allUsers


function userIdentification(req, res ,next ,id) {
  var connection = mysql.createConnection(db);
  const query = `
    SELECT *
    FROM users 
  `
  const params = [id]

    connection.query(query, (error, result) => {
      connection.destroy()
        callback(error, result)
    })
  }

exports.userIdentification = userIdentification


function changeUserInfo (callback){
  var connection = mysql.createConnection(db);
  const query = `
  UPDATE users SET username = ?, email = ?, level = ? WHERE id = ?
  `

  const params = [username, email, level]

    connection.query(query, params, (error, result) => {
      connection.destroy()
      console.log(result)
      callback(error, result)   
    })
  }

exports.changeUserInfo = changeUserInfo