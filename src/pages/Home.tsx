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
    { title: "지난 1년간 공개된 콘텐츠", option: "default" },
    { title: "오늘 대한민국의 TOP 10 시리즈", option: "ranking" },
    { title: "회원님을 위한 오늘의 특선", option: "default" },
    { title: " 액션 & 어드벤처 시리즈", option: "default" },
    { title: "취향저격 베스트 콘텐츠", option: "default" },
    { title: "새로 올라온 콘텐츠", option: "default" },
    { title: "시대물", option: "default" },
    { title: "다시보기 추천 콘텐츠", option: "default" },
    { title: "새로 올라온 콘텐츠", option: "default" },
    { title: "오늘의 발견", option: "default" },
    { title: "SF & 판타지 시리즈", option: "default" },
    { title: "매주 공개! 이건 꼭 봐야 해", option: "default" },
    { title: "드라마 영화", option: "default" },
    { title: "해외 영화", option: "default" },
    { title: "범죄 시리즈", option: "default" },
    { title: "최다 검색", option: "default" },
    { title: "영 어덜트 영화 & 시리즈", option: "default" },
    { title: "발상의 전환! 색다른 SF", option: "default" },
    { title: "다큐멘터리", option: "default" },
    { title: "오직 넷플릭스에서", option: "default" },
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
