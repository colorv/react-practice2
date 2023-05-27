import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useQueries, UseQueryResult } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getSimilarMovies } from "../api";
import {
  hoverState,
  myListMoviesState,
  pathState,
  previewState,
  scorllState,
} from "../atoms";
import { Content, MovieSliderProps, SimilarMovies } from "../types";
import { getImage, removeFromMyList, saveToMyList } from "../utils";
import FilmRating from "./FilmRating";
import {
  CheckIcon,
  CirclePlayIcon,
  DownIcon,
  LeftArrow,
  NumberIcon,
  PeriodIcon,
  PlusIcon,
  RightArrow,
  ThumbsUp,
} from "./Icons";

const Slider = styled.section`
  width: 100vw;
  margin: 3vw 0;
  position: relative;

  &:hover .arrow-icon {
    display: inline-block;
  }
`;

// Slider Header
const Header = styled.h2``;
const LinkContainer = styled(Link)`
  display: inline-block;
  margin: 0 4% 1vw;
  &:hover .arrow-text {
    opacity: 1;
    max-width: 200px;
    display: inline-block;
    transform: translateX(1vw);
  }
  &:hover .arrow-icon {
    display: inline-block;
    font-size: 0.9vw;
    transform: translate(1vw);
  }
`;
const HeaderTitle = styled.div`
  display: table-cell;
  font-size: 1.4vw;
`;
const ViewAll = styled.h3`
  display: table-cell;
  color: #54b9c5;
`;
const ViewAllText = styled.div`
  &.arrow-text {
    display: inline-block;
    max-width: 0px;
    opacity: 0;
    font-size: 0.9vw;
    white-space: nowrap;
    margin-right: 4px;
    transition: max-width 1s, opacity 1s, transform 0.75s;
  }
`;
const ViewAllIcon = styled.div`
  &.arrow-icon {
    display: none;
    font-size: 1.4vw;
    font-weight: 900;
    transition: transform 0.75s;
  }
`;

// Slider Main
const Main = styled.div`
  position: relative;

  &:hover .pagination {
    display: block;
  }
  &:hover .handle-direction {
    display: initial;
  }
`;
const MovieList = styled(motion.ul)`
  white-space: nowrap;
  width: 100%;

  &.leftHandle-disabled {
    .slider-item:first-child {
      visibility: hidden;
    }
  }
`;

const Movie = styled.li<MovieProps>`
  display: inline-block;
  width: 16.2%;
  left: ${({ x }) => `-${x}px`};
  position: relative;
  padding: 0 0.2vw;
`;
const MovieImgWrapper = styled.div`
  height: 0;
  width: 100%;
  padding: 35.714285714% 0;
  border-radius: 3px;
  overflow: hidden;
  position: relative;

  &.mini-modal-img {
    padding: 28.125% 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
const MovieImg = styled.img`
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 3px;
  z-index: 2;
  &.hover-movie-img {
    width: 100%;
    left: 0;
  }
  &.poster {
    height: 100%;
    width: 52.5%;
  }
  &.backdrop {
    height: 100%;
    width: 52.5%;
    object-fit: cover;
  }
`;

const MovieTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  height: 100%;
  width: 52.5%;
  background-color: black;
  border-radius: 3px;

  &.hover-movie-title {
    width: 100%;
  }
  & span {
    width: 100%;
    white-space: normal;
    text-align: center;
    color: ${({ theme }) => theme.white.hover};
  }
`;

// Slider Handle (left,right)
const SliderHandle = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  background: hsla(0, 0%, 8%, 0.5);
  z-index: 3;
  width: 4%;
  top: 0;
  bottom: 0;

  &.handlePrev {
    left: 0;
    border-top-right-radius: 0.2vw;
    border-bottom-right-radius: 0.2vw;
  }
  &.handleNext {
    right: 0;
    border-top-left-radius: 0.2vw;
    border-bottom-left-radius: 0.2vw;
  }
  &:hover {
    background: hsla(0, 0%, 8%, 0.7);
    .left-arrow,
    .right-arrow {
      width: 2vw;
    }
  }
`;
const Direction = styled.b`
  display: none;
  cursor: pointer;
  .left-arrow,
  .right-arrow {
    width: 1.5vw;
  }
`;

// Slider Content
const SliderContent = styled.div`
  width: 100vw;
  padding: 0 4%;
  box-sizing: border-box;
`;
const Pagination = styled.ul`
  display: none;
  margin-bottom: 5px;
  position: absolute;
  top: -20px;
  right: 4.5%;
`;
const Page = styled(motion.li)`
  display: inline-block;
  width: 12px;
  height: 2px;
  margin-left: 1px;
  background-color: ${({ theme }) => theme.pagination.default};
  transition-delay: 0.6s;
  &.selected {
    background-color: ${({ theme }) => theme.pagination.selected};
    transition-delay: 0.6s;
  }
`;

// Hover Movie
const HoverMovie = styled(motion.div)`
  position: absolute;
  top: 0;
  background-color: ${({ theme }) => theme.black.bgColor};
  width: 97%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  z-index: 3;
`;

const MovieInfo = styled(motion.div)`
  padding: 15px;
`;

// hoverMovie BtnContainer
const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 40px;
  max-height: 50px;
  aspect-ratio: 6.85/1;
  margin-bottom: 10px;
`;
const BtnColumn = styled.div`
  margin: 0.25em;
  box-sizing: border-box;
  aspect-ratio: 1;
  button {
    background-color: #2a2a2a;
  }
  &:first-child button {
    background-color: white;
  }
  &:last-child {
    margin-left: auto;
  }
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

// hoverMovie InfoContainer
const InfoContainer = styled.div`
  display: flex;
  min-height: 30px;
  margin: 12px 0px;
  line-height: 20px;
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`;
const InfoContainerColumn = styled.div`
  display: flex;
  align-items: center;
`;
const VoteAverage = styled.span`
  color: ${({ theme }) => theme.green.vote_average};
  margin: 0.25em 0.5em 0.25em 0;
`;

// hoverMovie GenreContainer
const GenreContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 25px;
  margin-bottom: 10px;
`;
const Genre = styled.div`
  display: flex;
  padding-right: 6px;
`;
const Period = styled.span`
  display: flex;
  align-items: center;
  padding-right: 6px;
  color: ${({ theme }) => theme.black.period};
`;

const sliderVariants = {
  initial: ({ direction }: CutomProps) => {
    return {
      x:
        direction > 0
          ? window.innerWidth - window.innerWidth * 0.08
          : -window.innerWidth + window.innerWidth * 0.08,
    };
  },
  animate: ({ btnHide }: CutomProps) => {
    return {
      x: btnHide ? 0 : 0,
      transition: { duration: 0.55 },
    };
  },
  end: ({ direction }: CutomProps) => {
    return {
      x:
        direction < 0
          ? window.innerWidth - window.innerWidth * 0.08
          : -window.innerWidth + window.innerWidth * 0.08,
      overflow: "hidden",
      transition: { duration: 0.55 },
    };
  },
};

const hoverVariants = {
  fistChild: {
    x: "0",
    y: "-30%",
    width: "150%",
    display: "none",
  },
  lastChild: {
    right: "0.2vw",
    y: "-30%",
    width: "150%",
    display: "none",
  },
  initial: {
    x: "-20%",
    y: "-30%",
    width: "150%",
    display: "none",
  },
  animate: {
    display: "inherit",
    transition: { type: "tween", delay: 0.6 },
  },
  exit: {
    x: 0,
    y: 0,
    width: "97%",
    transition: { ease: "easeInOut", duration: 0.3 },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

interface MovieProps {
  x: string;
}
interface CutomProps {
  direction: number;
  btnHide: boolean;
}

function VerticalMovieSlider<T extends Content>({
  title,
  content,
  category,
  movieId,
  sliderIndex,
}: MovieSliderProps<T>) {
  const history = useNavigate();
  const currentPath = useRecoilValue(pathState);
  const [newMovieIds, setNewMovieIds] = useState<number[]>([
    ...movieId.slice(9, 10),
    ...movieId.slice(0, 9),
  ]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [btnHide, setBtnHide] = useState(true);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [offset, setOffset] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [{ hover, hoverId, hoverSliderIndex, position }, setHover] =
    useRecoilState(hoverState);
  const [myListMovies, setMyListMovies] = useRecoilState(myListMoviesState);
  const { scrollY } = useScroll();
  const setPreviewActive = useSetRecoilState(previewState);
  const setScrollY = useSetRecoilState(scorllState);

  const movieRanking = movieId.slice(0, 10).map((id, index) => {
    return { ranking: index + 1, id };
  });

  const movies: UseQueryResult<SimilarMovies>[] = useQueries(
    newMovieIds.map((id) => {
      return {
        queryKey: [category, id],
        queryFn: () => getSimilarMovies(content, id),
        staleTime: 600000,
      };
    })
  );

  const allMoviesLoaded = movies.every((movie) => !movie.isLoading);

  const toggleAnimationEnd = () => setAnimationEnd((prev) => !prev);
  const paginate = (newDirection: number, moviesLength: number) => {
    const maxIndex = Math.ceil(moviesLength / offset) - 1;
    if (animationEnd) return;
    if (btnHide) setBtnHide(false);

    if (newDirection > 0) {
      if (newMovieIds.length % offset !== 0) {
        setNewMovieIds(() => {
          const copyMovies = [...newMovieIds];
          const sliceMovies = [
            ...copyMovies.splice(
              0,
              page === maxIndex - 1 ? newMovieIds.length % offset : offset
            ),
          ];
          return [...copyMovies, ...sliceMovies];
        });
      }
      if (newMovieIds.length % offset === 0) {
        setNewMovieIds(() => {
          const copyMovies = [...newMovieIds];
          const sliceMovies = [...copyMovies.splice(0, offset)];
          console.log([...copyMovies, ...sliceMovies]);
          return [...copyMovies, ...sliceMovies];
        });
      }
    }
    if (newDirection < 0) {
      if (newMovieIds.length % offset !== 0) {
        setNewMovieIds(() => {
          const copyMovies = [...newMovieIds];
          const sliceMovies = [
            ...copyMovies.splice(
              page === maxIndex
                ? copyMovies.length - (newMovieIds.length % offset)
                : copyMovies.length - offset,
              page === maxIndex ? newMovieIds.length % offset : offset
            ),
          ];
          return [...sliceMovies, ...copyMovies];
        });
      }
      if (newMovieIds.length % offset === 0) {
        setNewMovieIds(() => {
          const copyMovies = [...newMovieIds];
          const sliceMovies = [
            ...copyMovies.splice(copyMovies.length - offset, offset),
          ];
          return [...sliceMovies, ...copyMovies];
        });
      }
    }

    setPage(([page]) => {
      if (page === maxIndex && newDirection === 1) {
        return [0, newDirection];
      }
      if (page === 0 && newDirection === -1) {
        return [maxIndex, newDirection];
      }
      return [page + newDirection, newDirection];
    });
    toggleAnimationEnd();
  };
  const handleMovieHover = (movieId: string, itemIndex: number) => {
    let position = "";

    if (itemIndex === 1) {
      position = "firstChild";
    }
    if (itemIndex === offset) {
      position = "lastChild";
    }

    setHover((state) => {
      return {
        hover: !state.hover,
        hoverId: movieId,
        hoverSliderIndex: sliderIndex,
        position,
      };
    });
  };

  const resetHoverState = () => {
    setHover((state) => {
      return {
        hover: !state.hover,
        hoverId: "",
        hoverSliderIndex: 0,
        position: "",
      };
    });
  };
  // onClick Preview
  const onClickPreview = (previewId: number | undefined, y: number) => {
    if (previewId === undefined) return;

    setScrollY(y);
    setPreviewActive(true);
    history(`${currentPath === "/" ? "" : `${currentPath}/`}${previewId}`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const onResize = () => {
    const width = window.innerWidth;
    const offsets = [
      { width: 1400, offset: 6 },
      { width: 1100, offset: 5 },
      { width: 800, offset: 4 },
      { width: 0, offset: 3 },
    ];
    const offset = offsets.find((item) => width >= item.width)?.offset || 6;
    setScreenWidth(width);
    setOffset(offset);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  useEffect(() => {
    onResize();
  }, []);

  useEffect(() => {
    const myListJson = localStorage.getItem("mylist");
    if (myListJson) {
      setMyListMovies(JSON.parse(myListJson));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {allMoviesLoaded && (
        <Slider className="slider">
          <Header>
            <LinkContainer
              to={`${
                currentPath === "/" ? "all-movie" : `${currentPath}/all-movie`
              }`}
            >
              <HeaderTitle className="header-title">{title}</HeaderTitle>
              <ViewAll className="header-arrow">
                <ViewAllText className="arrow-text">모두 보기</ViewAllText>
                <ViewAllIcon className="arrow-icon">{">"}</ViewAllIcon>
              </ViewAll>
            </LinkContainer>
          </Header>

          <Main className="slider-hover">
            {btnHide ? null : (
              <SliderHandle
                className="handlePrev"
                onClick={() => paginate(-1, movies.length)}
                onHoverStart={resetHoverState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Direction className="handle-direction">
                  <LeftArrow />
                </Direction>
              </SliderHandle>
            )}
            <SliderContent className="slider-contents">
              <Pagination className="pagination">
                {movies.map((value, index) =>
                  index < Math.ceil(movies.length / offset) ? (
                    <Page
                      className={page === index ? "selected" : ""}
                      key={`page${index + 1}`}
                      transition={{ delay: 0.5 }}
                    ></Page>
                  ) : null
                )}
              </Pagination>

              <AnimatePresence
                initial={false}
                mode="popLayout"
                custom={{ direction, btnHide }}
                onExitComplete={toggleAnimationEnd}
              >
                <MovieList
                  className={`item-list ${
                    btnHide ? "leftHandle-disabled" : ""
                  }`}
                  key={page}
                  variants={sliderVariants}
                  initial="initial"
                  animate="animate"
                  exit="end"
                  transition={{ type: "tween" }}
                  custom={{ direction, btnHide }}
                >
                  {movies.map((movie, index) => (
                    <Movie
                      key={index}
                      x={String(
                        Math.floor((screenWidth - screenWidth * 0.08) / offset)
                      )}
                      onMouseEnter={() =>
                        handleMovieHover(String(movie.data?.id), index)
                      }
                      className={`slider-item item-${
                        index < offset + 2 ? index : ""
                      } `}
                    >
                      <NumberIcon
                        iconNumber={
                          movieRanking.find(({ id }) => id === movie.data?.id)
                            ?.ranking
                        }
                      />
                      <MovieImgWrapper
                        onClick={() =>
                          onClickPreview(movie.data?.id, scrollY.get())
                        }
                      >
                        {movie.data?.images.posters.length !== 0 ? (
                          <MovieImg
                            src={getImage(
                              movie.data?.images.posters[0].file_path,
                              "w500"
                            )}
                            className="poster"
                          />
                        ) : (
                          <MovieImg
                            src={getImage(movie.data?.backdrop_path, "w500")}
                            className={
                              movie.data.backdrop_path ? "backdrop" : ""
                            }
                          />
                        )}
                        <MovieTitle>
                          <span>{movie.data?.title}</span>
                        </MovieTitle>
                      </MovieImgWrapper>

                      <AnimatePresence>
                        {hover &&
                        sliderIndex === hoverSliderIndex &&
                        movie.data?.id === Number(hoverId) ? (
                          <HoverMovie
                            variants={hoverVariants}
                            initial={
                              position === "firstChild"
                                ? "fistChild"
                                : position === "lastChild"
                                ? "lastChild"
                                : "initial"
                            }
                            animate="animate"
                            exit="exit"
                            onMouseLeave={resetHoverState}
                          >
                            <MovieImgWrapper
                              className="mini-modal-img"
                              onClick={() =>
                                onClickPreview(movie.data?.id, scrollY.get())
                              }
                            >
                              {movie.data?.images.backdrops.length !== 0 ? (
                                <MovieImg
                                  src={getImage(
                                    movie.data?.images.backdrops[0].file_path,
                                    "w500"
                                  )}
                                  className="hover-movie-img"
                                />
                              ) : (
                                <MovieImg
                                  src={getImage(
                                    movie.data?.backdrop_path,
                                    "w500"
                                  )}
                                  className="hover-movie-img"
                                />
                              )}
                              <MovieTitle className="hover-movie-title">
                                <span>{movie.data?.title}</span>
                              </MovieTitle>
                            </MovieImgWrapper>
                            <MovieInfo variants={hoverVariants} exit="hidden">
                              <BtnContainer>
                                <BtnColumn>
                                  <CircleBtn>
                                    <CirclePlayIcon />
                                  </CircleBtn>
                                </BtnColumn>
                                <BtnColumn>
                                  {myListMovies.includes(movie.data.id) ? (
                                    <CircleBtn
                                      onClick={() =>
                                        removeFromMyList(
                                          movie.data?.id,
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
                                          movie.data?.id,
                                          myListMovies,
                                          setMyListMovies
                                        )
                                      }
                                      style={{ padding: "0.4vw" }}
                                    >
                                      <PlusIcon />
                                    </CircleBtn>
                                  )}
                                </BtnColumn>
                                <BtnColumn>
                                  <CircleBtn>
                                    <ThumbsUp />
                                  </CircleBtn>
                                </BtnColumn>
                                <BtnColumn>
                                  <CircleBtn
                                    onClick={() =>
                                      onClickPreview(
                                        movie.data?.id,
                                        scrollY.get()
                                      )
                                    }
                                  >
                                    <DownIcon />
                                  </CircleBtn>
                                </BtnColumn>
                              </BtnContainer>

                              <InfoContainer>
                                <InfoContainerColumn>
                                  <VoteAverage>
                                    {`평점 ${Math.round(
                                      movie.data?.vote_average * 10
                                    )}%`}
                                  </VoteAverage>
                                </InfoContainerColumn>
                                <InfoContainerColumn>
                                  <FilmRating
                                    ratingResult={
                                      movie.data?.release_dates.results
                                    }
                                  />
                                  <span>{`${Math.floor(
                                    movie.data?.runtime / 60
                                  )}시간 ${movie.data?.runtime % 60}분`}</span>
                                </InfoContainerColumn>
                              </InfoContainer>

                              <GenreContainer className="genre">
                                {movie.data?.genres.map((genre, index) =>
                                  index === 0 ? (
                                    <Genre key={genre.id}>
                                      <span>{genre.name}</span>
                                    </Genre>
                                  ) : (
                                    <Genre key={genre.id}>
                                      <Period>
                                        <PeriodIcon />
                                      </Period>
                                      <span>{genre.name}</span>
                                    </Genre>
                                  )
                                )}
                              </GenreContainer>
                            </MovieInfo>
                          </HoverMovie>
                        ) : null}
                      </AnimatePresence>
                    </Movie>
                  ))}
                </MovieList>
              </AnimatePresence>
            </SliderContent>

            <SliderHandle
              className="handleNext"
              onClick={() => paginate(1, movies.length)}
              onHoverStart={resetHoverState}
            >
              <Direction className="handle-direction">
                <RightArrow />
              </Direction>
            </SliderHandle>
          </Main>
        </Slider>
      )}
    </>
  );
}

export default VerticalMovieSlider;
