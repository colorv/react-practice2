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
    // return await fetch(url).then((response) => response.json());
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
    // return await fetch(url).then((response) => response.json());
  }
}

// tv popular
// https://api.themoviedb.org/3/tv/popular?api_key=13ae78f217a8de47e1987efcb4a5e00d&language=en-US&page=1

// tv similarMovies
// https://api.themoviedb.org/3/tv/100088?api_key=13ae78f217a8de47e1987efcb4a5e00d&append_to_response=images,release_dates&language=ko-KR&include_image_language=en,ko
// tv similarMovies
// `${BASE_PATH}/${content}/${movieId}?${API_KEY}&append_to_response=images,release_dates&language=ko-KR&include_image_language=en,ko`

// movie nowplaying
// https://api.themoviedb.org/3/movie/980078?api_key=13ae78f217a8de47e1987efcb4a5e00d&append_to_response=images,release_dates&language=ko-KR&include_image_language=en,ko

// --------------
// category
// 1.now_playing, 2.popular, 3.top_rated, 4.upcoming
// https://api.themoviedb.org/3/movie/{category}?api_key={}&language=ko&page=1

// movie Detail - {movieId}
// https://api.themoviedb.org/3/movie/{movieId}/images?api_key={}&language=en-US

// movie Detail - {movieId}
// append_to_response - 데이터 추가
// 1.credits, 2.images, 3.keywords, 4.similar, 5.videos, 6.release_dates
// https://api.themoviedb.org/3/movie/{movieId}?api_key={}&append_to_response=credits,images,keywords,similar,videos,release_dates&language=ko-KR&include_image_language=en,ko
