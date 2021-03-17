const express = require('express')
const router = express.Router()
const burger = require('../models/burger.js')

router.get('/', (req, res) => {
  burger.all(function (data) {
    let hbsObject = {
      burgers: data
    }
    res.render('index', hbsObject)
  })
})

router.post('/api/burgers', (req, res) => {
  burger.create(['burger_name', 'devoured'],
    [req.body.burger_name, req.body.devoured],
    (result) => {
      res.json({ id: result.insertId })
    })
})

router.put('/api/burgers/:id', (req, res) => {
  let burgerId = 'id = ' + req.params.id

  burger.update({
    devoured: req.body.devoured
  }, burgerId, (result) => {
    if (result.changedRows === 0) {
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

router.delete('/api/burgers/:id', (req, res) => {
  let condition = 'id = ' + req.params.id

  burger.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

module.exports = router