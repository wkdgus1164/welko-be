const express = require("express")
const mysql = require("mysql")
const dbconfig = require("./config/database")
const connection = mysql.createConnection(dbconfig)

const router = express.Router()

router.get("/", (req, res) => {
  connection.query(`
      SELECT *
      FROM travel
  `, (error, rows) => {
    if (error) throw error
    res.send(rows)
  })
})

router.get("/:id", (req, res) => {
  const id = req.params.id

  connection.query(`
      SELECT *
      FROM travel
      WHERE id = '${id}'
  `, (error, rows) => {
    if (error) throw error
    res.send(rows)
  })
})

module.exports = router
