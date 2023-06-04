import styled from "styled-components";
import { useLocation, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../services/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pathState, scorllState } from "../store/atoms";
import { Movies } from "../common/types";
import { Helmet } from "react-helmet-async";
import ModalPreveiw from "../components/ModalPreview";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import { PATH } from "../constants/path";

const Main = styled.main`
  padding-bottom: 50px;
  overflow-x: hidden;
  &.preview-modal_active {
    position: fixed;
  }
`;

const MainContainer = styled.section`
  padding-bottom: 50px;
  padding-top: 68px;
`;

function OriginalAudio() {
  const path = useLocation();
  const setCurrentPath = useSetRecoilState(pathState);
  const movieMatch = useMatch(`${PATH.ORIGINALAUDIO}/:movieId`);
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
    if (path.pathname === PATH.ORIGINALAUDIO) {
      setCurrentPath(PATH.ORIGINALAUDIO);
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
      <Main
        className={`wraaper ${movieMatch ? "preview-modal_active" : ""}`}
        style={{ top: movieMatch ? `-${scrollY}px` : "" }}
      >
        {allQueriesLoaded ? (
          <MainContainer>
            <MovieList content="movie" category="popular" movieId={movieIds} />
          </MainContainer>
        ) : (
          <Loading />
        )}
        <Footer />
      </Main>

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
