const express = require('express')
const morgan = require('morgan')
const basicAuth = require('express-basic-auth')
const randomstring = require('randomstring')

const data = [ //이건 메모리위에 가짜데이터 테스트용으로 이렇게 
   //{longUrl: 'http://google.com', id: '58DX37' }
   {
     longUrl: 'http://google.com', 
     id: randomstring.generate(6) 
   }

]

const app = express()

//https://www.npmjs.com/package/express-basic-auth 첼린지 부분 위에 const
app.use(basicAuth({
  users: { 'admin': '1234' },
  challenge: true,
  realm: 'Imb4T3st4pp'
}))


//express가 자동으로 ejs를 불러와서 탬플릿엔진으로 사용할수있음
app.set('view engine', 'ejs')
app.use('static', express.static('public')) //public폴더안에 index.css파일들을 서버에서 static이란 파일에서 제공하겠다.
//그래서 ejs에서 경롤f static.index.css 라고 써야함
app.use(morgan('tiny')) //tiny 모르간이 기본제공 포맷


app.get('/',(req,res) => {
  res.render('index.ejs', {data})
})


app.get('/:id', (req,res) => {  // http://localhost:3000/6자리쇼트너 이동확인 
  const id = req.params.id
  const matched = data.find(item => item.id === id)//판별함수 find에넘겨  id가 같은지 발견하면 리턴
  if (matched){
    res.redirect(301, matched.longUrl) //
  }else {
    res.status(404)  //싦무에서 이러면 사용자가 싫어해
    res.send('404 Not Found')
  }

})

app.listen(3000, () => { //listen해야 서버가 구동
  console.log('listening...')
})

