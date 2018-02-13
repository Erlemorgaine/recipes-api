const passport = require('passport')
const mongoose = require('mongoose')
const { User } = require('../models')
const passportJWT = require('passport-jwt')
const jwtOptions = require('./jwt')

const JwtStrategy = passportJWT.Strategy

const tokenStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  const user = User.findById(jwtPayload.id)
    .then((user) => {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch((err) => done(err, false))
})

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = passport
