const express = require('express')
const morgan = require('morgan')
const basicAuth = require('express-basic-auth')
const randomstring = require('randomstring')
const bodyParser = require('body-parser')


const data = [ //이건 메모리위에 가짜데이터 테스트용으로 이렇게 
   //{longUrl: 'http://google.com', id: '58DX37' }
   {
     longUrl: 'http://google.com', 
     id: randomstring.generate(6) 
   }

]

const app = express()

//폼전송에 미들웨어 
app.use(bodyParser.urlencoded({ extended: false }))

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

//form 전송받고나면 리다이렉트 시켜야한다. 
//인풋박스에 http://naver.com 넣으면 짧은url생성 
app.post('/', (req, res) => {
  //body에 롱url이
  const longUrl = req.body.longUrl
  //id가 바껴야 하니까 컨스트 보다 렛
  let id;
  while(true){  //안겹칠때까지 계속 반복 while 와일문
    const candidate = randomstring.generate(6) //제너레이트함수써서 맏는거 불러와
    const matched = data.find(item => item.id === candidate) // find
    //다른함수에 썼지만 , 함수안이니까 괜찮아. 여기선 matced있으면 나쁜것 -돌아가기
    if(!matched){ //잘된것
    id = candidate
    break
    }
  } //while밖으로 나왔다는 것은 중복이 없는 아이디를 찾았다는 뜻 
 data.push({id,longUrl})
 res.redirect('/')
})


app.listen(3000, () => { //listen해야 서버가 구동
  console.log('listening...')
})

