import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../services/api";
import { Movies, sliderProps } from "../common/types";
import MovieSlider from "../components/MovieSlider";
import HeaderMovie from "../components/HeaderMovie";
import Loading from "../components/Loading";
import VerticalMovieSlider from "../components/VerticalMovieSlider";
import Layout from "../components/Layout";

function Home() {
  const slider: sliderProps[] = [
    { title: "베스트 콘텐츠", option: "default" },
    { title: "지금 뜨는 콘텐츠", option: "default" },
    { title: "일본 만화 원작 시리즈", option: "default" },
    { title: "오늘 대한민국의 TOP 10 시리즈", option: "ranking" },
    { title: "새로 올라온 콘텐츠", option: "default" },
    { title: "취향저격 베스트 콘텐츠", option: "default" },
    { title: "오늘 대한민국의 TOP 10 영화", option: "ranking" },
    { title: "평단의 찬사를 받은 한국 시리즈", option: "default" },
    { title: "최신 등록 콘텐츠", option: "default" },
    { title: "평단의 찬사를 받은 영화", option: "default" },
    { title: "시대물", option: "default" },
    { title: "미국 영화・SF・흥미진진", option: "default" },
    { title: "미국 TV 프로그램", option: "default" },
    { title: "어워드 수상 영화", option: "default" },
    { title: "리얼리티, 버라이어티 & 토크쇼", option: "default" },
    { title: "한국 드라마", option: "default" },
    { title: "일본 만화 원작 애니 시리즈", option: "default" },
    { title: "다시보기 추천 콘텐츠", option: "default" },
    { title: "미래 세계 SF", option: "default" },
    { title: "오늘의 발견!", option: "default" },
    { title: "로맨틱한 영화", option: "default" },
    { title: "아시아 영화 & 시리즈", option: "default" },
    { title: "상상의 나래를 펼친 가족 영화", option: "default" },
    { title: "블록버스터 해외 액션 영화", option: "default" },
    { title: "한국 영화", option: "default" },
    { title: "코믹스 원작! 어린이 & 가족 영화", option: "default" },
    { title: "한국이 만든 콘텐츠", option: "default" },
    { title: "넷플릭스 인기 콘텐츠", option: "default" },
    { title: "한국 시리즈", option: "default" },
    { title: "미국 영화", option: "default" },
    { title: "몰아보기 추천 일본 TV 시리즈", option: "default" },
    { title: "코미디 시리즈", option: "default" },
    { title: "다큐시리즈", option: "default" },
    { title: "오직 넷플릭스에서", option: "default" },
    { title: "지난 1년간 공개된 콘텐츠", option: "default" },
    { title: "드라마", option: "default" },
  ];

  const nowPlaying: UseQueryResult<Movies>[] = useQueries(
    slider.map((_, index) => {
      return {
        queryKey: ["movies", "now_playing", index + 1],
        queryFn: () => getMovies("movie", "now_playing", index + 1),
      };
    })
  );
  const allQueriesLoaded = nowPlaying.some(
    (query) => !query.isLoading && query.data
  );

  return (
    <Layout headerMovieNone={false} pageTitle="홈">
      {allQueriesLoaded ? (
        <>
          {nowPlaying[0].data ? (
            <HeaderMovie
              content="movie"
              category="now_playing"
              movieId={nowPlaying[0].data.results[0].id}
            />
          ) : null}
          {nowPlaying.map((movie, index) =>
            movie.data ? (
              slider[index].option === "default" ? (
                <MovieSlider
                  key={index}
                  title={slider[index].title}
                  content="movie"
                  category="now_playing"
                  sliderIndex={index}
                  movieId={movie.data.results.map((movie) => movie.id)}
                />
              ) : (
                <VerticalMovieSlider
                  key={index}
                  title={slider[index].title}
                  content="movie"
                  category="now_playing"
                  sliderIndex={index}
                  movieId={movie.data.results.map((movie) => movie.id)}
                />
              )
            ) : null
          )}
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export default Home;
