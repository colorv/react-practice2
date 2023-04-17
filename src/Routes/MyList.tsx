import styled from "styled-components";
import Footer from "../Components/Footer";
import { useLocation, useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { myListMoviesState, pathState, scorllState } from "../atoms";
import { Helmet } from "react-helmet";
import MovieList from "../Components/MovieList";
import ModalPreveiw from "../Components/ModalPreview";
import { useEffect } from "react";

const BASE_PATH = "/my-list";

const Wrapper = styled.div`
  padding-bottom: 50px;
  &.preview-modal_active {
    position: fixed;
  }
  & main {
    padding-top: 68px;
    padding-bottom: 50px;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  padding: 0 4%;
  font-size: 2vw;
  @media screen and (max-width: 950px) {
    height: 41px;
  }
`;

const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  height: 1000px;
  margin-top: 68px;
  color: #666666;
  & span {
    padding-top: 10%;
    font-size: 18px;
  }
`;

function MyList() {
  const path = useLocation();
  const setCurrentPath = useSetRecoilState(pathState);
  const movieMatch = useMatch(`${BASE_PATH}/:movieId`);
  const scrollY = useRecoilValue(scorllState);
  const [myListMovies, setMyListMovies] = useRecoilState(myListMoviesState);

  useEffect(() => {
    if (path.pathname === BASE_PATH) {
      setCurrentPath(BASE_PATH);
    }
  }, [path.pathname, setCurrentPath]);

  useEffect(() => {
    const myListJson = localStorage.getItem("mylist");
    if (myListJson) {
      setMyListMovies(JSON.parse(myListJson));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>넷플릭스</title>
      </Helmet> */}
      <Wrapper
        className={`wraaper ${movieMatch ? "preview-modal_active" : ""}`}
        style={{ top: movieMatch ? `-${scrollY}px` : "" }}
      >
        <main>
          <Title>
            <h1>내가 찜한 콘텐츠</h1>
          </Title>
          {myListMovies.length !== 0 ? (
            <MovieList content="movie" category="my_list" />
          ) : (
            <EmptyList>
              <span>아직 찜하신 콘텐츠가 없습니다.</span>
            </EmptyList>
          )}
        </main>
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

export default MyList;
