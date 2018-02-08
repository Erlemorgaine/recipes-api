const router = require('express').Router()
const { User } = require('../models')
const passport = require('../config/auth')

router.get('/users/dino', passport.authorize('jwt', { session: false }), (req, res, next) => {
  if(!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  res.json(req.account)
})
router.post('/users', (req, res, next) => {
  User.register(new User({name: req.body.name, email: req.body.email}), req.body.password, (err, user) => {
    if (err) {
      err.status = 422
      return next(err)
    }

    res.status(201).send(user)
  })
})

module.exports = router