// import { NavigateFunction } from "react-router-dom";

import { SetterOrUpdater } from "recoil";
import { TMDB } from "../constants/path";

const BASE_PATH = TMDB.IMG_PATH;

export function getImage(path: string | undefined, format?: string) {
  if (!path) return;

  const url = `${BASE_PATH}${format ? format : "original"}${path}`;
  return url;
}
/*
images
base_url    "http://image.tmdb.org/t/p/"

foramt
backdrop_sizes : "w300", "w780", "w1280", "original"
logo_sizes : "w45", "w92", "w154", "w185", "w300", "w500", "original"
poster_sizes : "w92", "w154", "w185", "w342", "w500", "w780", "original"
profile_sizes : "w45", "w185", "h632", "original"
still_sizes : "w92", "w185", "w300", "original"
*/

const updateMyList = (newList: number[]) => {
  localStorage.setItem("mylist", JSON.stringify(newList));
};

export const saveToMyList = (
  movieId: number | undefined,
  myListMovies: number[],
  // setMyListMovies: React.Dispatch<React.SetStateAction<number[]>>
  setMyListMovies: SetterOrUpdater<number[]>
) => {
  if (movieId === undefined) return;
  if (!myListMovies.includes(movieId)) {
    const newList = [...myListMovies, movieId];
    setMyListMovies([...myListMovies, movieId]);
    updateMyList(newList);
  }
};
export const removeFromMyList = (
  movieId: number | undefined,
  myListMovies: number[],
  // setMyListMovies: React.Dispatch<React.SetStateAction<number[]>>
  setMyListMovies: SetterOrUpdater<number[]>
) => {
  if (movieId === undefined) return;
  const newList = myListMovies.filter((id: number) => id !== movieId);
  setMyListMovies(newList);
  updateMyList(newList);
};

// export const onClickPreview = (
//   previewId: number | undefined,
//   y: number,
//   currentPath: string,
//   history: NavigateFunction,
//   setScrollY: (y: number) => void,
//   setPreviewActive: (active: boolean) => void
// ) => {
//   if (previewId === undefined) return;
//   setScrollY(y);
//   setPreviewActive(true);
//   history(`${currentPath === "/" ? "" : `${currentPath}/`}${previewId}`);
//   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
// };
