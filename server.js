const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const ejs = require('ejs')
const wkhtmltoimage = require('wkhtmltoimage')
const uploads_folder = '/public/captures/'
const port = 5555

ejs.delimiter = '?'
ejs.openDelimiter = '['
ejs.closeDelimiter = ']'

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

app.post('/capture', (req, res) => {
  var url = req.body.url
  var success = false
  var filename = ''
  var filepath = ''
  if (url) {
    filename = url.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    filepath = `${__dirname}${uploads_folder}${filename}.jpg`
    console.log(url)
    console.log(filepath)
    wkhtmltoimage.generate(url, { output: filepath })
    success = true
  }
  res.json({
    success: success,
    filename: `${filename}.jpg`
  })
})

app.get('/', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/captures')
  let captures = []
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    } 
    files = files.filter(e => e !== '.gitignore')
    console.log(files)
    res.render(`${__dirname}/views/index.ejs`, { files: files })
  })  
})

app.get('/:view', (req, res) => {
  res.render(`${__dirname}/views/${req.params.view}.ejs`)
})

app.listen(port, () => {
  console.log(`App listening to ${port}`)
})