/**
 * es6 modules and imports
 */
const $ = require('jquery');

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log((`id# ${id} - ${title} - rating: ${rating}`));
    // $('#output').html(`id# ${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// addMovies().then((movies) => {
//   movies.append({
//
//   });
// });

$('#movieSubmit').click(function () {
  let movie = {
    'title': $('#title').val(),
    'rating': $('#rating').val()
  };

  addMovie(movie).then(movie => getMovies());
});

