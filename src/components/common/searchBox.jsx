const SearchBox = ({ value, onSearch }) => {
  return (
    <input
      type="text"
      className="form-control my-3"
          placeholder="Search..."
          value={value}
      onChange={(event) => onSearch(event.currentTarget.value)}
    />
  );
};

export default SearchBox;
