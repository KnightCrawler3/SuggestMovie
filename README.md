# AI-Powered Movie Recommendation App

Thanks to the creator, this Angular MoviesExpo app now includes AI-powered movie suggestions using embeddings, vector search, and local LLM explanations.

## Features

- Browse movies and TV shows from TMDB
- **NEW**: AI-powered movie recommendations based on natural language preferences
- Local embeddings for semantic search
- Local LLM (Ollama) for natural explanations
- All AI processing is private and offline

## Architecture

- **Frontend**: Angular app for user interface
- **Backend**: Node.js Express server with AI components
- **Embeddings**: Sentence Transformers (all-MiniLM-L6-v2) via @xenova/transformers
- **Vector Search**: Cosine similarity over movie embeddings
- **LLM**: Local Ollama with Llama3 for natural explanations

## Setup Instructions

### Prerequisites
- Node.js installed
- Ollama installed with Llama3 model: `ollama pull llama3`
- **TMDB API Key** (optional but recommended for fresh movie data):
  1. Go to https://www.themoviedb.org/settings/api
  2. Create a free account and request an API key
  3. Set environment variable: `TMDB_API_KEY=your_api_key_here`

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Update Movie Database** (recommended):
   ```bash
   # With TMDB API key (fresh data)
   TMDB_API_KEY=your_api_key npm run update-movies

   # Or use the included dataset (50 classic movies)
   npm start
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:3000 and initialize embeddings (this may take a minute).

### Frontend Setup
1. In a new terminal, navigate to the root directory:
   ```bash
   cd angular-movie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   npm start
   ```
   The app will be available at http://localhost:4200

## Usage

1. Open the app in your browser
2. Go to the "Suggest Me Movies" page
3. Enter your movie preferences in natural language (e.g., "sci-fi thrillers with time travel")
4. Click "Get AI Recommendations"
5. View the recommended movies and AI-generated explanation

## API Endpoints

- `POST /recommend`: Get movie recommendations based on user preference
- `POST /explain`: Get natural language explanation for recommendations
- `GET /health`: Check server status

## How It Works

1. User enters a preference (e.g., "movies like Inception")
2. Backend converts preference to embedding vector
3. Finds most similar movies using cosine similarity
4. Sends top movies + preference to Ollama for explanation
5. Returns recommendations with natural text explanation

### Movie Database

The system uses a local movie database stored in `backend/movies.json`. The current dataset includes 50 diverse movies across all genres.

**To update with fresh TMDB data:**
```bash
cd backend
TMDB_API_KEY=your_api_key npm run update-movies
npm start  # Restart to reload embeddings
```

**Why more movies = better recommendations:**
- With 5 movies: Limited variety, similar results
- With 50+ movies: Diverse recommendations across genres
- With 100+ movies: Highly accurate, personalized suggestions

All processing is local and private - no external API calls for AI.

## Original Project Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.

### Angular FlixMovies & TV Shows was generated with:

- Angular CLI version 8.3.9
- Angular 8.3.9
- Angular Material 8.1.4
- AngularFire 5.2.1
- Firebase js SDK 7.1.0
- Rxjs 6.5.2
- PrimeNg Library 8.0 -> https://www.primefaces.org/primeng/#/
- The Movie DB get Your own api key -> https://www.themoviedb.org
- Firebase get your own firebase data -> https://firebase.google.com

### Installation

```bash
git clone https://github.com/KnightCrawler3/SuggestMovie.git
cd angular-movie-app
npm install
ng serve and go to http://localhost:4200/
```

### Become a contributor ?

Find a bug, contribute some code or suggest ideas ? don't hesitate ! Create a pull request or an issue.
