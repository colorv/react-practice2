import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQueries, useQuery, UseQueryResult } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getPreviewMovies, getSimilarMovies } from "../api";
import {
  myListMoviesState,
  pathState,
  previewState,
  scorllState,
} from "../atoms";
import { PreviewMovie, PreviewProps, SimilarMovies } from "../types";
import { getImage, removeFromMyList, saveToMyList } from "../utils";
import {
  CloseIcon,
  PlusIcon,
  PlayIcon,
  DownIcon,
  UpIcon,
  CheckIcon,
} from "./Icons";
import FilmRating from "./FilmRating";

const PreviewOverlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 3;
`;

const PreviewModal = styled(motion.div)`
  width: 97%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.black.darker};
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  z-index: 3;
  overflow: hidden;
  font-size: 14px;
`;

const PreviewFooter = styled.footer`
  padding-bottom: 2em;
`;
const PreviewFooterTitle = styled.div`
  font-size: 24px;
  margin: 48px 0px 20px 0px;
`;
const PreviewFooterDetail = styled.div``;
const PreveiwFooterDetailRow = styled.div`
  margin: 0.5em 0.5em 0.5em 0;
  line-height: 20px;
  &.film-rating {
    display: flex;
    align-items: center;
  }
`;

const Tag = styled.span`
  color: #777777;
  &.film-rating_title {
    margin-right: 14px;
  }
`;

const PreviewImgContainer = styled.header`
  width: 100%;
`;

const PreviewImg = styled.img`
  position: absolute;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: -1;
`;

const PreviewImgShadow = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 56.25%;
  background: linear-gradient(0deg, #181818, transparent 50%);
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1.5em;
`;

const PreviewDetail = styled.main`
  padding: 0 3em;
  background-color: ${({ theme }) => theme.black.darker};
`;

const PreviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PreviewInfoColumn = styled.div`
  width: 65%;
  &:last-child {
    & span:not(:first-child):hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const PreviewMovieData = styled.h1`
  display: flex;
  margin: 0.8em 0;
  font-size: 16px;
  @media screen and (max-width: 545px) {
    flex-direction: column;
  }
`;

const MovieDataColumn = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
`;

const VoteAverage = styled.span`
  color: ${({ theme }) => theme.green.vote_average};
  margin: 0.25em 0.5em 0.25em 0;
`;
const ReleaseDate = styled.span`
  margin-right: 10px;
`;
const RunTime = styled.span`
  margin-right: 10px;
`;

const PreviewOverView = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-height: 25px;
  overflow: hidden;
`;

const PreviewCast = styled.div`
  margin: 0.5em 0.5em 0.5em 0;
  line-height: 24px;
`;

const PreviewGenre = styled.div`
  margin: 0.5em 0.5em 0.5em 0;
  line-height: 24px;
`;
const PreviewKeyword = styled.div`
  margin: 0.5em 0.5em 0.5em 0;
  line-height: 24px;
`;

const SimilarContent = styled.section``;
const SimilarHeader = styled.h1`
  font-size: 24px;
  margin: 48px 0px 20px 0px;
`;
const SimilarItems = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  &.overflow-hidden {
    max-height: 55em;
    overflow: hidden;
  }
  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const SimilarItem = styled.li`
  width: 100%;
  padding-bottom: 0.5em;
  border-radius: 6px;
  font-size: 16px;
  background-color: #2f2f2f;
`;
const SimilarItemDetail = styled.div`
  margin-bottom: 20px;
`;

const SimilarItemDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;
const SimilarItemDetailHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 22px;
`;
const SecondLine = styled.div`
  display: flex;
  align-items: center;
`;
const SimilarItemDetailHeaderBtn = styled.div`
  border-radius: 50%;
  background-color: rgba(42, 42, 42, 0.8);
`;
const SimilarItemDetailOverView = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  height: 65px;
  overflow: hidden;
  padding: 1em;
  padding-top: 0;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.7);
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 6em;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    0deg,
    #181818 0,
    hsla(0, 0%, 9%, 0.7) 20%,
    hsla(0, 0%, 9%, 0.4) 30%,
    transparent 50%
  );
  background-color: #181818;
  position: relative;
`;

const CircleBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.1rem;
  aspect-ratio: 1;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background-color: unset;
  max-width: 42px;
  max-height: 42px;
  min-width: 32px;
  min-height: 32px;
  box-sizing: border-box;
  cursor: pointer;
  &.close-btn {
    width: 36px;
    background-color: #181818;
    border: none;
    &:hover {
      border: none;
    }
    &:focus {
      outline: 3px solid white;
    }
  }
  &:hover {
    border: 2px solid white;
  }
  &:focus {
    outline: 2px solid white;
  }
`;

const ItemImg = styled.div`
  height: 0;
  width: 100%;
  padding: 28.125% 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;

  &.mini-modal-img {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const Img = styled.img`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 40%;
  position: absolute;
  left: 3em;
  bottom: 15%;
  z-index: 1;
`;

const Logo = styled.img`
  width: 100%;
  max-height: 150px;
  max-width: 300px;
  margin-bottom: 1.5em;
`;

const BtnContainer = styled.div`
  display: flex;
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

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

const PreviewMovieVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, type: "tween" },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

function ModalPreveiw({ content, movieId }: PreviewProps) {
  const history = useNavigate();
  const currentPath = useRecoilValue(pathState);
  const setPreviewActive = useSetRecoilState(previewState);
  const scrollY = useRecoilValue(scorllState);
  const [visible, setVisible] = useState(false);
  const [similarMovieId, setSimilarMovieId] = useState<number[]>([]);
  const [myListMovies, setMyListMovies] = useRecoilState(myListMoviesState);

  const { isLoading, data } = useQuery<PreviewMovie>(
    ["preview", `${movieId}`],
    () => getPreviewMovies(content, movieId)
  );
  const director = data?.credits.crew.filter(
    (value) => value.department === "Directing" && value.job === "Director"
  );
  const writer = data?.credits.crew.filter(
    (value) => value.department === "Writing" && value.job === "Writer"
  );

  const similarMovies: UseQueryResult<SimilarMovies>[] = useQueries(
    similarMovieId.map((id) => {
      return {
        queryKey: ["similarMovie", id],
        queryFn: () => getSimilarMovies(content, id),
        enabled: !!similarMovieId,
        // staleTime: 60000,
      };
    })
  );

  const onExitPreview = () => {
    window.scrollTo(0, scrollY);
    setPreviewActive(false);
    history(`${currentPath}`);
  };

  const similarMovieMorehandle = () => {
    setVisible((prev) => !prev);
  };

  // Cast More - Click Event
  const onClickeMoreCast = () => {
    window.scroll({
      top: 4000,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (data) {
      setSimilarMovieId(
        data.similar.results.map((similarMovie) => similarMovie.id)
      );
    }
  }, [data]);

  return (
    <>
      <PreviewOverlay
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        onClick={onExitPreview}
        className="preview-overlay"
      />

      <PreviewModal
        variants={PreviewMovieVariants}
        initial="initial"
        animate="animate"
        className="preview"
      >
        {!isLoading && data && (
          <>
            <PreviewImgContainer
              style={{ position: "relative" }}
              className="preview-header"
            >
              <PreviewImg src={getImage(data.backdrop_path, "w780")} />

              <LogoContainer className="logo-container">
                {data.images.logos.length !== 0 ? (
                  <Logo
                    src={getImage(data.images.logos[0].file_path, "w300")}
                    alt={data.title}
                  />
                ) : (
                  <span style={{ fontSize: "40px", marginBottom: "10px" }}>
                    {data.title}
                  </span>
                )}

                <BtnContainer className="btn-container">
                  <PlayBtn className="play-btn">
                    <PlayIcon />
                    <span>재생</span>
                  </PlayBtn>
                </BtnContainer>
              </LogoContainer>

              <PreviewImgShadow className="img-shadow" />

              <CloseWrapper className="close">
                <CircleBtn className="close-btn" onClick={onExitPreview}>
                  <CloseIcon />
                </CircleBtn>
              </CloseWrapper>
            </PreviewImgContainer>

            <PreviewDetail className="preview-detail">
              <PreviewInfo className="preview-info">
                <PreviewInfoColumn className="info-column1">
                  <PreviewMovieData className="movie-info">
                    <MovieDataColumn>
                      <VoteAverage>
                        {`평점 ${Math.round(data.vote_average * 10)}%`}
                      </VoteAverage>
                    </MovieDataColumn>
                    <MovieDataColumn>
                      <ReleaseDate>{data.release_date.slice(0, 4)}</ReleaseDate>
                      <FilmRating ratingResult={data.release_dates.results} />
                      <RunTime>
                        {`${Math.floor(data.runtime / 60)}시간 ${
                          data.runtime % 60
                        }분`}
                      </RunTime>
                    </MovieDataColumn>
                  </PreviewMovieData>

                  <PreviewOverView className="movie-overView">
                    {data.overview
                      ? data.overview
                      : "등록된 줄거리가 없습니다."}
                  </PreviewOverView>
                </PreviewInfoColumn>

                <PreviewInfoColumn
                  style={{ width: "32.5%", fontSize: "14px" }}
                  className="info-column2"
                >
                  <PreviewCast>
                    <Tag>출연: </Tag>
                    {data.credits.cast
                      .slice(0, 2)
                      .map((cast, index) =>
                        index === 4 ? (
                          <span key={index}>{cast.name}</span>
                        ) : (
                          <span key={index}>{cast.name}, </span>
                        )
                      )}
                    <span onClick={onClickeMoreCast}>더보기</span>
                  </PreviewCast>

                  {data.genres.length !== 0 ? (
                    <PreviewGenre>
                      <Tag>장르: </Tag>
                      {data.genres.map((genre, index) =>
                        index === data.genres.length - 1 ? (
                          <span key={index}>{genre.name}</span>
                        ) : (
                          <span key={index}>{genre.name}, </span>
                        )
                      )}
                    </PreviewGenre>
                  ) : null}

                  {data.keywords.keywords.length !== 0 ? (
                    <PreviewKeyword>
                      <Tag>키워드: </Tag>
                      {data.keywords.keywords
                        .slice(0, 4)
                        .map((keyword, index) =>
                          index === 3 ? (
                            <span key={index}>{keyword.name}</span>
                          ) : (
                            <span key={index}>{keyword.name}, </span>
                          )
                        )}
                    </PreviewKeyword>
                  ) : null}
                </PreviewInfoColumn>
              </PreviewInfo>

              {similarMovies.length !== 0 ? (
                <SimilarContent className="similar-content">
                  <SimilarHeader>비슷한 콘텐츠</SimilarHeader>
                  <SimilarItems
                    className={`similar-items ${
                      visible ? "overflow-visible" : "overflow-hidden"
                    }`}
                  >
                    {similarMovies.map((movie, index) =>
                      movie.data?.images.backdrops[0] ||
                      movie.data?.backdrop_path ? (
                        <SimilarItem key={index}>
                          <ItemImg
                            style={{
                              borderBottomLeftRadius: "0",
                              borderBottomRightRadius: "0",
                            }}
                          >
                            <Img
                              src={getImage(
                                movie.data?.images.backdrops[0] !== undefined
                                  ? `${movie.data.images.backdrops[0].file_path}`
                                  : `${movie.data?.backdrop_path}`,
                                "w300"
                              )}
                            />
                          </ItemImg>
                          <SimilarItemDetail>
                            <SimilarItemDetailHeader>
                              <SimilarItemDetailHeaderText>
                                {movie.data?.vote_average ? (
                                  <VoteAverage>
                                    {`평점 ${Math.round(
                                      movie.data.vote_average * 10
                                    )}%`}
                                  </VoteAverage>
                                ) : null}
                                <SecondLine>
                                  <FilmRating
                                    ratingResult={
                                      movie.data.release_dates.results
                                    }
                                  />
                                  <ReleaseDate>
                                    {movie.data?.release_date.slice(0, 4)}
                                  </ReleaseDate>
                                </SecondLine>
                              </SimilarItemDetailHeaderText>

                              <SimilarItemDetailHeaderBtn>
                                {myListMovies.includes(movie.data.id) ? (
                                  <CircleBtn
                                    onClick={() =>
                                      removeFromMyList(
                                        movie.data.id,
                                        myListMovies,
                                        setMyListMovies
                                      )
                                    }
                                    style={{ padding: "0.4vw" }}
                                  >
                                    <CheckIcon />
                                  </CircleBtn>
                                ) : (
                                  <CircleBtn
                                    onClick={() =>
                                      saveToMyList(
                                        movie.data.id,
                                        myListMovies,
                                        setMyListMovies
                                      )
                                    }
                                    style={{ padding: "0.4vw" }}
                                  >
                                    <PlusIcon />
                                  </CircleBtn>
                                )}
                              </SimilarItemDetailHeaderBtn>
                            </SimilarItemDetailHeader>

                            <SimilarItemDetailOverView>
                              {movie.data?.overview
                                ? `${movie.data.overview}`
                                : "등록된 줄거리가 없습니다."}
                            </SimilarItemDetailOverView>
                          </SimilarItemDetail>
                        </SimilarItem>
                      ) : null
                    )}
                  </SimilarItems>

                  <Divider>
                    <CircleBtn
                      onClick={similarMovieMorehandle}
                      style={{
                        position: "absolute",
                        bottom: "-28%",
                        width: "42px",
                        backgroundColor: "rgba(42,42,42,0.5)",
                      }}
                    >
                      {visible ? <UpIcon /> : <DownIcon />}
                    </CircleBtn>
                  </Divider>
                </SimilarContent>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "500px",
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span>비슷한 콘텐츠가 존재하지 않습니다.</span>
                  </div>
                  <Divider />
                </>
              )}

              <PreviewFooter>
                <PreviewFooterTitle>
                  {`${data.title} 상세정보`}
                </PreviewFooterTitle>
                <PreviewFooterDetail>
                  <PreveiwFooterDetailRow>
                    {director?.length === 0 ? null : (
                      <>
                        <Tag>감독: </Tag>
                        {director?.map((value, index) =>
                          index === director.length - 1 ? (
                            <span key={index}>{value.name}</span>
                          ) : (
                            <span key={index}>{value.name}, </span>
                          )
                        )}
                      </>
                    )}
                  </PreveiwFooterDetailRow>
                  <PreveiwFooterDetailRow>
                    <Tag>출연: </Tag>

                    {data.credits.cast.map((cast, index) =>
                      index === data.credits.cast.length - 1 ? (
                        <span key={index}>{`${cast.name}`}</span>
                      ) : (
                        <span key={index}>{`${cast.name}, `}</span>
                      )
                    )}
                  </PreveiwFooterDetailRow>

                  {writer?.length !== 0 ? (
                    <PreveiwFooterDetailRow>
                      <Tag>각본: </Tag>
                      {writer?.map((value, index) =>
                        index === writer.length - 1 ? (
                          <span key={index}>{value.name}</span>
                        ) : (
                          <span key={index}>{value.name}, </span>
                        )
                      )}
                    </PreveiwFooterDetailRow>
                  ) : null}

                  {data.genres.length !== 0 ? (
                    <PreveiwFooterDetailRow>
                      <Tag>장르: </Tag>
                      {data.genres.map((genre, index) =>
                        index === data.genres.length - 1 ? (
                          <span key={index}>{genre.name}</span>
                        ) : (
                          <span key={index}>{genre.name}, </span>
                        )
                      )}
                    </PreveiwFooterDetailRow>
                  ) : null}

                  {data.keywords.keywords.length !== 0 ? (
                    <PreveiwFooterDetailRow>
                      <Tag>키워드: </Tag>
                      {data.keywords.keywords.map((keyword, index) =>
                        index === data.keywords.keywords.length - 1 ? (
                          <span key={index}>{keyword.name}</span>
                        ) : (
                          <span key={index}>{keyword.name}, </span>
                        )
                      )}
                    </PreveiwFooterDetailRow>
                  ) : null}

                  <PreveiwFooterDetailRow className="film-rating">
                    <Tag className="film-rating_title">관람 등급:</Tag>
                    <FilmRating
                      ratingResult={data.release_dates.results}
                      hasText={true}
                    />
                  </PreveiwFooterDetailRow>
                </PreviewFooterDetail>
              </PreviewFooter>
            </PreviewDetail>
          </>
        )}
      </PreviewModal>
    </>
  );
}

export default ModalPreveiw;
