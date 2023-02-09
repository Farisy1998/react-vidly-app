import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: { _id: "", name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [this.state.selectedGenre, ...getGenres()];

    this.setState({
      movies: getMovies().map((movie) => {
        const transformedMovie = { ...movie, isLiked: false };
        return transformedMovie;
      }),
      genres,
    });
  }

  handleMovieDelete = (selectedMovie) => {
    const transformedMovies = this.state.movies.filter(
      (movie) => movie._id !== selectedMovie._id
    );

    this.setState({ movies: transformedMovies });
  };

  handleLike = (movieId, isLiked) => {
    const movies = [...this.state.movies];

    const transformedMovies = movies.map((movie) =>
      movie._id === movieId ? { ...movie, isLiked: !isLiked } : movie
    );

    this.setState({ movies: transformedMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedMovies = () => {
    const { movies, pageSize, currentPage, selectedGenre, sortColumn } =
      this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;
    const moviesCount = filteredMovies.length;
    const sortedMovies = _.orderBy(
      filteredMovies,
      sortColumn.path,
      sortColumn.order
    );
    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: moviesCount, movies: paginatedMovies };
  };

  render() {
    const { genres, pageSize, currentPage, selectedGenre, sortColumn } =
      this.state;

    const { totalCount, movies } = this.getPagedMovies();

    return (
      <div className="row">
        <div className="col col-3">
          <ListGroup
            items={genres}
            valueProperty="_id"
            textProperty="name"
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelected}
          />
        </div>
        <div className="col col-9">
          <p>
            Showing {totalCount} {totalCount === 1 ? "movie" : "movies"} from
            the database
          </p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleMovieDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
