const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const ejs = require('ejs')
var fs = require('fs')
var mysql = require('mysql2')
var tools = require('./tools')
const { exec } = require('child_process')
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

app.post('/contact', (req, res) => {
  let ip = req.header('x-forwarded-for') || '181.209.106.242'
  return exec(`./iplookup ${ip}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    } else {
      var values = tools.buildSql(req.body, ip, stdout, connection)
      let sql = `INSERT INTO contacts SET id = DEFAULT, ${values}, created = NOW()`
      return connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        // sql ok
        res.json({
          success: true,
          message: 'Your message has been sent. Thank you for taking the time to contact us.'
        })
      })
    }
  })
})

app.post('/capture', (req, res) => {
  var url = req.body.url
  var success = false
  var uuid = ''
  var filepath = ''

  if (url) {
    url.trim()
    uuid = uuidv4()
    filepath = `${__dirname}${uploads_folder}${uuid}.jpg`
    // paths ok gather geoip
    let ip = req.header('x-forwarded-for') || '181.209.106.242'
    return exec(`./iplookup ${ip}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      } else {
        var values = tools.buildSql({ uuid: uuid, url: url }, ip, stdout, connection)
        return connection.query(`INSERT INTO captures SET id = DEFAULT, ${values}, created = NOW(), updated = NOW(), enabled = 1`, function (error, results, fields) {
          if (error) throw error;
          // database ok proceed to generate
          return exec(`wkhtmltoimage --no-stop-slow-scripts --javascript-delay 3000 ${url} ${filepath}`, (err, stdout, stderr) => {
            if (err) {
              console.log(err)
            } else {
              res.json({
                success: true,
                url: url,
                uuid: uuid
              })
            }
          })
        })    
      }
    })
  }
  res.json({
    success: false,
    url: url
  })
})


app.get('/r/:uuid', (req, res) => {
  connection.query(`DELETE FROM captures WHERE uuid = '${req.params.uuid}'`, function (error, results, fields) {
    if (error) throw error
    var data = {
      success: false,
      status: 'danger',
      title: 'Remove image',
      message: 'Something wrong happened while trying to remove this image. Please tray again later.'
    }
    var filepath = `${__dirname}${uploads_folder}${req.params.uuid}.jpg`
    fs.unlink(filepath, function(err) {
      if(err && err.code == 'ENOENT') {
        // file doens't exist
        data.message = `File doesn't exist, won't remove it.`
        data.status = 'warning'
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        data.message = `Error occurred while trying to remove file`
      } else {
        data.message = `The image was successfully removed from the system`
        data.status = 'success'
      }
      res.render(`${__dirname}/views/page.ejs`, {
        data: data
      })
    })
  })    
})

app.get('/', (req, res) => {
  connection.query(`SELECT * FROM captures WHERE enabled = 1 ORDER BY RAND() LIMIT 1`, function (error, results, fields) {
    if (error) throw error
    res.render(`${__dirname}/views/index.ejs`, {
      item: results[0]
    })
  })
})

app.get('/images', (req, res) => {
  connection.query(`SELECT * FROM captures WHERE enabled = 1 ORDER BY id DESC LIMIT 20`, function (error, results, fields) {
    if (error) throw error
    res.render(`${__dirname}/views/images.ejs`, {
      items: results
    })
  })
})

app.get('/:view', (req, res) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  if(regexExp.test(req.params.view)) {
    connection.query(`SELECT * FROM captures WHERE uuid = '${req.params.view}' AND enabled = 1`, function (error, results, fields) {
      if (error) throw error
      if (results[0]) {
        res.render(`${__dirname}/views/image.ejs`, { data: results[0] })
      } else {
        res.render(`${__dirname}/views/notfound.ejs`)  
      }      
    })
  } else {
    res.render(`${__dirname}/views/${req.params.view}.ejs`)
  }
})


app.listen(port, () => {
  console.log(`App listening to ${port}`)
})