"use strict";
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
    $('#output').append(`id# ${id} <br> ${title} <br> rating: ${rating}<br>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


$('#movieSubmit').click(function () {
  let movie = {
    title: $('#title').val(),
    rating: $('#rating').val()
  };

  addMovie(movie);
  getMovies()
});

$('#movieChange').click(function(){

});

$('#movieDelete').click(function(){
  let movie = $('#deleteTitle').val();
 getMovies()
      .then(films => films.filter(film => film.title.toLowerCase() === movie.toLowerCase()))
      .then(item => {
        deleteMovie(item[0].id).then(getMovies());
      });

  });

