import styled from "styled-components";
import { useLocation, useMatch } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pathState, scorllState } from "../store/atoms";
import ModalPreveiw from "../components/ModalPreview";
import Footer from "../components/Footer";
import AllMovie from "../components/AllMovie";
import Nav from "./Nav";
import { Helmet } from "react-helmet-async";

const Main = styled.main`
  overflow-x: hidden;

  &.preview-modal_active {
    position: fixed;
  }
`;

const MainContainer = styled.div<HeaderProps>`
  padding-top: ${({ padding }) => (padding ? "68px" : "0px")};
  padding-bottom: 50px;
`;

interface HeaderProps {
  padding: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  headerMovieNone: boolean;
  pageTitle: string;
}

const Layout = ({ children, headerMovieNone, pageTitle }: LayoutProps) => {
  const path = useLocation();
  const [currentPath, setCurrentPath] = useRecoilState(pathState);
  const movieMatch = useMatch(`${currentPath}/:movieId`);
  const scrollY = useRecoilValue(scorllState);

  useEffect(() => {
    setCurrentPath(path.pathname);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title>
          {pageTitle !== "" ? `${pageTitle} - 넷플릭스` : "넷플릭스"}
        </title>
      </Helmet>
      <Nav />
      <Main
        className={`main ${movieMatch ? "preview-modal_active" : ""}`}
        style={{ top: movieMatch ? `-${scrollY}px` : "" }}
      >
        <MainContainer className="main-container" padding={headerMovieNone}>
          {children}
        </MainContainer>
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
};

export default Layout;
