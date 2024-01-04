# Backend Assessment

This repository contains the backend assessment project.

## Tech Stacks Used

- MongoDB
- Express.js
- Node.js

## Getting Started

After cloning or downloading the repository, follow these steps to set up and run the project:

1. Install dependencies:

   ```bash
   npm install
2. Start the application: 
   ```bash
   npm start

3. Now you can hit the api on localhost:3000, or you can also change the port in the src/index.js file

## Endpoints

### Authentication Endpoints

1. POST /api/auth/signup: create a new user account.
2. POST /api/auth/login: log in to an existing user account and receive an access token.

### Note Endpoints

1. GET /api/notes: get a list of all notes for the authenticated user.
2. GET /api/notes/ get a note by ID for the authenticated user.
3. POST /api/notes: create a new note for the authenticated user.
4. PUT /api/notes/ update an existing note by ID for the authenticated user.
5. DELETE /api/notes/ delete a note by ID for the authenticated user.
6. POST /api/notes/:id/share: share a note with another user for the authenticated user.
7. GET /api/search?q=:query: search for notes based on keywords for the authenticated user.