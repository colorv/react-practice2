# Netflix Clone

## Description

- 클론 코딩을 통해 React, TypeScript 학습
- 강의 내용을 그대로 따라 치거나 끝내는 것이 아닌 스스로 문제점을 찾고 해결하는 습관 기르기

<p align="center">
<img width="400" alt="변경전" src="https://github.com/colorv/react-practice2/assets/75740740/934a7ddb-9bda-43f9-88ee-f5307e637dfe">
<img width="400" alt="변경후" src="https://github.com/colorv/react-practice2/assets/75740740/b3c931aa-8d45-498b-bb7f-5ebb81c2e8f7">
</p>
<div style="display: flex;justify-content: space-around;">
<span>변경전(<a href="https://nomadcoders.github.io/react-masterclass/">바로가기</a>)</span>
<span>변경후(<a href="https://colorv.github.io/react-practice2/">바로가기</a>)</span>
</div>

## Skill

- `React`, `TypeScript`
- `React-Query`, `React-Router`, `React-lazy-load`
- `Recoil`
- `Styled-Components`, `Framer-motion`

## Challenge & Experience

### 1. Carousel Slider 구현 - Framer Motion

- 반응형 슬라이더로 구현하기 위해 onResize 이벤트를 통해 화면 크기에 따라 offset을 설정했습니다.

  ```js
  const onResize = () => {
    const width = window.innerWidth;
    const offsets = [
      { width: 1400, offset: 6 },
      { width: 1100, offset: 5 },
      { width: 800, offset: 4 },
      { width: 0, offset: 3 },
    ];
    const offset = offsets.find((item) => width >= item.width)?.offset || 6;
    setOffset(offset);
  };
  ```

- 이전 페이지나 다음 페이지로 이동 시 offset의 값에 따라 배열의 순서를 변경하여 슬라이더 아이템이 나타나도록 구현했습니다.
  <img width="699" alt="offset" src="https://github.com/colorv/react-practice2/assets/75740740/7a5f7eda-6fbc-40ce-af67-11c2b2534b57">

#### 문제

- 클릭 이벤트 시 새로운 슬라이드가 아래에서 자리를 차지하며 나타나는 현상
- transform 속성을 사용할 경우, hover 시 나타나는 아이템이 슬라이드에 가려지는 문제
- 슬라이드 애니메이션이 부자연스럽게 동작하는 문제
- 이미지 파일이 없는 경우 빈 공간 생기는 문제

#### 해결 과정

- position : absolute가 아닌 reletive 속성을 사용해 새로 나타나는 슬라이드가 밑에서 자리를 차지하면서 출현하는 문제가 있어 공식 문서를 참조해 mode : “poplayout”을 설정해서 해결했습니다.
- 검색을 통해 transform 속성을 사용할 경우 새로운 stacking context에 배치되기 때문에 z-index 문제가 발생하는 것을 알게 되었고 해결 방안을 찾아 프로젝트에 적용해 보았으나 원하는 결과를 얻지 못했습니다. 이에 따라 translate와 left의 차이점에 대해 알아보고, 성능 측면에서는 translate보다 좋지 않지만, 차선책으로서 left를 사용하게 되었습니다.
- 슬라이드 이동 값을 padding을 포함한 width 값으로 설정해서 생긴 문제로 padding 값을 제외한 width 값으로 이동하도록 수정하여 문제를 해결했습니다.
- API에 등록된 Img가 없는 경우가 있어 영화 제목으로 대체 했으며 logo가 없는 img도 하단에 영화 제목으로 logo를 대신했습니다.

#### Reference

- [AnimatePresence | Framer for Developers](https://www.framer.com/motion/animate-presence/)
- [z-index가 동작하지않는 이유 4가지 (그리고 고치는 방법)](https://erwinousy.medium.com/z-index%EA%B0%80-%EB%8F%99%EC%9E%91%ED%95%98%EC%A7%80%EC%95%8A%EB%8A%94-%EC%9D%B4%EC%9C%A0-4%EA%B0%80%EC%A7%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EA%B3%A0%EC%B9%98%EB%8A%94-%EB%B0%A9%EB%B2%95-d5097572b82f)
- [[CSS] "translateX" vs "left"](https://velog.io/@sarang_daddy/CSS-translateX-vs-left)
- [HTML5 transform:translate 와 top/left 성능 비교 | WIT블로그](https://wit.nts-corp.com/2013/11/20/378)

---

### 2. pagination 구현

- API에서 받은 배열의 길이를 offset으로 나눠 반응형 pagination을 구현했습니다.
- 현재 페이지의 위치를 표시하기 위해 page 값과 index 값이 같을 경우 클래스 이름을 다르게 설정해 현재 위치를 표시했습니다.
  ```jsx
  <Pagination className="pagination">
    {offset > 0 &&
      Array.from({ length: Math.ceil(movies.length / offset) }).map(
        (_, index) => (
          <Page
            className={page === index ? "selected" : ""}
            key={`page${index + 1}`}
            transition={{ delay: 0.5 }}
          />
        )
      )}
  </Pagination>
  ```

#### 문제

- 화면의 너비를 최소로 설정한 상태에서 페이지를 맨 끝으로 이동시킨 후 화면 너비를 키우면 페이지 정보를 알 수 없는 문제가 발생합니다.

#### 해결 과정

- 반응형으로 구현되어 offset은 변경되지만, page 값은 변경되지 않는 상태에서 화면 너비를 늘리면 page 값이 최댓값을 초과하는 문제로 이를 해결하기 위해 reszie 이벤트에 추가로 페이지값을 변경하도록 수정했습니다.
  - page값이 pageMaxIndex 값보다 큰 경우 pageMax 값을 page에 할당했습니다.
  - page값이 pageMaxIndex 값보다 작은 경우 그대로 할당해 변경이 없도록 했습니다.

```jsx
const onResize = () => {
  const width = window.innerWidth;
  const offsets = [
    { width: 1400, offset: 6 },
    { width: 1100, offset: 5 },
    { width: 800, offset: 4 },
    { width: 0, offset: 3 },
  ];
  const offset = offsets.find((item) => width >= item.width)?.offset || 6;

  setPage(([page, direction]) => {
    const pageMaxIndex = Math.ceil(newMovieIds.length / offset) - 1;
    if (page > pageMaxIndex) {
      return [pageMaxIndex, direction];
    }
    return [page, direction];
  });
  setScreenWidth(width);
  setOffset(offset);
};
```

---

### 3. Lazy Loading으로 이미지 로딩 속도 개선

#### 개요

슬라이더를 새로 추가할 때마다 불러와야 할 이미지가 많아 이를 개선 하고자 레이지 로딩을 적용해 봤습니다.

#### 문제

- 이미지 태그에 LazyLoad를 적용하면 슬라이더 내의 모든 이미지를 로딩하는 것이 아니라 보이는 부분만 로딩하는 현상이 발생합니다.
- 로딩 중을 나타내는 플레이스홀더가 없어 이미지가 로딩되기 전에 빈 공간이 생기는 문제가 있습니다.
  <img width="600" alt="empty space" src="https://github.com/colorv/react-practice2/assets/75740740/d8c7f6a6-b815-433c-a376-a02daf431c84">

#### 해결 과정

- 슬라이더 내의 모든 이미지를 로딩하기 위해 이미지 태그가 아닌 이미지를 담고 있는 태그에 LazyLoad을 적용하여 문제를 해결하였습니다.
- 로딩되기 전에 빈 공간이 생기는 문제를 해결하기 위해 lazyLoaded state를 만들어 해결했습니다. 로딩되기 전에는 해당 이미지 대신 영화 제목을 표시하여 로딩 상태를 시각적으로 표현하고 이미지 로딩이 완료되면 이미지가 영화 제목 위에 나타나도록 처리하였습니다.

  ```jsx
  const [lazyLoaded, setLazyLoaded] = useState(false);

  <Slider>
    <Header>
      <Title></Title>
    </Header>
    {lazyLoaded ? null : <Main></Main>}
    <LazyLoad onContentVisible={() => setLazyLoaded(true)} offset={500}>
      <Main></Main>
    </LazyLoad>
  </Slider>;
  ```

#### 결과

- 개발자 도구를 이용해 느린 3G 네트워크 환경에서 테스트한 결과, 리소스 크기를 7.0MB에서 5.1MB로 줄이고 로딩 시간을 3.5분에서 2.8분으로 개선하였습니다.

#### Reference

- [웹 성능 개선 - 이미지 lazy loading(리액트)](https://petaverse.pe.kr/entry/%EC%9B%B9-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0-%EC%9D%B4%EB%AF%B8%EC%A7%80-lazy-loading%EB%A6%AC%EC%95%A1%ED%8A%B8)

- [웹 성능 최적화를 위한 Image Lazy Loading 기법](https://helloinyong.tistory.com/297)

---

### 4. 프로젝트 폴더 구조 개선

#### 개요

- 작은 프로젝트지만 확장성을 생각 안 한 너무 단순한 구조로 코드 관리의 어려움이 있을 것 같아 구조를 개선해 봤습니다.

#### 폴더구조

```
# 이전에 사용한 폴더 구조

src
├── components
└── Routes

# 변경한 폴더 구조

src
├── common
│ └── types
├── components // 재사용 가능 컴포넌트
├── constants // 공통 상수
├── icons // 아이콘
├── pages // 페이지 컴포넌트
├── services // API
├── store // Recoil
└── utils // 공통 함수
```

#### 느낀 점

- 기존에는 파일 생성을 components 폴더에만 하다 보니 한눈에 안 들어오는 문제점이 생겼습니다.
- 검색을 통해 알게 된 사실은 프로젝트 폴더 구조에는 정해진 정답은 없지만 일반적으로 사용되는 공통적인 폴더 구조가 있다는 것을 알게 되었습니다.
- 효율적인 관리를 위해 폴더 구조를 변경하고 기존의 파일들을 분류했습니다.

#### Reference

- [React | 리액트로 프로젝트를 진행할때 어떻게 폴더와 컴포넌트 구조를 설계하는 것이 좋을까?🤔](https://velog.io/@_seeul/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A1%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-%EC%A7%84%ED%96%89%ED%95%A0%EB%95%8C-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EC%9E%A1%EB%8A%94%EA%B2%83%EC%9D%B4-%EC%A2%8B%EC%9D%84%EA%B9%8C)

- [[React] 리액트의 폴더 구조](https://velog.io/@sisofiy626/React-리액트의-폴더-구조)

- [파일 구조 – React](https://ko.legacy.reactjs.org/docs/faq-structure.html)

---

### 5. 중복되는 코드 줄이기

#### 개요

- 새로 만든 페이지들이 Home을 기반으로 복사 붙여넣기 하여 작성한 결과, 유지 보수가 어렵고 재사용성이 좋지 않았습니다.

#### 해결 과정

- 코드 리팩토링을 통해 기존 페이지의 중복 코드를 줄여 200줄 이상의 코드를 88줄로 줄였습니다.
- 슬라이더를 추가할 때마다 9줄씩 늘어나던 코드를 객체 배열로 변경하여, title과 option 값만 입력하면 1줄로 슬라이더가 추가되도록 개선하였습니다.
- 슬라이더 추가 시 발생하는 오류를 방지하기 위해, title 값은 문자열로만 입력받도록 하고, option 값은 "default"와 "ranking"만 받도록 interface를 활용하여 오류를 최소화했습니다.
- Layout을 이용해 페이지를 구성함으로써 새로운 페이지를 만들기 쉬워졌으며 슬라이더도 쉽게 추가 할 수 있게 되었습니다.

#### Layout으로 page 구성

```jsx
// 기존 page 구성
return (
  <>
    <Helmet>
      <title>홈 - 넷플릭스</title>
    </Helmet>
    <Main>
      <Slider1 />
      <Slider2 />
      <Footer />
    </Main>
    <ModalPreveiw />
    <AllMovie />
  </>
);
```

```jsx
// 중복된 코드 제거 후 page 구성
return (
  <>
    <Layout>
      <Slider1 />
      <Slider2 />
    </Layout>
  </>
);
```

#### 슬라이더 추가 방식 변경

<span></span>

```jsx
// 기존 슬라이더 추가 방식
{
  quries[1].data ? (
    <MovieSlider
      title="회원님을 위한 오늘의 특선"
      content="movie"
      category="now_playing"
      sliderIndex={1}
      movieId={nowPlaying[1].data.results.map((movie) => movie.id)}
    />
  ) : null;
}
```

```jsx
// 변경후 슬라이더 추가 방식
const slider: sliderProps[] = [
    { title: "지난 1년간 공개된 콘텐츠", option: "default" },
    { title: "오늘 대한민국의 TOP 10 시리즈", option: "ranking" }
    { title: "다큐멘터리", option: "default" },
];
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
  - [x] pagination 버그 : 6에서 4로 갔을때
- Font
  - [x] Chrome, Safari : font 다르게 적용되고 있어 수정 필요

# 추가하기

- 내가 찜한 콘텐츠(Mylist.tsx)
  - [x] localstorage 저장
  - [x] mylist page에서 삭제시 movie 사라지게하기
  - [x] 추가 삭제 utils.ts에 추가하기
  - [x] previewModal mylist로 추가하는 버튼 만들기
  - [x] [myListMovies, setMyListMovies] recoil로 관리하기
- 언어별로 찾아보기(OriginalAudio.tsx)
  - [x] 슬라이더 사용하지 않고 그리드로 movies 보여주기
- 슬라이더(세로 포스터)
  - [x] Top10에 사용되는 슬라이더 만들기 (기존 가로형 슬라이더 사용중)
- onClickPreview
  - [ ] page별로 중복돼서 사용중이므로 utils.ts로 통합해보기
- Nav
  - [x] 미디어쿼리 사용해서 width 줄어들면 메뉴만 표시
  - [x] 메뉴 hover시 modal창 띄우기
- regex
  - [ ] path 제한하고 원치 않는곳은 404 페이지로 보내기
- Tv
  - [ ] TMDB에서 movie가 아닌 tv로 시리즈 받아오기
- Lazy Loading
  - [x] 이미지 로딩 성능 개선을 위해 lazy load 적용하기
- 모두보기 Modal
  - [x] Preview page처럼 allVideos Component만들기
  - [ ] allVideos 내용 채우기 (해당 슬라이더에 포함된 영화 다 보여주기)
- Video
  - [ ] API에서 YouTube key값 받아와서 예고편 실행 시키기
    - key값 넣고 demo확인 - [https://developers.google.com/youtube/youtube_player_demo]

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
