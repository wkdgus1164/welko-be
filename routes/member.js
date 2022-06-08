const express = require("express")
const mysql = require("mysql")
const dbconfig = require("./config/database")
const connection = mysql.createConnection(dbconfig)

const router = express.Router()

router.get("/", function(req, res, next) {
  res.send("respond with a resource")
})

module.exports = router
