import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: { _id: "", name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [this.state.selectedGenre, ...data];

    const { data: originalMovies } = await getMovies();

    this.setState({
      movies: originalMovies.map((movie) => {
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

    deleteMovie(selectedMovie._id);
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: {}, currentPage: 1 });
  };

  getPagedMovies = () => {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies = movies;
    if (searchQuery) {
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filteredMovies = selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;
    }
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
    const {
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

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
          <Link className="btn btn-primary btn-sm mb-2" to="/movies/new">
            New Movie
          </Link>
          <p>
            Showing {totalCount} {totalCount === 1 ? "movie" : "movies"} from
            the database
          </p>
          <SearchBox value={searchQuery} onSearch={this.handleSearch} />
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
