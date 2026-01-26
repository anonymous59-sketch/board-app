// boardSvc.js 모듈기능
const API_URL = "http://192.168.0.16:3000/boards";

const svc = {
  getBoards(page, callback/* 함수 */) {
    fetch(`${API_URL}/pg/${page}`)
      .then(res=> res.json())
      .then(callback)
      .catch(err => console.error(err)
    )
  },

  getTotalCount(callback) {  
    fetch(`${API_URL}/totalCount`)
      .then(res => res.json())
      .then(callback)
      .catch(err => console.error(err)
    )
  },
  
  addPost(data = {}, callback) {
    fetch(`${API_URL}`, {
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(
        data // 매개값이 객체형태로 들어오니까 중괄호 없이 바로 매개변수 입력
        // {
        // title: data.title,
        // content: data.content,
        // writer: data.writer
        // }
      )
    })
      .then(res => res.json())
      .then(callback)
      .catch(err => console.error(err))
  },

  deletePost(id, callback) {
    fetch(`${API_URL}/${id}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(callback)
      .catch(err => console.error(err));
  },
  // formatDate(date) {
  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();
  // const hour = date.getHours();
  // const min = date.getMinutes();
  // const sec = date.getSeconds();
  // return `${('0000' + year).slice(-4)}-${('0' + month).slice(-2)}-${day} ${hour}:${('0' +min).slice(-2)}:${('0' + sec).slice(-2)}`;
  // },
};

Date.prototype.toLocalFormat = function() {
  // console.log(this);
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  const day = this.getDate();
  const hour = this.getHours();
  const min = this.getMinutes();
  const sec = this.getSeconds();
  return `${('0000' + year).slice(-4)}-${('0' + month).slice(-2)}-${day} ${hour}:${('0' +min).slice(-2)}:${('0' + sec).slice(-2)}`;
}; // 자바스크립트 내장 클래스의 prototype을 통해 값을 수정하면 전역으로 수정되는 것이라서 이 파일을 import하면 내장 클래스도 같이 정보가 넘어가서 적용이 된다. 하지만 이런 방식은 프로젝트가 복잡하거나 규모가 커질수록 언제 어디에서 수정한 class가 있는지 찾기 힘들고 그 경계를 알기 힘들어 사용하거나 유지 보수가 힘들기 때문에 객체속에 매서드로 넣어서 사용하는 것이 중요하다.

// const test = 10;

export {svc};
