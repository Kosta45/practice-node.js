import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import { Link } from "react-router";

import "./CreateNews.css";

type CreateNewsProps = {
  handleCreate: (data: { title: string; text: string }) => Promise<void>;
};

function CreateNews({ handleCreate }: CreateNewsProps) {
  return (
    <div className="main-form-wrapper">
      <Link className="create-news__back" type="button" to={"/"}>
        ← Back to news
      </Link>
      <CreatePostForm onCreate={handleCreate} />
    </div>
  );
}

export default CreateNews;
