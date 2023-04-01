// images
// base_url    "http://image.tmdb.org/t/p/"

// foramt
// backdrop_sizes : "w300", "w780", "w1280", "original"
// logo_sizes : "w45", "w92", "w154", "w185", "w300", "w500", "original"
// poster_sizes : "w92", "w154", "w185", "w342", "w500", "w780", "original"
// profile_sizes : "w45", "w185", "h632", "original"
// still_sizes : "w92", "w185", "w300", "original"

const BASE_PATH = "https://image.tmdb.org/t/p/";

export function getImage(path: string | undefined, format?: string) {
  if (!path) return;

  const url = `${BASE_PATH}${format ? format : "original"}${path}`;
  return url;
}
