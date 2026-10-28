import type { NewsPost } from "../../types/NewsPost";
import { Link } from "react-router";
import "./Card.css";

type NewsCardProps = {
  post: NewsPost;
  handleDelete: (id: number) => Promise<void>;
};

function Card({ post, handleDelete }: NewsCardProps) {
  const formattedDate = new Date(post.createDate).toLocaleDateString();

  return (
    <article className="card">
      <Link to={`/news/${post.id}`} className="card__link">
        <div className="card__content">
          <h2 className="card__title">{post.title}</h2>

          <p className="card__text">{post.text}</p>

          <time className="card__date" dateTime={post.createDate}>
            {formattedDate}
          </time>
        </div>
      </Link>

      <div className="card__actions">
        <button
          type="button"
          className="card__button card__button--delete"
          onClick={() => {
            const confirmed = window.confirm(`Delete "${post.title}"?`);

            if (confirmed) {
              void handleDelete(post.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default Card;
