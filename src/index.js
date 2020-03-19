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

// Output of function will append movies
function editHtml () {
    getMovies().then((movies) => {
        $('#output').html(null);
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, genre, id}) => {

            $('#output').append(`<br> <h2> ${title} </h2><h5>rating: ${rating} / 10 <i class="nes-icon is-small star"></i></h5><h5>Genre: ${genre}</h5>`);

        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}
editHtml();

$('#movieSubmit').click(function () {
    $("#movieSubmit").attr("disabled", true);
    let movie = {
        title: $('#title').val(),
        rating: $('#rating').val()
    };

    addMovie(movie);
    editHtml();
});

$('#movieChange').click(function(){
    $("#movieChange").attr("disabled", true);
    let movieEdit = {
        title: $('#newTitle').val(),
        rating: $('#newRating').val()
    };
    let movieTitle = $('#editTitle').val();
    getMovies()
        .then(films => films.filter(film => film.title.toLowerCase() === movieTitle.toLowerCase()))
        .then(item => {
            editMovie(item[0].id, movieEdit);
            editHtml();
        });
});

$('#movieDelete').click(function(){
    $("#movieDelete").attr("disabled", true);
    let movie = $('#deleteTitle').val();
    getMovies()
        .then(films => films.filter(film => film.title.toLowerCase() === movie.toLowerCase()))
        .then(item => {
            deleteMovie(item[0].id);
            editHtml();
        });
});

