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

  const connection = mysql.createConnection(db)

  function createUser (username, email, password, level, callback){`
      INSERT INTO users (username, email, password, level) VALUES (?, ?, ?, ?)
      `

    bcrypt.hash(password, 12, (error, hashed) => {
      if (error){
        callback(error)
        return
      }
    const params = [username, hashed, email, level]

    connection.query(query, params, function (error, result, fields) {
      callback(error, result.insertId)
      console.log(error, result)
    })
  })
}

exports.createUser = createUser


function getUser (email, password, callback){
  const query = `
    SELECT id, username, email, password, level
    FROM users
    WHERE email = ?
  `
    const params = [email]

    connection.query(query, params, (error, results) => {
      if (!results || results.length===0){
        callback(Error("Good Email"))
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
  const query = `
    SELECT *
    FROM users
  `
    connection.query(query, (error, result) => {
        callback(error, result)
    })
  }

exports.allUsers = allUsers


function userIdentification (callback){
  const query = `
    SELECT *
    FROM users
  `
    connection.query(query, (error, result) => {
        callback(error, result)
    })
  }


function userIdentification(req, res ,next ,id) {
  const query = `
    SELECT id
    FROM users
  `
    connection.query(query, (error, result) => {
        callback(error, result)
    })
      if(!id.match(/^[0-9a-fA-F]{24}$/))
        return res.status(400).send("invalid ID");
  }

exports.userIdentification = userIdentification