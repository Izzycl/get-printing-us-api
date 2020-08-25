const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('USER SIGNIN')
})

router.post('/printer', (req, res) => {})

router.post('/normal', (req, res) => {
  res.send('USER Normal')
})

module.exports = router
