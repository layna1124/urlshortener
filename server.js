const express = require('express')
const app = express()

app.get('/',(req,res) => {
  res.send('hello express')
})


app.listen(3000, () => { //listen해야 서버가 구동
  console.log('listening...')
})

