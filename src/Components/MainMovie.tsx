import { useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getMainMovieDetail } from "../api";
import { pathState, previewState, scorllState } from "../atoms";
import { Content, MainMovieProps, SimilarMovies } from "../types";
import { getImage } from "../utils";
import { InfoIcon, PlayIcon } from "./Icons";

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const MainBgImg = styled.img`
  width: 100%;
  top: 0;
  position: absolute;
`;

const MainInfo = styled.div`
  padding-bottom: 40%;
  margin-bottom: 10px;
  position: relative;
`;

const MainInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 40%;
  position: absolute;
  left: 4%;
  bottom: 0;
  z-index: 1;
`;

const MainInfoLogo = styled.img`
  width: 70%;
  margin-bottom: 20px;
`;

const MainInfoOverView = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  width: 100%;
  font-size: 1.2vw;
  line-height: normal;
  text-shadow: 2px 2px 4px black;
  color: ${({ theme }) => theme.white.darker};
  @media screen and (max-width: 800px) {
    display: none;
  }

  /* cursor: default; */
`;

const MainBtnContainer = styled.div`
  display: flex;
  margin-top: 1.5vw;
`;

const RectangleBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 0.35vw 1.65vw 0.35vw 1.35vw;
  margin: 0px 0.8vw 0.8vw 0px;
  font-size: 1.2vw;
  cursor: pointer;
  .playIcon,
  .infoIcon {
    width: 2.3vw;
    height: 2.3vw;
  }
  span {
    margin-left: 5px;
  }
`;

const PlayBtn = styled(RectangleBtn)`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  &:hover {
    background-color: rgba(200, 200, 200, 1);
  }
`;
const MoreBtn = styled(RectangleBtn)`
  background-color: rgba(109, 109, 110, 0.7);
  &:hover {
    background-color: rgba(109, 109, 110, 0.3);
  }
`;

const MainShadowContainer = styled.div`
  width: 100%;
  height: 72.5vw;
  position: absolute;
`;

const MainInfoShadow = styled.div`
  position: absolute;
  right: 20%;
  top: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(80deg, rgba(0, 0, 0, 0.6), #0000 85%);
`;

const MainBgImgShadow = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 13vw;
  background-image: linear-gradient(
    180deg,
    hsla(0, 0%, 8%, 0) 0,
    hsla(0, 0%, 8%, 0.15) 15%,
    hsla(0, 0%, 8%, 0.35) 29%,
    hsla(0, 0%, 8%, 0.58) 44%,
    #141414 68%,
    #141414
  );
`;

function MainMovie<T extends Content>({
  content,
  movieId,
  category,
}: MainMovieProps<T>) {
  const history = useNavigate();
  const currentPath = useRecoilValue(pathState);
  const { scrollY } = useScroll();
  const setPreviewActive = useSetRecoilState(previewState);
  const setScrollY = useSetRecoilState(scorllState);
  const { isLoading, data } = useQuery<SimilarMovies>(
    [category, `${movieId}`],
    () => getMainMovieDetail(content, movieId),
    {
      staleTime: 60000,
    }
  );
  const onClickPreview = (previewId: number | undefined, y: number) => {
    setScrollY(y);
    if (previewId !== undefined) {
      setPreviewActive(true);
      history(`${currentPath === "/" ? "" : `${currentPath}/`}${previewId}`);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <MainContent className="main">
      {!isLoading && (
        <MainBgImg src={getImage(data?.backdrop_path)} alt="backdropImg" />
      )}

      <MainInfo className="info">
        <MainInfoRow className="info-wrapper">
          {!isLoading && (
            <MainInfoLogo
              src={getImage(data?.images.logos[0].file_path, "w500")}
              alt="logo"
            />
          )}

          <MainInfoOverView className="overView">
            {data?.overview}
          </MainInfoOverView>
          <MainBtnContainer>
            <PlayBtn className="info-btn">
              <PlayIcon />
              <span>재생</span>
            </PlayBtn>

            <MoreBtn
              className="info-btn"
              onClick={() => onClickPreview(data?.id, scrollY.get())}
            >
              <InfoIcon />
              <span>상세 정보</span>
            </MoreBtn>
          </MainBtnContainer>
        </MainInfoRow>
      </MainInfo>
      <MainShadowContainer className="shadow">
        <MainInfoShadow />
        <MainBgImgShadow />
      </MainShadowContainer>
    </MainContent>
  );
}

export default MainMovie;
