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
      res.status(401).send("로그인 정보를 확인해 주세요.")
    } else {
      res.send(rows[0].name + "님, 환영합니다.")
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

  connection.query(`
      SELECT *
      FROM member
      WHERE email = '${email}'
  `, (error, rows) => {
    if (error) throw error

    if (rows.length > 0) {
      res.status(500).send({
        code: 500,
        message: "이미 존재하는 이메일입니다."
      })
    } else {

      connection.query(`
          INSERT INTO member
              (email, name, password)
          VALUES ('${email}', '${name}', '${password}')
      `, (error, rows) => {
        if (error) throw error
        res.send({
          code: 200,
          message: "회원가입이 완료되었습니다."
        })
      })

    }
  })
})

module.exports = router
