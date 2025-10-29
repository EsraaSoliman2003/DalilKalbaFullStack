import "../../styles/PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="card-image">
        <img src={post.ImageUrl} alt={post.Titles} />
      </div>
      <div className="card-content">
        <h3>{post.Title}</h3>
        <p>{post.Content}</p>
      </div>
    </div>
  );
};

export default PostCard;
