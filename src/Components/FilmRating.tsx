import { Certification, FilmRatingProps, ReleaseDates } from "../common/types";
import { DefaultFilmRatings, FilmRatingIcon } from "../icons/Icons";

function FilmRating({ ratingResult, hasText }: FilmRatingProps) {
  const FilmRatingHandle = (
    result: ReleaseDates[] | undefined,
    hasText?: boolean
  ) => {
    const krFilmRatings = result?.find((value) => value.iso_3166_1 === "KR");
    const usFilmRatings = result?.find((value) => value.iso_3166_1 === "US");
    let filmRatings: Certification | undefined;
    if (krFilmRatings === undefined) {
      filmRatings = usFilmRatings?.release_dates.find(
        (value) => value.certification !== ""
      );
    } else {
      filmRatings = krFilmRatings?.release_dates.find(
        (value) => value.certification !== ""
      );
    }
    if (filmRatings?.certification !== undefined) {
      if (
        filmRatings.certification.toUpperCase() === "ALL" ||
        "전체 관람가" ||
        "전체관람가"
      ) {
        if (hasText)
          return (
            <>
              <FilmRatingIcon age="all" footer={true} />
            </>
          );
        return <FilmRatingIcon age="all" />;
      }
      if (
        filmRatings.certification === "12" ||
        "12세 이상 관람가" ||
        "12세이상관람가"
      ) {
        if (hasText)
          return (
            <>
              <FilmRatingIcon age="12" footer={true} />
              <span>12세이상관람가</span>
            </>
          );
        return <FilmRatingIcon age="12" />;
      }
      if (
        filmRatings.certification === "15" ||
        "15세 이상 관람가" ||
        "15세이상관람가"
      ) {
        if (hasText)
          return (
            <>
              <FilmRatingIcon age="15" footer={true} />
              <span>15세이상관람가</span>
            </>
          );
        return <FilmRatingIcon age="15" />;
      }
      if (
        filmRatings.certification === "18" ||
        "18세 이상 관람가" ||
        "18세이상관람가"
      ) {
        if (hasText)
          return (
            <>
              <FilmRatingIcon age="18" footer={true} />
              <span>청소년관람불가</span>
            </>
          );
        return <FilmRatingIcon age="18" />;
      }
      return <DefaultFilmRatings rating={filmRatings.certification} />;
    }
    return <DefaultFilmRatings rating="UNRATED" />;
  };
  return FilmRatingHandle(ratingResult, hasText);
}

export default FilmRating;
