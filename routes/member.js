const express = require("express")
const mysql = require("mysql")
const dbconfig = require("./config/database")
const connection = mysql.createConnection(dbconfig)

const router = express.Router()

router.get("/", (req, res) => {
  connection.query(`
      SELECT *
      FROM member
  `, (error, rows) => {
    if (error) throw error
    res.send(rows)
  })
})

router.get("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  console.log(email, password)

  connection.query(`
      SELECT *
      FROM member
      WHERE email = '${email}'
        AND password = '${password}'
  `, (error, rows) => {
    if (error) throw error

    if (rows.length <= 0) {
      res.status(401).send("No member found with this information.")
    } else {
      res.send("Welcome, " + rows[0].name + "!")
    }

  })
})

router.get("/:id", (req, res) => {
  const id = req.params.id

  connection.query(`
      SELECT *
      FROM member
      WHERE id = '${id}'
  `, (error, rows) => {
    if (error) throw error
    res.send(rows)
  })
})

router.post("/", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  if (!name || !email || !password) {
    res.status(401).send("Please check your input.")
  }

  connection.query(`
      SELECT *
      FROM member
      WHERE email = '${email}'
  `, (error, rows) => {
    if (error) throw error

    if (rows.length > 0) {
      res.status(401).send("Already existing email.")
    } else {

      connection.query(`
          INSERT INTO member
              (email, name, password)
          VALUES ('${email}', '${name}', '${password}')
      `, (error, rows) => {
        if (error) throw error
        res.send("Register complete.")
      })

    }
  })
})

module.exports = router
