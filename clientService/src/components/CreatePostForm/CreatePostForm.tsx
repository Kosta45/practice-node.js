import { useState, type FormEvent } from "react";
import "../../components/CreatePostForm/CreatePostForm.css";

type CreateNewsCardProps = {
  onCreate: (data: { title: string; text: string }) => Promise<void>;
};

function CreatePostForm({ onCreate }: CreateNewsCardProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !text.trim()) return;

    setIsSubmitting(true);

    try {
      await onCreate({ title: title.trim(), text: text.trim() });
      setTitle("");
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="create-news-card" onSubmit={handleSubmit}>
      <div className="create-news-card__heading">
        <h2>Create a news post</h2>
        <p>Share your news with everyone.</p>
      </div>

      <input
        className="create-news-card__input"
        type="text"
        placeholder="Enter a title..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        className="create-news-card__textarea"
        placeholder="Write your news..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
        rows={4}
      />

      <div className="create-news-card__actions">
        <button
          className="create-news-card__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create post"}
        </button>

        <button
          className="create-news-card__clear"
          type="button"
          onClick={() => {
            setTitle("");
            setText("");
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default CreatePostForm;
