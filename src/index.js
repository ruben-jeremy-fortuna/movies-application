/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovies, editMovies, deleteMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log((`id# ${id} - ${title} - rating: ${rating}`));
    $('#output').html(`id# ${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

addMovies().then((movies) => {
  movies.append({
    'title': $('#title').val(),
    'rating': $('#rating').val()
  });
  getMovies
});
