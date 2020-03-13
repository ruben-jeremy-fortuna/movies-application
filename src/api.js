module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  addMovies: () => {
    return fetch('/api/movies', {
      method: 'post',
      headers: 'Content-Type: application/json'
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


