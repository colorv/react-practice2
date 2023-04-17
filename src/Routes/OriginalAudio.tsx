import styled from "styled-components";
import { useLocation, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pathState, scorllState } from "../atoms";
import { Movies } from "../types";
import { Helmet } from "react-helmet-async";
import ModalPreveiw from "../Components/ModalPreview";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import MovieList from "../Components/MovieList";

const BASE_PATH = "/original-audio";

const Wrapper = styled.div`
  padding-bottom: 50px;
  overflow-x: hidden;
  &.preview-modal_active {
    position: fixed;
  }
  & main {
    padding-top: 68px;
    padding-bottom: 50px;
  }
`;

function OriginalAudio() {
  const path = useLocation();
  const setCurrentPath = useSetRecoilState(pathState);
  const movieMatch = useMatch(`${BASE_PATH}/:movieId`);
  const scrollY = useRecoilValue(scorllState);
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
    if (path.pathname === BASE_PATH) {
      setCurrentPath(BASE_PATH);
    }
  }, [path.pathname, setCurrentPath]);
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
      <Helmet>
        <title>넷플릭스</title>
      </Helmet>
      <Wrapper
        className={`wraaper ${movieMatch ? "preview-modal_active" : ""}`}
        style={{ top: movieMatch ? `-${scrollY}px` : "" }}
      >
        {allQueriesLoaded ? (
          <main>
            <MovieList content="movie" category="popular" movieId={movieIds} />
          </main>
        ) : (
          <Loading />
        )}
        <Footer />
      </Wrapper>

      {movieMatch ? (
        <ModalPreveiw
          content="movie"
          movieId={Number(movieMatch.params.movieId)}
        />
      ) : null}
    </>
  );
}

export default OriginalAudio;
