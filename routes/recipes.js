const router = require('express').Router()
const { Recipe } = require('../models')

router.get('/recipes', (req, res, next) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((recipes) => res.json(recipes))
    .catch((error) => next(error))
  })
  .get('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      })
      .catch((error) => next(error))
  })
  .post('/recipes', (req, res, next) => {
    let newRecipe = req.body

    Recipe.create(newRecipe)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  .put('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    let updatedRecipe = req.body
    Recipe.findById(id).update(updatedRecipe)
      .then((recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      })
      .catch((error) => next(error))
  })
  .patch('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    let updatedRecipe = req.body
    Recipe.findById(id).update(updatedRecipe)
      .then((recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      //   Recipe.findById(id)
      //     .then((recipe) => {
      //       if (!recipe) { return next() }
      //       recipe.update(updatedRecipe)
      //         .then((newRecipe) => {
      //           res.json(newRecipe)
      //         })
      //       })
        })
      .catch((error) => next(error))
  })
  .delete('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }
        recipe.remove()
        res.json({ message: "Successfully deleted" })
      })
      .catch((error) => next(error))
  })

module.exports = router
