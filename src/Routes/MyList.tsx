import styled from "styled-components";
import Footer from "../Components/Footer";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { scorllState } from "../atoms";
import { Helmet } from "react-helmet";

const BASE_PATH = "/my-list";

const Wrapper = styled.div`
  &.preview-modal_active {
    position: fixed;
  }
`;
const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  height: 1000px;
  margin-top: 68px;
  color: #666666;
`;

function MyList() {
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
        <EmptyList>
          <span style={{ paddingTop: "10%", fontSize: "18px" }}>
            아직 찜하신 콘텐츠가 없습니다.
          </span>
        </EmptyList>
        <Footer />
      </Wrapper>
    </>
  );
}

export default MyList;
