const express = require('express')
const bodyParser = require('body-parser')
const { recipes } = require('./routes')
const PORT = process.env.PORT || 3030

let app = express()

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(recipes)

  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
