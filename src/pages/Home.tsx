import styled from "styled-components";
import { useLocation, useMatch } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQueries, UseQueryResult } from "react-query";
import { getMovies } from "../services/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pathState, scorllState } from "../store/atoms";
import { Movies } from "../common/types";
import ModalPreveiw from "../components/ModalPreview";
import MovieSlider from "../components/MovieSlider";
import HeaderMovie from "../components/HeaderMovie";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import VerticalMovieSlider from "../components/VerticalMovieSlider";
import AllMovie from "../components/AllMovie";
import { PATH } from "../constants/path";

const Main = styled.main`
  overflow-x: hidden;

  &.preview-modal_active {
    position: fixed;
  }
`;

const MainContainer = styled.div`
  padding-bottom: 50px;
`;

function Home() {
  const path = useLocation();
  const setCurrentPath = useSetRecoilState(pathState);
  const movieMatch = useMatch(`${PATH.HOME}/:movieId`);
  const scrollY = useRecoilValue(scorllState);
  const nowPlayingPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const nowPlaying: UseQueryResult<Movies>[] = useQueries(
    nowPlayingPage.map((page) => {
      return {
        queryKey: ["movies", "now_playing", page],
        queryFn: () => getMovies("movie", "now_playing", page),
      };
    })
  );
  const allQueriesLoaded = nowPlaying.some(
    (query) => !query.isLoading && query.data
  );

  useEffect(() => {
    if (path.pathname === PATH.HOME) {
      setCurrentPath(PATH.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>홈 - 넷플릭스</title>
      </Helmet>
      <Main
        className={`main ${movieMatch ? "preview-modal_active" : ""}`}
        style={{ top: movieMatch ? `-${scrollY}px` : "" }}
      >
        {allQueriesLoaded ? (
          <MainContainer className="main-container">
            {nowPlaying[0].data ? (
              <>
                <HeaderMovie
                  content="movie"
                  category="now_playing"
                  movieId={nowPlaying[0].data.results[0].id}
                />

                <MovieSlider
                  title="지난 1년간 공개된 콘텐츠"
                  content="movie"
                  category="now_playing"
                  sliderIndex={0}
                  movieId={nowPlaying[0].data.results.map((movie) => movie.id)}
                />
              </>
            ) : null}

            {nowPlaying[1].data ? (
              <VerticalMovieSlider
                title="회원님을 위한 오늘의 특선"
                content="movie"
                category="now_playing"
                sliderIndex={1}
                movieId={nowPlaying[1].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {nowPlaying[2].data ? (
              <MovieSlider
                title="액션 & 어드벤처 시리즈"
                content="movie"
                category="now_playing"
                sliderIndex={2}
                movieId={nowPlaying[2].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {nowPlaying[3].data ? (
              <MovieSlider
                title="취향저격 베스트 콘텐츠"
                content="movie"
                category="now_playing"
                sliderIndex={3}
                movieId={nowPlaying[3].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {nowPlaying[4].data ? (
              <MovieSlider
                title="새로 올라온 콘텐츠"
                content="movie"
                category="now_playing"
                sliderIndex={4}
                movieId={nowPlaying[4].data.results.map((movie) => movie.id)}
              />
            ) : null}
            {nowPlaying[5].data ? (
              <MovieSlider
                title="시대물"
                content="movie"
                category="now_playing"
                sliderIndex={5}
                movieId={nowPlaying[5].data.results.map((movie) => movie.id)}
              />
            ) : null}
          </MainContainer>
        ) : (
          <Loading />
        )}
        <Footer />
      </Main>

      {movieMatch?.params.movieId &&
      /^[0-9]+$/.test(movieMatch.params.movieId) ? (
        <ModalPreveiw
          content="movie"
          movieId={Number(movieMatch.params.movieId)}
        />
      ) : null}

      {movieMatch?.params.movieId &&
      /^all-movie$/.test(movieMatch.params.movieId) ? (
        <AllMovie />
      ) : null}
    </>
  );
}

export default Home;