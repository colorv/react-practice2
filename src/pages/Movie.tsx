import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../services/api";
import { Movies } from "../common/types";
import MovieSlider from "../components/MovieSlider";
import HeaderMovie from "../components/HeaderMovie";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

function Movie() {
  const popularPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const popular: UseQueryResult<Movies>[] = useQueries(
    popularPage.map((page) => {
      return {
        queryKey: ["movies", "popular", page],
        queryFn: () => getMovies("movie", "popular", page),
      };
    })
  );
  const allQueriesLoaded = popular.some(
    (query) => !query.isLoading && query.data
  );

  return (
    <>
      <Layout headerMovieNone={false} pageTitle="영화">
        {allQueriesLoaded ? (
          <>
            {popular[0].data ? (
              <>
                <HeaderMovie
                  content="movie"
                  category="popular"
                  movieId={popular[0].data.results[0].id}
                />
                <MovieSlider
                  title="회원님의 취향저격 베스트 콘텐츠"
                  content="movie"
                  category="popular"
                  sliderIndex={0}
                  movieId={popular[0].data.results.map((movie) => movie.id)}
                />
              </>
            ) : null}

            {popular[1].data ? (
              <MovieSlider
                title="액션 & 어드벤처"
                content="movie"
                category="popular"
                sliderIndex={1}
                movieId={popular[1].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[2].data ? (
              <MovieSlider
                title="실화 바탕 영화"
                content="movie"
                category="popular"
                sliderIndex={2}
                movieId={popular[2].data.results.map((movie) => movie.id)}
              />
            ) : null}

            {popular[3].data ? (
              <MovieSlider
                title="기분 좋아지는 영화"
                content="movie"
                category="popular"
                sliderIndex={3}
                movieId={popular[3].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[4].data ? (
              <MovieSlider
                title="로맨틱한 영화"
                content="movie"
                category="popular"
                sliderIndex={4}
                movieId={popular[4].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[5].data ? (
              <MovieSlider
                title="어워드 수상 영화"
                content="movie"
                category="popular"
                sliderIndex={5}
                movieId={popular[5].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[6].data ? (
              <MovieSlider
                title="다시보기 추천 콘텐츠"
                content="movie"
                category="popular"
                sliderIndex={6}
                movieId={popular[6].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[7].data ? (
              <MovieSlider
                title="오직 넷플릭스에서"
                content="movie"
                category="popular"
                sliderIndex={7}
                movieId={popular[7].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[8].data ? (
              <MovieSlider
                title="어워드 수상 감독"
                content="movie"
                category="popular"
                sliderIndex={8}
                movieId={popular[8].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[9].data ? (
              <MovieSlider
                title="SF & 판타지"
                content="movie"
                category="popular"
                sliderIndex={9}
                movieId={popular[9].data.results.map((movie) => movie.id)}
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

export default Movie;
