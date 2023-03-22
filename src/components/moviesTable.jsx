import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => <Like item={movie} onLike={this.props.onLike} />,
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    const moviesCount = movies.length;

    if (moviesCount === 0) return <p>There are no movies in database</p>;

    return (
        <Table
          data={movies}
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
    );
  }
}

export default MoviesTable;
