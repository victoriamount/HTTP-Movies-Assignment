import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
        <div className="home-button">
          <Link to="/">Home</Link>
        </div>
        <div className="add-button" style={{ marginLeft: '13px' }}>
          <Link to="/add-movie">New Movie</Link>
        </div>
      </div>
    </div>
  );
}

export default SavedList;
