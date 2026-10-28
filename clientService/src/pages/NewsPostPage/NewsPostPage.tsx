import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getById, updateNews } from "../../services/newsService";
import type { NewsPost } from "../../types/NewsPost";
import "./NewsPostPage.css";

type NewsPostPageProps = {
  handleDelete: (id: number) => Promise<void>;
};

function NewsPostPage({ handleDelete }: NewsPostPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<NewsPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getById(Number(id))
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setText(data.text);
      })
      .catch(() => setError("Failed to load news."));
  }, [id]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!post || !title.trim() || !text.trim()) return;

    try {
      const updatedPost = await updateNews(post.id, {
        title: title.trim(),
        text: text.trim(),
      });

      setPost(updatedPost);
      setIsEditing(false);
      setError("");
    } catch {
      setError("Failed to update news.");
    }
  }

  async function handleDeletePost() {
    if (!post) return;

    try {
      await handleDelete(post.id);
      navigate("/");
    } catch {
      setError("Failed to delete news.");
    }
  }

  function handleCancel() {
    if (!post) return;

    setTitle(post.title);
    setText(post.text);
    setIsEditing(false);
    setError("");
  }

  if (error && !post) {
    return <p className="news-details__error">{error}</p>;
  }

  if (!post) {
    return <p>Loading news...</p>;
  }

  return (
    <main className="news-details">
      <Link to="/" className="news-details__back">
        ← Back to news
      </Link>

      <article className="news-details__card">
        {isEditing ? (
          <form onSubmit={handleSave}>
            <label htmlFor="news-title">Title</label>
            <input
              id="news-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="news-text">Text</label>
            <textarea
              id="news-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={10}
              required
            />

            <div className="news-details__actions">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1>{post.title}</h1>
            <p className="news-details__text">{post.text}</p>

            <time dateTime={post.createDate}>
              {new Date(post.createDate).toLocaleDateString()}
            </time>

            <div className="news-details__actions">
              <button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>

              <button type="button" onClick={handleDeletePost}>
                Delete
              </button>
            </div>
          </>
        )}

        {error && <p className="news-details__error">{error}</p>}
      </article>
    </main>
  );
}

export default NewsPostPage;
