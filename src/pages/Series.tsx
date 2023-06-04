import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../services/api";
import { Movies } from "../common/types";
import { Helmet } from "react-helmet-async";
import MovieSlider from "../components/MovieSlider";
import HeaderMovie from "../components/HeaderMovie";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

function Series() {
  const topRatedPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const topRated: UseQueryResult<Movies>[] = useQueries(
    topRatedPage.map((page) => {
      return {
        queryKey: ["movies", "top_rated", page],
        queryFn: () => getMovies("movie", "top_rated", page),
      };
    })
  );
  const allQueriesLoaded = topRated.some(
    (query) => !query.isLoading && query.data
  );

  return (
    <>
      <Helmet>
        <title>시리즈 - 넷플릭스</title>
      </Helmet>
      <Layout headerMovieNone={false}>
        {allQueriesLoaded ? (
          <>
            {topRated[0].data ? (
              <>
                <HeaderMovie
                  content="movie"
                  category="popular"
                  movieId={topRated[0].data.results[0].id}
                />
                <MovieSlider
                  title="회원님의 취향저격 베스트 콘텐츠"
                  content="movie"
                  category="popular"
                  sliderIndex={0}
                  movieId={topRated[0].data.results.map((movie) => movie.id)}
                />
              </>
            ) : null}

            {topRated[1].data ? (
              <MovieSlider
                title="액션 & 어드벤처"
                content="movie"
                category="popular"
                sliderIndex={1}
                movieId={topRated[1].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {topRated[2].data ? (
              <MovieSlider
                title="실화 바탕 영화"
                content="movie"
                category="popular"
                sliderIndex={2}
                movieId={topRated[2].data.results.map((movie) => movie.id)}
              />
            ) : null}

            {topRated[3].data ? (
              <MovieSlider
                title="기분 좋아지는 영화"
                content="movie"
                category="popular"
                sliderIndex={3}
                movieId={topRated[3].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {topRated[4].data ? (
              <MovieSlider
                title="로맨틱한 영화"
                content="movie"
                category="popular"
                sliderIndex={4}
                movieId={topRated[4].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {topRated[5].data ? (
              <MovieSlider
                title="어워드 수상 영화"
                content="movie"
                category="popular"
                sliderIndex={5}
                movieId={topRated[5].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {topRated[6].data ? (
              <MovieSlider
                title="다시보기 추천 콘텐츠"
                content="movie"
                category="popular"
                sliderIndex={6}
                movieId={topRated[6].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {topRated[7].data ? (
              <MovieSlider
                title="오직 넷플릭스에서"
                content="movie"
                category="popular"
                sliderIndex={7}
                movieId={topRated[7].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {topRated[8].data ? (
              <MovieSlider
                title="어워드 수상 감독"
                content="movie"
                category="popular"
                sliderIndex={8}
                movieId={topRated[8].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {topRated[9].data ? (
              <MovieSlider
                title="SF & 판타지"
                content="movie"
                category="popular"
                sliderIndex={9}
                movieId={topRated[9].data.results.map((movie) => movie.id)}
              />
            ) : null}
          </>
        ) : (
          <Loading />
        )}
      </Layout>
    </>
  );
}

export default Series;
