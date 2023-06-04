import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../services/api";
import { Movies } from "../common/types";
import { Helmet } from "react-helmet-async";
import MovieSlider from "../components/MovieSlider";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

function Latest() {
  const popularPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const popular: UseQueryResult<Movies>[] = useQueries(
    popularPage.map((page) => {
      return {
        queryKey: ["movies", "upcoming", page],
        queryFn: () => getMovies("movie", "upcoming", page),
      };
    })
  );
  const allQueriesLoaded = popular.some(
    (query) => !query.isLoading && query.data
  );

  return (
    <>
      <Helmet>
        <title>넷플릭스</title>
      </Helmet>
      <Layout headerMovieNone={true}>
        {allQueriesLoaded ? (
          <>
            {popular[0].data ? (
              <MovieSlider
                title="넷플릭스의 새로운 콘텐츠"
                content="movie"
                category="popular"
                sliderIndex={0}
                movieId={popular[0].data.results.map((movie) => movie.id)}
              />
            ) : null}

            {popular[1].data ? (
              <MovieSlider
                title="오늘의 TOP 20 시리즈"
                content="movie"
                category="popular"
                sliderIndex={1}
                movieId={popular[1].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[2].data ? (
              <MovieSlider
                title="다음주 공개 콘텐츠"
                content="movie"
                category="popular"
                sliderIndex={2}
                movieId={popular[2].data.results.map((movie) => movie.id)}
              />
            ) : null}

            {popular[3].data ? (
              <MovieSlider
                title="오늘의 TOP 20 영화"
                content="movie"
                category="popular"
                sliderIndex={3}
                movieId={popular[3].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[4].data ? (
              <MovieSlider
                title="기다림이 아깝지 않은 콘텐츠"
                content="movie"
                category="popular"
                sliderIndex={4}
                movieId={popular[4].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {popular[5].data ? (
              <MovieSlider
                title="이번주 공개 콘텐츠"
                content="movie"
                category="popular"
                sliderIndex={5}
                movieId={popular[5].data.results.map((movie) => movie.id)}
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

export default Latest;
