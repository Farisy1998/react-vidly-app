import React from "react";

const ListGroups = (props) => {
  const { items, textProperty, valueProperty, onGenreSelect } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li key={item[textProperty]} className="list-group-item">
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroups;
