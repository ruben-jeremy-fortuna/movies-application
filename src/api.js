module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  addMovies: (movie) => {
    return fetch('/api/movies', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(movie)
    }).then(response => response.json());
  },

  editMovies: () => {
    return fetch('/api/movies', {
      method: 'patch',
      headers: 'Content-Type: application/json'
    }).then(response => response.json());
  },

  deleteMovies: () => {
    return fetch('/api/movies', {
      method: 'delete',
      headers: 'Content-Type: application/json'
    }).then(response => response.json());
  }

};


