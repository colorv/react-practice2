export type Content = "movie" | "tv";
type MovieCategory =
  | "now_playing"
  | "top_rated"
  | "popular"
  | "upcoming"
  | "my_list";
type TvCategory = "on_the_air" | "top_rated" | "popular" | "my_list";

export type Category<T extends Content> = T extends "movie"
  ? MovieCategory
  : TvCategory;

export interface HeaderMovieProps<T extends Content> {
  content: T;
  category: Category<T>;
  movieId: number;
}

export interface MovieSliderProps<T extends Content> {
  title: string;
  content: T;
  category: Category<T>;
  movieId: number[];
  sliderIndex: number;
}

export interface PreviewProps {
  movieId: number;
  content: Content;
}

// MovieList Props
export interface MovieListProps<T extends Content> {
  content: Content;
  category: Category<T>;
  movieId?: number[];
}

// FlimRating
export interface FilmRatingProps {
  ratingResult: ReleaseDates[];
  hasText?: boolean;
}

// icons
export interface DefaultFilmRatingsProps {
  rating: string;
}

export interface FilmRatingIconProps {
  age: string;
  footer?: boolean;
}

export interface NumberIconProps {
  iconNumber?: number;
}

// API - fetch Result
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface Movies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface PreviewMovie extends Movie {
  runtime: number;
  genres: Genres[];
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  images: {
    backdrops: Images[];
    logos: Images[];
    posters: Images[];
  };
  keywords: {
    keywords: Keywords[];
  };
  similar: {
    results: Movie[];
  };
  videos: {
    results: Videos[];
  };
  release_dates: {
    results: ReleaseDates[];
  };
}

export interface SimilarMovies extends Movie {
  isError: boolean;
  isLoading: boolean;
  status: string;
  runtime: number;
  genres: Genres[];
  images: {
    backdrops: Images[];
    logos: Images[];
    posters: Images[];
  };
  release_dates: {
    results: ReleaseDates[];
  };
}

export interface HoverMovie extends SimilarMovies {}

interface Genres {
  id: number;
  name: string;
}
interface Keywords extends Genres {}

interface Cast {
  name: string;
  character: string;
}
interface Crew {
  name: string;
  department: string;
  job: string;
}
interface Images {
  iso_639_1: string;
  file_path: string;
}

interface Videos {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  type: string;
  id: string;
}

export interface ReleaseDates {
  iso_3166_1: string;
  release_dates: Certification[];
}

export interface Certification {
  certification: string;
  release_date: string;
}

// Page Slider Props
export interface sliderProps {
  title: string;
  option: "default" | "ranking";
}
