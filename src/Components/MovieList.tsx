import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useQueries, UseQueryResult } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getSimilarMovies } from "../services/api";
import {
  hoverState,
  myListMoviesState,
  pathState,
  previewState,
  scorllState,
} from "../store/atoms";
import { Content, MovieListProps, SimilarMovies } from "../common/types";
import { getImage, removeFromMyList, saveToMyList } from "../utils/utils";
import FilmRating from "./FilmRating";
import {
  CheckIcon,
  CirclePlayIcon,
  DownIcon,
  PeriodIcon,
  PlusIcon,
  ThumbsUp,
} from "../icons/Icons";
import Loading from "./Loading";
import { useEffect } from "react";

const Wrapper = styled.article`
  width: 100vw;
  margin: 3vw 0;
  position: relative;
`;

const GridWrapper = styled.div`
  width: 100vw;
  padding: 0 4%;
  box-sizing: border-box;
`;

const GridMovieList = styled.ul`
  display: grid;
  width: 100%;
  @media screen and (min-width: 1400px) {
    & {
      grid-template-columns: repeat(6, 1fr);
      row-gap: 4vw;
    }
  }
  @media screen and (min-width: 1100px) and (max-width: 1399px) {
    & {
      grid-template-columns: repeat(5, 1fr);
      row-gap: 5vw;
    }
  }
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    & {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 6vw;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 799px) {
    & {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 7vw;
    }
  }
`;

const Movie = styled.li`
  transition: transform ease-in-out 0.5s;
  position: relative;
  padding: 0 0.2vw;
`;
const MovieImgWrapper = styled.div`
  height: 0;
  width: 100%;
  padding: 28.125% 0;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  &.mini-modal-img {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
const MovieImg = styled.img`
  top: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 2;
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
  width: 100%;
  background-color: black;
  border-radius: 3px;

  & span {
    width: 100%;
    white-space: normal;
    text-align: center;
    color: ${({ theme }) => theme.white.hover};
  }
  &.no-logo {
    & span {
      padding: 10px 0;
      z-index: 3;
      color: white;
      position: absolute;
      bottom: 0;
      text-shadow: 3px 3px 5px black;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), #0000 100%);
    }
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
  z-index: 5;
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

const hoverVariants = {
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

function MovieList<T extends Content>({
  content,
  category,
  movieId,
}: MovieListProps<T>) {
  const history = useNavigate();
  const currentPath = useRecoilValue(pathState);
  const { scrollY } = useScroll();
  const [{ hover, hoverId }, setHover] = useRecoilState(hoverState);
  const [myListMovies, setMyListMovies] = useRecoilState(myListMoviesState);
  const setPreviewActive = useSetRecoilState(previewState);
  const setScrollY = useSetRecoilState(scorllState);

  const movies: UseQueryResult<SimilarMovies>[] = useQueries(
    movieId
      ? movieId.map((id) => {
          return {
            queryKey: [category, id],
            queryFn: () => getSimilarMovies(content, id),
            staleTime: 600000,
          };
        })
      : myListMovies.map((id) => {
          return {
            queryKey: [category, id],
            queryFn: () => getSimilarMovies(content, id),
            staleTime: 600000,
          };
        })
  );

  const allMoviesLoaded = movies.every((movie) => !movie.isLoading);

  const handleMovieHover = (movieId: string, itemIndex: number) => {
    let position = "";

    setHover((state) => {
      return {
        hover: !state.hover,
        hoverId: movieId,
        hoverSliderIndex: 0,
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

  const onClickPreview = (previewId: number | undefined, y: number) => {
    if (previewId === undefined) return;
    setScrollY(y);
    setPreviewActive(true);
    history(`${currentPath === "/" ? "" : `${currentPath}/`}${previewId}`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const myListJson = localStorage.getItem("mylist");
    if (myListJson) {
      setMyListMovies(JSON.parse(myListJson));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      {allMoviesLoaded ? (
        <GridWrapper>
          <GridMovieList>
            {movies.map((movie, index) => (
              <Movie
                key={index}
                onMouseEnter={() =>
                  handleMovieHover(String(movie.data?.id), index)
                }
              >
                <MovieImgWrapper
                  onClick={() => onClickPreview(movie.data?.id, scrollY.get())}
                >
                  {movie.data?.images.backdrops.length !== 0 ? (
                    <MovieImg
                      src={getImage(
                        movie.data?.images.backdrops[0].file_path,
                        "w500"
                      )}
                    />
                  ) : (
                    <MovieImg
                      src={getImage(movie.data?.backdrop_path, "w500")}
                    />
                  )}
                  <MovieTitle
                    className={`${
                      movie.data?.images.backdrops.length === 0 &&
                      movie.data?.backdrop_path
                        ? "no-logo"
                        : ""
                    }`}
                  >
                    <span>{movie.data?.title}</span>
                  </MovieTitle>
                </MovieImgWrapper>

                <AnimatePresence>
                  {hover && movie.data?.id === Number(hoverId) ? (
                    <HoverMovie
                      variants={hoverVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onMouseLeave={resetHoverState}
                    >
                      <MovieImgWrapper
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
                          />
                        ) : (
                          <MovieImg
                            src={getImage(movie.data?.backdrop_path, "w500")}
                          />
                        )}
                        <MovieTitle>
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
                            <CircleBtn>
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
                              ratingResult={movie.data?.release_dates.results}
                            />
                            <span>{`${Math.floor(
                              movie.data?.runtime / 60
                            )}시간 ${movie.data?.runtime % 60}분`}</span>
                          </InfoContainerColumn>
                        </InfoContainer>

                        <GenreContainer>
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
          </GridMovieList>
        </GridWrapper>
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
}

export default MovieList;
