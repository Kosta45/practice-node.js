import type { NewsPost } from "../../types/NewsPost";

import Card from "../../components/Card/Card";
import "./Home.css";

type HomeProps = {
  postsData: NewsPost[];
  handleCreate: (data: { title: string; text: string }) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
};

function Home({ postsData, handleDelete }: HomeProps) {
  return (
    <main className="main-wrapper">
      <ul className="main-posts-list">
        {[...postsData].reverse().map((post) => {
          return (
            <li className="main-posts-item" key={post.id}>
              <Card key={post.id} post={post} handleDelete={handleDelete} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Home;
