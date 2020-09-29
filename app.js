// Require express and server related variables
const express = require('express')
const app = express()
const port = 3000

// Define log functions
function serverLog(req, res, next) {
  const start = Date.now()
  const timeLog = timeStamps()

  res.on('finish', () => {
    const end = Date.now()
    const duration = end - start
    console.log(`${timeLog} | ${req.method} from ${req.originalUrl} | total time: ${duration}ms`)
  })

  next()
}

function timeStamps() {
  const timeNow = new Date()
  const year = timeNow.getFullYear()
  const month = timeNow.getMonth() + 1
  const date = timeNow.getDate()
  const hour = timeNow.getHours()
  const min = timeNow.getMinutes()
  const sec = timeNow.getSeconds()
  const timeStamps = `${year}-${month}-${date} ${hour}:${min}:${sec}`
  return timeStamps
}

// Set middleware as server log
app.use((req, res, next) => {
  const { id } = req.params
  if (id !== 'favicon.ico') {
    serverLog(req, res, next)
  }
})

// Set routes
app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆 Todo')
})

// Listen to server
app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`)
})
