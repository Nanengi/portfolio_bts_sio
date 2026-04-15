// src/pages/MovieDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdbApi';

function MovieDetails() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate(); // Pour la navigation programmatique
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setLoading(true);
        const details = await getMovieDetails(id);
        setMovie(details);
        setError(null);
      } catch {
        setError('Impossible de charger les détails du film');
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]); // Recharger si l'ID change

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error || 'Film introuvable'}</div>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Bannière avec image de fond */}
      {movie.backdrop && (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${movie.backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '100px 0',
            marginBottom: '30px'
          }}
        >
          <div className="container">
            <button
              className="btn btn-outline-light mb-3"
              onClick={() => navigate(-1)}
            >
              ← Retour
            </button>
            <h1 className="text-white display-4">{movie.title}</h1>
            <p className="text-white fs-5">{movie.year}</p>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row">
          {/* Colonne gauche : Poster */}
          <div className="col-md-4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="img-fluid rounded shadow-lg"
            />

            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Informations</h5>
                <p className="mb-1"><strong>Note :</strong> ⭐ {movie.rating}/10</p>
                <p className="mb-1"><strong>Durée :</strong> {movie.runtime} min</p>
                <p className="mb-1">
                  <strong>Genres :</strong>
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="badge bg-secondary ms-1">
                      {genre}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite : Détails */}
          <div className="col-md-8">
            <h2 className="mb-3">Synopsis</h2>
            <p className="lead">{movie.overview}</p>

            <hr className="my-4" />

            <h3 className="mb-3">Distribution</h3>
            <div className="row">
              {movie.cast.map(actor => (
                <div key={actor.id} className="col-md-3 col-6 mb-3">
                  <div className="card">
                    <img
                      src={actor.photo}
                      className="card-img-top"
                      alt={actor.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-body p-2">
                      <p className="card-text small mb-0">
                        <strong>{actor.name}</strong>
                      </p>
                      <p className="card-text small text-muted">{actor.character}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
