const Like = ({ item, onLike }) => {
  return (
    <i
      className={item.isLiked ? "fa fa-heart" : "fa fa-heart-o"}
      style={{ cursor: "pointer" }}
      onClick={() => onLike(item._id, item.isLiked)}
    />
  );
};

export default Like;
