# News Service

A simple full-stack news application where users can view, create, edit, and delete news posts.

## Features

- View all news posts
- Read full news articles
- Create new posts
- Edit existing posts
- Delete posts
- Store news in a JSON file

## Tech Stack

- **Frontend:** React, TypeScript, Vite, CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** Custom file-based database using JSON

## Getting Started

### Install Dependencies

Install dependencies in both `clientService` and `serverService` directories:

```bash
npm install
```

### Build the Frontend

```bash
cd clientService
npm run build
```

### Start the Backend

```bash
cd serverService
npm run dev
```

Make sure the `HOST` and `PORT` environment variables are configured.

Open the application at the address configured for your backend server.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/newsposts/` | Get all news posts |
| GET | `/api/newsposts/:id` | Get a news post by ID |
| POST | `/api/newsposts/` | Create a news post |
| PUT | `/api/newsposts/:id` | Update a news post |
| DELETE | `/api/newsposts/:id` | Delete a news post |

## Data Storage

News posts are stored in a local JSON file using a custom file-based database.

## Purpose

This project was created as a learning assignment to practise full-stack development, REST APIs, React, TypeScript, and Express.
