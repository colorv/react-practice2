import styled from "styled-components";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { scorllState } from "../atoms";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";

const BASE_PATH = "/search";

const Wrapper = styled.div`
  &.preview-modal_active {
    position: fixed;
  }
`;
const EmptyPage = styled.div`
  display: flex;
  justify-content: center;
  height: 1000px;
  margin-top: 68px;
  color: #666666;
`;

function Search() {
  // const path = useLocation();
  // const setCurrentPath = useSetRecoilState(pathState);
  const movieMatch = useMatch(`${BASE_PATH}/:movieId`);
  const scrollY = useRecoilValue(scorllState);
  return (
    <>
      <Helmet>
        <title>넷플릭스</title>
      </Helmet>
      <Wrapper
        className={`wraaper ${movieMatch ? "preview-modal_active" : ""}`}
        style={{ top: movieMatch ? `-${scrollY}px` : "" }}
      >
        <EmptyPage></EmptyPage>
        <Footer />
      </Wrapper>
    </>
  );
}

export default Search;
