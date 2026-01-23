// board.js
import {svc} from './boardSvc.js'; // 모듈 불러오기 , 모듈사용하면 html에 type으로 module을 적어줘야한다. 
// console.log(svc);

const loadBoards = (page = 1) => {
  svc.getBoards(page, result => {
      // console.log(result);
      const tbody = document.querySelector('#boardList');
      tbody.innerHTML = '';
      const fields = ["id", "title", "writer", "created_at"];
      result.forEach(data => {
        const tr = document.createElement('tr');
        fields.forEach(col => {
          const td = document.createElement('td');
          if(col == 'created_at') {
            td.textContent = new Date(data[col]).toLocalFormat()
            tr.appendChild(td);
          } else {
            td.textContent = data[col];
            tr.appendChild(td);
          }
        });
        tbody.appendChild(tr);
      });
  });
  // fetch(`${API_URL}/pg/${page}`)
  //   .then(res=> res.json())
  //   .then(result => {
  //     // console.log(result);
  //     const tbody = document.querySelector('#boardList');
  //     tbody.innerHTML = '';
  //     const fields = ["id", "title", "writer", "created_at"];
  //     result.forEach(data => {
  //       const tr = document.createElement('tr');
  //       fields.forEach(col => {
  //         const td = document.createElement('td');
  //         if(col == 'created_at') {
  //           td.textContent = new Date(data[col]).toLocalFormat()
  //           tr.appendChild(td);
  //         } else {
  //           td.textContent = data[col];
  //           tr.appendChild(td);
  //         }
  //       });
  //       tbody.appendChild(tr);
  //     });
  //   })
  //   .catch(err => console.error(err)
  //   // CORS => 동일한 출처만 허용하겠다는 보안상 정책
  //   // http(프로토콜), 호스트(localhost), port(3000, 5500)을 맞춰야함
  //   // app.js에 서버 요청 방식과 호스트 등등을 허용하는 코드를 집어넣거나 npm install cors를 설치하고 그 모듈을 사용하기
  // );
}
loadBoards();

let page = 1;
const loadPagingList = () => {
  const pagination = document.querySelector('nav.pagination');
  pagination.innerHTML = '';
  const cb = result => {
    // console.log(result);
    const totalCnt = result;
    let endPage = Math.ceil(page / 5) * 5; 
    let startPage = endPage - 4;
    let realEndPage = Math.ceil(totalCnt / 7);
    endPage = endPage > realEndPage ? realEndPage : endPage;
    let prev = startPage == 1 ? false : true;
    let next = endPage < realEndPage ? true : false;
    
    const prevBtn = document.createElement('a');
    prevBtn.className = 'page prev';
    prevBtn.textContent = '«';
    prevBtn.setAttribute('href', '#');
    prevBtn.setAttribute('data-page', startPage - 1);
    prev ? prevBtn.classList.remove('disabled') : prevBtn.classList.add('disabled');
    pagination.appendChild(prevBtn);

    for(let pg = startPage; pg <= endPage; pg++) {
      let aTag = document.createElement('a');
      aTag.className = 'page';
      aTag.setAttribute('href', '#');
      aTag.textContent = pg;
      aTag.setAttribute('data-page', pg);
      if(pg == page) {
        aTag.classList.add('active');
      } else {
        aTag.classList.remove('active');
      }
      pagination.appendChild(aTag);
    }

    const nextBtn = document.createElement('a');
    nextBtn.className = 'page next';
    nextBtn.textContent = '»';
    nextBtn.setAttribute('href', '#');
    nextBtn.setAttribute('data-page', endPage + 1);
    next ? nextBtn.classList.remove('disabled') : nextBtn.classList.add('disabled');
    pagination.appendChild(nextBtn);

  };

  svc.getTotalCount(cb);
  // fetch(`${API_URL}/totalCount`)
  //   .then(res => res.json())
  //   .then(result => {
  //     // console.log(result);
  //     const totalCnt = result;
  //     let endPage = Math.ceil(page / 5) * 5; 
  //     let startPage = endPage - 4;
  //     let realEndPage = Math.ceil(totalCnt / 7);
  //     endPage = endPage > realEndPage ? realEndPage : endPage;
  //     let prev = startPage == 1 ? false : true;
  //     let next = endPage < realEndPage ? true : false;
      
  //     const prevBtn = document.createElement('a');
  //     prevBtn.className = 'page prev';
  //     prevBtn.textContent = '«';
  //     prevBtn.setAttribute('href', '#');
  //     prevBtn.setAttribute('data-page', startPage - 1);
  //     prev ? prevBtn.classList.remove('disabled') : prevBtn.classList.add('disabled');
  //     pagination.appendChild(prevBtn);

  //     for(let pg = startPage; pg <= endPage; pg++) {
  //       let aTag = document.createElement('a');
  //       aTag.className = 'page';
  //       aTag.setAttribute('href', '#');
  //       aTag.textContent = pg;
  //       aTag.setAttribute('data-page', pg);
  //       if(pg == page) {
  //         aTag.classList.add('active');
  //       } else {
  //         aTag.classList.remove('active');
  //       }
  //       pagination.appendChild(aTag);
  //     }

  //     const nextBtn = document.createElement('a');
  //     nextBtn.className = 'page next';
  //     nextBtn.textContent = '»';
  //     nextBtn.setAttribute('href', '#');
  //     nextBtn.setAttribute('data-page', endPage + 1);
  //     next ? nextBtn.classList.remove('disabled') : nextBtn.classList.add('disabled');
  //     pagination.appendChild(nextBtn);

  //   })
  //   .catch(err => console.error(err)
  // );
}
loadPagingList();


document.querySelectorAll('nav.pagination>a').forEach(elem => {
  elem.addEventListener('click', e => {
    const aTag = e.target;
    const pageNum = aTag.innerText;
    loadBoards(pageNum);
  });
});

document.querySelector('nav.pagination').addEventListener('click', e => {
  if(e.target.tagName == 'A') {
    // console.log(e.target.innerText);
    let selectPage = e.target.dataset.page;
    page = selectPage;
    loadBoards(page);
    loadPagingList();
  };
});

window.createPost = function createPost() {
  const title = document.querySelector('input#title').value;
  const content = document.querySelector('textarea#content').value;
  const writer = document.querySelector('input#writer').value;
  const post = {title, content, writer}
  // console.log(post);
  const cb = () => {

  }
  svc.addPost(post, cb);
}