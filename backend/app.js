// MVC 구조 Model(데이터베이스관련), View (화면관련), Control (제어) 프로그램 연결도가 낮아야 유지보수가 쉽다
// app.js, db.js, 
// route/(board.routes.js, member.routes.js), 
// controllers/(board.controller.js, member.controller.js),
// services/(board.serviecs.js, member.serviecs.js) 서비스는 데이터베이스 관리를 할 때 한꺼번에 동작하기 위한 묶음 코드를 만드는 곳


//// 초기 설정
// 모듈 import
const express = require('express');
const boardRoute = require('./routes/board.route.js');
const cors = require('cors');

// 인스턴스 생성
const app = express();
app.use(express.json()); // body 영역의 데이터(json포맷)을 해석하고 처리할 수 있는 기능
app.use(cors()); // cors 모듈을 사용해서 보안 정책에 대하여 허용
// 라우팅 정보
app.get('/', (req, res) => {
  res.send(`/경로 호출`);
});

app.use('/boards', boardRoute); // 라우트를 사용하여 라우팅

// 서버 생성
app.listen(3000, () => {
  console.log(`서버실행 http://192.168.0.16:3000`)
});
