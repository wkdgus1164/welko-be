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
  const email = req.query.email
  const password = req.query.password

  console.log(req.query)

  connection.query(`
      SELECT *
      FROM member
      WHERE email = '${email}'
        AND password = '${password}'
  `, (error, rows) => {
    if (error) throw error

    if (rows.length <= 0) {
      res.status(500).send({
        code: 500,
        message: "요청하신 정보와 일치하는 사용자가 없습니다."
      })
    } else {
      res.send(rows)
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

module.exports = router
