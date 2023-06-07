import { useEffect, useState } from "react";
import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../services/api";
import { Movies } from "../common/types";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import Layout from "../components/Layout";

function OriginalAudio() {
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const popularPage = [1, 2, 3, 4, 5];
  const popular: UseQueryResult<Movies>[] = useQueries(
    popularPage.map((page) => {
      return {
        queryKey: ["movies", "popular", page],
        queryFn: () => getMovies("movie", "popular", page),
      };
    })
  );
  const allQueriesLoaded = popular.every(
    (query) => !query.isLoading && query.data
  );

  useEffect(() => {
    if (allQueriesLoaded) {
      popular.map((query) =>
        query.data?.results.map((movie) =>
          setMovieIds((prev) => {
            return [movie.id, ...prev];
          })
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQueriesLoaded]);

  return (
    <>
      <Layout headerMovieNone={true} pageTitle="">
        {allQueriesLoaded ? (
          <>
            <MovieList content="movie" category="popular" movieId={movieIds} />
          </>
        ) : (
          <Loading />
        )}
      </Layout>
    </>
  );
}

export default OriginalAudio;
