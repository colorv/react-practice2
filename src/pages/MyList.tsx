import styled from "styled-components";
import { useRecoilState } from "recoil";
import { myListMoviesState } from "../store/atoms";
import { Helmet } from "react-helmet";
import MovieList from "../components/MovieList";
import { useEffect } from "react";
import Layout from "../components/Layout";

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
  const [myListMovies, setMyListMovies] = useRecoilState(myListMoviesState);

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
      <Layout headerMovieNone={true}>
        <>
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
        </>
      </Layout>
    </>
  );
}

export default MyList;
