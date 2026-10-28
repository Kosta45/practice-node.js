import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";

import { createNews, deleteNews } from "./services/newsService";

import "./App.css";
import type { NewsPost } from "./types/NewsPost";
import CreateNews from "./pages/CreateNews/CreateNews";
import NewsPostPage from "./pages/NewsPostPage/NewsPostPage";

function App() {
  const [dataPosts, setData] = useState<NewsPost[]>([]);

  const handleCreate = async (data: { title: string; text: string }) => {
    const newPost = await createNews(data);

    setData((prevPosts) => [...prevPosts, newPost]);
  };

  const handleDelete = async (id: number) => {
    await deleteNews(id);

    setData((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const getData = async () =>
    await fetch("/api/newsposts/")
      .then((response) => response.json())
      .then((data) => setData(data));

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleCreate={handleCreate}
              handleDelete={handleDelete}
              postsData={dataPosts}
            />
          }
        />

        <Route
          path="/create"
          element={<CreateNews handleCreate={handleCreate} />}
        />

        <Route
          path="/news/:id"
          element={<NewsPostPage handleDelete={handleDelete} />}
        />
      </Routes>
    </>
  );
}

export default App;
