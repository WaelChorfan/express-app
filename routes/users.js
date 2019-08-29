var express = require('express')
var router = express.Router()
var mysql = require('mysql')

/* GET users listing. */

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd'
})

connection.connect()



//select

router.get('/', function (req, res, next) {

  connection.query('SELECT * from clients  ', function (error, results) {
    if (error) throw error
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
    res.render('users', { users: resultArray })
  })

})



router.post('/', function (req, res) {
  var data = req.body
  connection.query('INSERT INTO clients(nom, prenom) VALUES ("' + data.nom + '" , "' + data.prenom + '")',
    function (error, results, fields) {
      if (error) throw error
      res.redirect('/users')
    })
})



router.post('/delete', function (req, res) {
  var data = req.body
  connection.query('delete from  clients where id = ' + data.id,
    function (error, results, fields) {
      if (error) throw error
      res.redirect('/users')
    })

})


module.exports = router
