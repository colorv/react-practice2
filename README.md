# Netflix Clone

<p align="center">
<img width="720" alt="mainImg" src="https://github.com/colorv/react-practice2/assets/75740740/6ea73178-9322-422d-91da-f86e23ba60de">
</p>

## Skill

- `React`, `TypeScript`
- `React-Query`
- `React-Router`
- `Recoil`
- `Styled-Components`, `Framer-motion`

### 사용 이유

- React 18.2.0버전을 선택한 이유
  - 강의 기준 x.x.x버전으로 진행했지만 18.2.0버전을 선택함
  - 강의 내용을 그대로 따라 치기 보다는 공식 문서를 보고 최신버전으로 학습하기 위함
  - x.x.x버전 보다 구조가 조금더 보기 편함
- Recoil을 선택한 이유
  - 장점
    - 리액트 hook과 비슷한 구조로 접근성이 좋아 선택하게되었음
  - 단점
    - [내용 추가하기]
  - 비교
    - [Redux와 비교해서 내용 추가하기]

## Project Sturucture

```
# 이전에 사용한 폴더 구조
src
├── Components
│   └── file
└── Routes
    └── file

# 변경한 폴더 구조
src
├── Components // 재사용 가능 UI 컴포넌트
│   └──
├── pages
│   └──
├── icons // icon파일
│   └──
├── utils // util 파일
│   └──
├── store // 상태관리 파일
│   └──
└── services // api파일
```

#### 변경 이유

- 작은 프로젝트지만 확장성을 생각안한 너무 단순한 구조
- 앞으로 큰 프로젝트를 한다 가정하고 각 파일들을 용도에 맞게 분류 해보기 위함

## 생각, 고민

1. framer motion으로 슬라이더 만들시 netflix 와 비슷하게 만드려고 하면 position 문제가 생겨서 새로운 슬라이더가 밑에서 출연

   - popuplayout 속성을 사용해서 같은 곳에서 사라지거나 나타나게 할 수 는 있으나 사라지는 슬라이더와 나타나는 슬라이더가 일정 부분에서 겹쳐서 자연스럽지 않음
     - 슬라이더 좌,우 padding 값만큼 빼거나 더해서 해결
   - framer motion을 사용하지 않고 transform: `translateX(-${슬라이더크기 * page}px)`을 사용해서 슬라이더 구현했을 경우
     - translateX를 사용하면 hover했을때 나타나는 movie의 z-index 문제가 생겨 일부분 잘리는 현상이 있음
     - tranlateX 대신 left를 사용하면 z-index 문제는 해결됌
   - 슬라이더 마지막 페이지에서 offset에 따라 빈 부분이 발생 , 마지막 페이지 에서 오른쪽 버튼에 첫번째 아이템이 와야함
     - 배열의 길이 % offset 을 이용해 배열의 값을 재배치해서 해결
   - 마지막 페이지에서 처음 페이지로 돌아가면 animation 효과가 반대로 진행함
     - framer motion을 사용해서 새로운 슬라이더가 계속 나타나도록해서 해결함

2. 중복되는 코드 줄이기

   - 문제점
     - Home을 기준으로 다른 page에 복사 붙여넣기로 만들어 유지보수가 어려움
   - 해결방법
     - layout 만들어서 통합하기

3. pagination<br/>
   슬라이더 현재 어떤 페이지에 있는지 알려줌

   - 문제
     - 화면크기에 따라 offset을 조절하기 때문에 page가 증거하거나 감소한다.
     - 화면크기가 작아지면 page 값이 증가하는데 page 끝에서 화면 크기를 키우면 현재 어떤 페이지인지 알 수 없게되는 현상
   - 해결방법
     - [내용추가]

4. Nav - 메뉴 hover

   - 문제
     - 메뉴 hover상태에서 modal창이 나타나지만 메뉴에서 마우스가 벗어나는 순간 사라지는 현상
   - 해결방법

5. slider hover 문제

   - 문제
     - 현재 슬라이더에 item hover시 작동을 안하거나 부자연스럽게 작동함
   - 해결방법
     - [내용추가]

```
위에 추가할지 생각해보기

- APP.tsx 에서 `<Footer/>` 추가시 preview page에서 Footer가 위로 올라옴
- 슬라이더 이벤트(이전,다음 페이지 이동)
  - 페이지 이동시 배열을 잘라서 뒤로 붙이는 식으로 구현함
  - 불필요하게 배열을 만들어서 사용하는것보다 슬라이더 크기값 만큼 이동시키면 좋지 않을까 생각중
- API에 IMG가 없는 문제

```

# 수정하기

- GitHub.io
  - [x] https://colorv.github.io/react-practice2/ - github.io 404 해결하기
- ScrollY
  - [ ] page 하단 부분에서 item 클릭시 preview page가 뜨고 page 나갈시 scrolly 값이 위로 튐
- 반응형
  - [x] Main Movie 화면 줄어 들었을때 overView 없애거나 줄 수를 줄이기
  - [x] Header - 화면 줄어 들었을때 "메뉴"로 통합시키기
  - [ ] 모바일 화면에서 media query 미적용 수정하기
- Movie Slider
  - [x] backDrop_img 없는 item은 텍스트로 표시하기
  - [x] 슬라이더 이동을 한번이라도 하면 화면 사이즈를 줄일때 따라 움직임
  - [x] 슬라이더에 item hover시 translateX로 인해 z-index 작동하지 않음
  - [x] API에서 img가 없는 경우에도 img없이 자리를 차지함
  - [x] 첫번째랑 마지막 item이 hover시 슬라이더 padding값을 넘기지 않게 수정하기
  - [ ] hover상태에서 sliderHandle, 모두보기 숨기기
  - [ ] 슬라이더 movie hover시 부자연스러움
  - [ ] pagination 버그 : 6에서 4로 갔을때
- Font
  - [ ] Chrome, Safari : font 다르게 적용되고 있어 수정 필요

# 추가하기

- 내가 찜한 콘텐츠(Mylist.tsx)
  - [x] localstorage 저장
  - [x] mylist page에서 삭제시 movie 사라지게하기
  - [x] 추가 삭제 utils.ts에 추가하기
  - [x] previewModal mylist로 추가하는 버튼 만들기
  - [x] [myListMovies, setMyListMovies] recoil로 관리하기
  - [ ] hover(miniModal)에서 추가하면 hover 풀림 고치기
- 언어별로 찾아보기(OriginalAudio.tsx)
  - [x] 슬라이더 사용하지 않고 그리드로 movies 보여주기
- 슬라이더(세로 포스터)
  - [x] Top10에 사용되는 슬라이더 만들기 (기존 가로형 슬라이더 사용중)
- onClickPreview
  - [ ] page별로 중복돼서 사용중이므로 utils.ts로 통합해보기
- Nav
  - [ ] 미디어쿼리 사용해서 width 줄어들면 메뉴만 표시
  - [ ] 메뉴 hover시 modal창 띄우기
- regex
  - [ ] path 제한하고 원치 않는곳은 404 페이지로 보내기
- Tv
  - [ ] TMDB에서 movie가 아닌 tv로 시리즈 받아오기
- API
  - [ ] 첫 로딩 이후 일 부분만 보여주고, 스크롤 내릴때 추가로 API요청 보내기
- 모두보기 Modal
  - [ ] Preview page처럼 allVideos Component만들기
- Video
  - [ ] API에서 YouTube key값 받아와서 예고편 실행 시키기
    - key값 넣고 demo확인 - [https://developers.google.com/youtube/youtube_player_demo]

# Task

```
임시
```

<img width="607" alt="Task" src="https://github.com/colorv/react-practice2/assets/75740740/54b61958-bb62-4d0e-9d00-497272e05670">
<a href="https://suhyeok0110.notion.site/74f22d80cf274ec5aeb96a50d82bfd60?v=7b7fb0fd96fd485f8da369d943f79162">링크</a>

# Installation

React 버전은 최신 버전인 18.2.0으로 개발 했습니다.<br/>
필요에 따라 NPM 사이트에서 프로젝트 생성일 기준 최신버전으로 설치했습니다.

<pre><code>$ npm install</code></pre>

## Version

- React : 18.2.0
- React-query : 3.39.2
- React Router : 6.6.1
- TypeScript : 4.9.4
- Recoil : 0.7.6
- styled-components : 5.3.6
- Framer-Motion : 8.0.2

## Environment

환경 변수는 프로젝트의 루트 패스 기준으로 `.env` 파일을 생성해서 내용을 기입해주세요.
<img width="298" alt="스크린샷 2023-06-01 오후 9 53 07" src="https://github.com/colorv/react-practice2/assets/75740740/c6d162a0-7a68-40de-807e-c54b632ad13b">

<p align="center">
</p>

### 환경변수 내용

- API Key
  - <a href="https://colorv.github.io/react-practice2/">TMDB</a> 사이트에서 회원가입 후 key값을 입력하면 됩니다.

```javascript
// API key
REACT_APP_API_KEY=
PUBLIC_URL=/react-practice2
```

## Running the app

<pre><code>$ npm start</code></pre>
