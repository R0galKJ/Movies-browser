import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Content, SectionTile, Wrapper } from "./styled";
import { Link } from "react-router-dom";
import {
  fetchMovieRequest,
  selectError,
  selectLoading,
  selectMovie,
  selectMoviesByQuery
} from "../../slices/movieSlice";
import { MovieTile } from "../../common/MovieTile";
import { handleMovieClick } from "../../slices/movieSlice";
import { Pagination } from "../../common/Pagination";
import { Loading } from "../../common/States/Loading";
import { Error } from "../../common/States/Error";
import { useQueryParameter} from "../../common/queryParameters";
import searchQueryParamName from "../../common/searchQueryParamName";

export const basicImageUrl = `https://image.tmdb.org/t/p/w500`;

export const MovieList = () => {
  const dispatch = useDispatch();
  // const movies = useSelector(selectMovie);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const query = useQueryParameter(searchQueryParamName);

  const movies = useSelector((state) => selectMoviesByQuery(state, query));

  console.log(movies.slice(0,5))

  useEffect(() => {
    dispatch(fetchMovieRequest());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const handleMovieClickHandler = (movieId) => {
    dispatch(handleMovieClick(movieId));
  };



  return (
    <Content>
      <SectionTile>Popular movies</SectionTile>
      <Wrapper>
        {movies.slice(0,16).map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            onClick={() => handleMovieClickHandler(movie.id)}
          >
            <MovieTile
              title={movie.title}
              posterPath={`${basicImageUrl}${movie.poster_path}`}
              releaseDate={movie.release_date.slice(0, 4)}
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
              genre_ids={movie.genre_ids.slice(0, 2)}
            />
          </Link>
        ))}
      </Wrapper>
      <Pagination />
    </Content>
  );
};
