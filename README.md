News Service

A simple news application built with React and Node.js. Users can browse news posts, read full articles, create new posts, edit existing ones, and delete posts.

Features

View a list of news posts

Read full news articles

Create new posts

Edit existing posts

Delete posts

Store news data in a JSON file

Tech Stack

Frontend:

React

TypeScript

Vite

CSS

Backend:

Node.js

Express

TypeScript

Storage:

Custom file-based database using JSON

Getting Started

1. Install dependencies

Install the dependencies in both the clientService and serverService directories.

2. Build the frontend

cd clientService
npm install
npm run build

3. Start the backend

cd serverService
npm install
npm run dev

Make sure the server environment variables HOST and PORT are configured.

4. Open the application

Open the address configured for your backend server in your browser.

API Endpoints

Method

Endpoint

Description

GET

/api/newsposts/

Get all news posts

GET

/api/newsposts/:id

Get a news post by ID

POST

/api/newsposts/

Create a news post

PUT

/api/newsposts/:id

Update a news post

DELETE

/api/newsposts/:id

Delete a news post

Data Storage

News posts are stored in a local JSON file. This project uses a custom file-based database instead of a traditional database system.

Purpose

This project was created as a learning assignment to practise building a full-stack web application with React, TypeScript, Express, REST API endpoints, and file-based data storage.
