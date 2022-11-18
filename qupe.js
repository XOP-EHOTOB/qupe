require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const https = require('https')

const mongoose = require('mongoose')

const options = {
    ca: fs.readFileSync('./data/https/qupe.pw_le3.ca'),
    crta: fs.readFileSync('./data/https/qupe.pw_le3.crtca'),
    key: fs.readFileSync('./data/https/qupe.pw_le3.key'),
    cert: fs.readFileSync('./data/https/qupe.pw_le3.crt'),
}

const app = express()
app.use(express.json({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/link', require('./routes/link.routes'))
app.use('/api/link', require('./routes/redirect.routes'))

const server = https.createServer(options, app)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
  
async function start() {
    try {
      await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      server.listen(process.env.PORT, () => console.log(`SERVER STARTED ON PORT ${process.env.PORT}...`))
    } catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
    }
  }
  
start()