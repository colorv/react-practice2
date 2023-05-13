# Netflix Clone

<img width="1297" alt="mainImg" src="https://github.com/colorv/react-practice2/assets/75740740/3ceff75a-5793-4960-ba29-b0bd7fd4a8e5">

<p align="center">
<a href="https://colorv.github.io/react-practice2/">바로가기</a>
</p>

## 생각, 고민

1. framer motion으로 슬라이더 만들시 netflix 와 비슷하게 만드려고 하면 position 문제가 생겨서 새로운 슬라이더가 밑에서 출연

   - popuplayout 속성을 사용해서 같은 곳에서 사라지거나 나타나게 할 수 는 있으나 사라지는 슬라이더와 나타나는 슬라이더가 일정 부분에서 겹쳐서 자연스럽지 않음
   - 현재 framer motion을 사용하지 않고 transform: `translateX(-${슬라이더크기 * page}px)`을 사용해서 슬라이더 구현
     - translateX를 사용하면 hover했을때 나타나는 movie의 z-index 문제가 생김
     - tranlateX 대신 left를 사용하면 z-index 문제는 해결됌
   - 슬라이더 마지막 페이지에서 offset에 따라 빈 부분이 발생 , 마지막 페이지 에서 오른쪽 버튼에 첫번째 아이템이 와야함
   - 마지막 페이지에서 처음 페이지로 돌아가면 animation 효과가 반대로 진행함

2. APP.tsx 에서 <Footer/> 추가시 preview page에서 Footer가 위로 올라옴 - 슬라이더를 감싸는 부분이 position : fixed

# 수정하기

1. pagination 버그 : 6에서 4로 갔을때
2. 슬라이더 이동을 한번이라도 하면 화면 사이즈를 줄일때 따라 움직임
3. API요청해서 받은 Data에 img가 없는 경우에도 img없이 자리를 차지함
4. 슬라이더에 item hover시 translateX로 인해 z-index 작동하지 않음
5. 슬라이더 이동시 픽셀 값이 조금 씩 안맞게 이동함
6. page 하단 부분에서 item 클릭시 preview page가 뜨고 page 나갈시 scrolly 값이 위로 튐
7. 슬라이더 Item hover 부자연스러움
8. https://colorv.github.io/react-practice2/ : path 수정해야함
9. 반응형
   1. Main Movie 화면 줄어 들었을때 overView 없애거나 줄 수를 줄이기
   2. Header - 화면 줄어 들었을때 "메뉴"로 통합시키기
10. backDrop_img 없는 item은 텍스트로 표시하기

# 추가하기

1. 내가 찜한 콘텐츠
   1. localstorage 저장 [o]
   2. mylist page에서 삭제시 movie 사라지게하기 [o]
   3. 추가 삭제 utils.ts에 추가하기 [o]
   4. previewModal mylist로 추가하는 버튼 만들기
   5. hover(miniModal)에서 추가하면 hover 풀림 고치기
   6. [myListMovies, setMyListMovies] recoil로 관리하기[o]
2. 언어별로 찾아보기
   1. 슬라이더 사용하지 않고 그리드로 movies 보여주기 [o]
   2. Header에 검색옵션 있음
3. onClickPreview
   1. 네이밍 다시 하기
   2. page별로 중복돼서 사용중이므로 utils.ts로 통합해보기
4. 세로포스터 슬라이더 : Top10 시리즈에 사용되는 슬라이더 만들기 / number + 세로 포스터
5. Header Nav : 미디어쿼리 사용해서 width 줄어들면 메뉴만 표시, 메뉴 hover시 modal창 띄우기
6. regex : path 제한하고 원치 않는곳은 404 페이지로 보내기
7. 슬라이드 hover : Item hover시 첫번째랑 마지막 아이템은 left, right 정렬하기 (현재 모든 item은 가운데서 나타남)

   - 슬라이더 item hover = pagehandle, 모두보기 hidden시키기

8. TV Data : TMDB에서 movie가 아닌 tv로 시리즈 받아오기 (image가 등록되지않은 시리즈들이 많음)
9. Scroll API요청 : 첫 로딩 이후 스크롤 내릴때 추가로 API요청 보내기
10. 모두보기 : previewpage 처럼 allVideos Component만들기
11. 메인 movie에 비디오 추가

    - API요청으로 YouTube key값 받아와서 재생시키기
    - key값 넣고 demo확인 - [https://developers.google.com/youtube/youtube_player_demo]
