// src/components/MovieCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ id, title, year, rating, poster }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault(); // Empêcher la navigation lors du clic
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="col-md-3 mb-4">
      <Link to={`/movie/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card h-100 hover-card">
          <img
            src={poster}
            className="card-img-top"
            alt={title}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <span className="badge bg-primary">{year}</span>
              <span className="badge bg-warning ms-2">⭐ {rating}/10</span>
            </p>
            <button
              className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleLike}
            >
              {isLiked ? '❤️' : '🤍'} {likes} likes
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
