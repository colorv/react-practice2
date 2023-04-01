# React Practice - NETFILX CLONE

## Home

### To DO

## Movie Slider

### Slider

1.  leftBtn 동작할 수 있게 하기 [o]
2.  slider:hover -> leftBtn, RightBtn 보이게 하기 [o]
    - movie:hover -> Btn, pagenation 안보임
3.  Btn:hobver -> pagenation 보이기 (netfilx에서 바로 보면 확인됌) [0]
4.  화면 줄일 때 offset 최소 3, 최대 6 [o]
    - Btn 위치 맞추기 @mediaquery
5.  slider:hover ArrowIcon 보이게 하기 [o]
    - 현재 RowHeaderTtitle:hover시에만 보임
6.  ovflow : hidden 고치기
7.  window.innerwidth에 따라 slider 위치가 다름
    - next btn 눌러서 확인해보기
8.  slider 나누는 방식 다시 고민해보기 - 전부 나열후 x축으로 일정하게 옮길지 아니면 key값을 새로줄지
    - item width값을 받아오기 / width - 96%만큼 x축 왼쪽으로 이동?
9.  recoil 사용해서 img 배열 받아오기?
10. text styled Component 지우기(필요없음)
11. Title 모두보기 클릭시 modal

### PreviewModal

(그리드 item Btn사이즈 먼저 수정하기)

1. 평점, 출시일, 관람등급, 런타임 받아오기 / 현재 데이터 없이 직접 입력해서 만듬
2. 출연, 영화 특징(키워드로 대체) 받아오기 / 현재 장르만 받아옴
3. Movie Logo, 버튼(재생,추가,좋아요,나가기) 만들기
4. grid안에 상세보기 btn 수정하기 (사이즈 오류) -> [진행중]
   1. icons.tsx -> icon Size조절하기 (width,hieght, max, min)
   2.
5. 비슷한 콘텐츠 그리드로 만들기 / 데이터 하나로 3개 복사해서 테스용으로 만듬
6. 그리드 아이템 6~9개만 보여주고 버튼 클릭시 아이템 모두 볼 수 있도록 구현하기
7. @mideaQurey를 이용해서 사이즈 조절하기
8. scrollY값을 이용해서 PreviewModal 위치 조절하기
9. PreviewModal외에는 스크롤 막기
10. footer 만들기 (타이틀, 크리에이터, 감독, 출연, 장르 영화특징(키워드로대체) 관람등급)

---

MovieDB에서 YouTube key값으로 재생 파일 가져오기
IFrame Player API
key값 넣고 demo확인 - [https://developers.google.com/youtube/youtube_player_demo]
iframe 태그 이용하기 - [https://developers.google.com/youtube/player_parameters]

---

## Modal Mini

1. 삭제 시키기
2. Slider에 귀속시킴

## MarkDown 문법

1. `abcdefg` `가나다라마바사`
2. **주의사항**
3. [http://localhost:3000](http://localhost:3000)

**index.html**

<link
    href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600&family=Saira+Semi+Condensed:wght@700&display=swap"
    rel="stylesheet"
/>

### 네이밍 다시하기

1. MovieSlider
2. MOdalPreview
3. API - fetch함수 네이밍하기

### tranlateX 사용시 z-index 동작하지않음

- 슬라이더의 위치를 조절하기 위해 tranlateX를 사용했는데 아이템을 hover했을때 나타나는 아이템이 제대로 표시가 되지않아 검색을 함
- position : relative 와 z-index를 사용해서 조절 해봤지만 원하는 답을 찾지못함
- 원하는 답을 찾기 어려워 ChatGpt에게 질문했더니 tranlateX 대신 position 속성을 사용하라고 추천
- tranLateX를 left로 변경했더니 문제 해결

### slider 위치 조절하기 (leftHandle에 movie 보이기)

### scroll 위치 기억하기

### slider btn 눌렀을때 새로 들어오는 item 첫번째 opciti 0에서 1로 나타나기

- 예를 들어 page0에서 1로 넘어갈때 0에 마지막 아이템과 1에 아이템이 겹쳐 움직이면서 자연스럽지 않음

### slider offset에 따라 정렬하는데 어려움

# NETFLIX

## Shadow

    - background-image: linear-gradient(180deg, hsla(0, 0%, 8%, 0) 0,hsla(0, 0%, 8%, 0.15) 15%,
    hsla(0, 0%, 8%, 0.35) 29%, hsla(0, 0%, 8%, 0.58) 44%, #141414 68%, #141414)

# Bug

- pagination 버그 : 6에서 4로 갔을때
- curentPath 수정해야함 home에서 문제가있음
- 슬라이더 이동을 한번이라도 하면 화면 사이즈를 줄일때 따라 움직임
- 슬라이더에 img가 없는 item
- 슬라이더에 item hover시 translateX로 인해 z-index 작동하지 않음
- 슬라이더 이동시 픽셀 값이 조금 씩 안맞게 이동함
- page 하단 부분에서 item 클릭시 preview page가 뜨고 page 나갈시 scrolly 값이 위로 튐

- framer motion으로 슬라이더 만들시 netflix 와 비슷하게 만드려고 하면 position 문제가 생겨서 새로운 슬라이더가 밑에서 출연
- popuplayout 속성을 사용해서 같은 곳에서 사라지거나 나타나게 할 수 는 있으나 사라지는 슬라이더와 나타나는 슬라이더가 일정 부분에서 겹쳐서 자연스럽지 않음
- APP.tsx 에서 <Footer/> 추가시 preview page에서 Footer가 위로 올라옴 - 슬라이더를 감싸는 부분이 position : fixed

# 추가하기

- 내가 찜한 콘텐츠(locastorage) 슬라이더 없음 그리드로 만들어보기
- 언어별로 찾아보기 / 슬라이더 없음 / 검색옵션 있음
- Top10 시리즈에 사용되는 슬라이더 만들기 / number + 세로 포스터
- 메인 movie에 동영상 추가하기
- header nav item 전체 width 줄어들면 메뉴로 통합하기 (modal)
- regex 사용해서 path 제한하기
- 슬라이더 item hover시 첫번째랑 마지막 아이템은 left, right 정렬하기
- TMDB에서 movie가 아닌 tv로 시리즈 받아오기 (image가 등록되지않은 시리즈들이 많음)
- 슬라이더 item hover = pagehandle, 모두보기 hidden시키기
- 첫 로딩 이후 스크롤 내릴때 추가로 API요청 보내기
- Slider Title > 모두보기 > previewpage 처럼 동작하도록 작성

// -------- 마지막 할일 --------
// 2. slider 나누는 방식 다시 고민해보기 - 전부 나열후 x축으로 일정하게 옮길지 아니면 key값을 새로줄지
// - item width값을 받아오기 / width - 96%만큼 x축 왼쪽으로 이동?

// splice를 사용해서 movies에 새로운 배열을 추가하는 것은 좋지 않을 수 있음
// 새로운 배열을 만들어서 movies를 복사해서 붙여 놓도록 해보기
// movies.splice(0, 0, ...movies.slice(-1));
// movies.splice(movies.length, 0, ...movies.slice(1, 2));
