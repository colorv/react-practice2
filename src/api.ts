import { Category, Content } from "./types";

const API_KEY = `api_key=${process.env.REACT_APP_API_KEY}`;
const BASE_PATH = "https://api.themoviedb.org/3";

export async function getMovies<T extends Content>(
  content: T,
  category: Category<T>,
  page: number = 1
) {
  if (!category) return null;
  const url = `${BASE_PATH}/${content}/${category}?${API_KEY}&language=ko-KR&page=${page}`;

  return await fetch(url).then((response) => response.json());
}

export async function getMainMovieDetail(content: Content, movieId: number) {
  const url = `${BASE_PATH}/${content}/${movieId}?${API_KEY}&append_to_response=images,videos&language=ko-KR&include_image_language=en,ko`;
  return await fetch(url).then((response) => response.json());
}

export async function getPreviewMovies(content: Content, movieId: number) {
  if (!isNaN(movieId)) {
    const url = `${BASE_PATH}/${content}/${movieId}?${API_KEY}&append_to_response=credits,images,keywords,similar,videos,release_dates&language=ko-KR&include_image_language=en,ko`;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    if (response.status === 404) {
      console.log("error");
    }
  }
}

export async function getSimilarMovies(content: Content, movieId: number) {
  if (!isNaN(movieId)) {
    const url = `${BASE_PATH}/${content}/${movieId}?${API_KEY}&append_to_response=images,release_dates&language=ko-KR&include_image_language=en,ko`;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    if (response.status === 404) {
      return;
    }
  }
}
