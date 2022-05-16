const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const ejs = require('ejs')
var mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid')
const wkhtmltoimage = require('wkhtmltoimage')
const uploads_folder = '/public/captures/'
const port = 5555
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWD,
  database : process.env.DB_NAME
})
 
connection.connect()

ejs.delimiter = '?'
ejs.openDelimiter = '['
ejs.closeDelimiter = ']'

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

app.post('/capture', (req, res) => {
  console.log('/capture')
  var url = req.body.url
  var success = false
  var uuid = ''
  var filepath = ''
  if (url) {
    uuid = uuidv4()
    filepath = `${__dirname}${uploads_folder}${uuid}.jpg`
    let sql = `INSERT INTO captures SET uuid = '${uuid}', url = '${url}', created = NOW(), updated = NOW(), enabled = 1`
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log('The query ran good', results);
    })    
    // filename = url.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    return wkhtmltoimage.generate(url, { output: filepath }, (code, signal) => {
      res.json({
        success: true,
        url: url,
        filename: `${uuid}.jpg`
      })
    })
  }
  res.json({
    success: false,
    filename: `${filename}.jpg`
  })
})

app.get('/', (req, res) => {
  let sql = `SELECT * FROM captures WHERE enabled = 1 ORDER BY id DESC`
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.render(`${__dirname}/views/index.ejs`, {
      files: results
    })
  })    
})

app.get('/:view', (req, res) => {
  res.render(`${__dirname}/views/${req.params.view}.ejs`)
})

app.listen(port, () => {
  console.log(`App listening to ${port}`)
})