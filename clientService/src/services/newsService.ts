export async function getAll() {
  const response = await fetch("/api/newsposts/");

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

export async function getById(newsId: number) {
  const response = await fetch(`/api/newsposts/${newsId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

export async function createNews(data: { title: string; text: string }) {
  const response = await fetch(`/api/newsposts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create news");
  }

  return response.json();
}

export async function deleteNews(id: number) {
  const response = await fetch(`/api/newsposts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete news");
  }

  return response.json();
}

export async function updateNews(
  id: number,
  data: { title: string; text: string },
) {
  const response = await fetch(`/api/newsposts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update news");
  }

  return response.json();
}
