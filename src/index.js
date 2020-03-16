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
            $('#output').append(
                `<br>   
                        <div class="single-movie">
                        <h2> ${title} </h2>
                        <h5>rating: ${rating} / 10 <i class="nes-icon is-small star"></i></h5>
                        <h5>Genre: ${genre}</h5>
                        </div>
                <br>
                `);
        });
        $("#movieToDelete, #movieToSubmit, #movieToEdit").attr("disabled", false);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}
editHtml();

$('#movieToSubmit').click(function () {
    $('#addingTitle').val($('#title').val().toUpperCase());
    $('#addingRating').val($('#rating').val());
    $('#addingGenre').val($('#genre').val().toUpperCase());
});

$('#movieSubmit').click(function () {
    $("#movieToSubmit").attr("disabled", true);
    let movie = {
        title: $('#addingTitle').val(),
        rating: $('#addingRating').val(),
        genre: $('#addingGenre').val()
    };
    addMovie(movie);
    editHtml();
    $('#title').val("");
    $('#rating').val("");
    $('#genre').val("");
    $('#addingTitle').val("");
    $('#addingRating').val("");
    $('#addingGenre').val("");
});


$('#movieToEdit').click(function(){
    let movieTitle = $('#editTitle').val();
    getMovies()
        .then(films => films.filter(film => film.title.toLowerCase() === movieTitle.toLowerCase()))
        .then(item => {
            $('#newTitle').val(item[0].title.toUpperCase());
            $('#newRating').val(item[0].rating);
            $('#newGenre').val(item[0].genre.toUpperCase());
        }).catch(error => {
        $("#movieToDelete").attr("disabled", false);
        alert("Sorry, that movie isn't in the database!'")
    });
});

$('#movieChange').click(function(){
    $("#movieToEdit").attr("disabled", true);
    let movieEdit = {
        title: $('#newTitle').val(),
        rating: $('#newRating').val(),
        genre: $('#newGenre').val()
    };
    let movieTitle = $('#editTitle').val();
    getMovies()
        .then(films => films.filter(film => film.title.toLowerCase() === movieTitle.toLowerCase()))
        .then(item => {
            editMovie(item[0].id, movieEdit);
            editHtml();
            $('#newTitle').val("");
            $('#newRating').val("");
            $('#newGenre').val("");
            $('#editTitle').val("");
        });
});




$('#movieToDelete').click(function(){
    let movie = $('#deleteTitle').val();
    getMovies()
        .then(films => films.filter(film => film.title.toLowerCase() === movie.toLowerCase()))
        .then(item => {
            $('#delTitle').val(item[0].title.toUpperCase());
            $('#delRating').val(item[0].rating);
            $('#delGenre').val(item[0].genre.toUpperCase());
        }).catch(error => {
        $("#movieToDelete").attr("disabled", false);
        alert("Sorry, that movie isn't in the database!'")
    });
});


$('#movieDelete').click(function(){
    $("#movieToDelete").attr("disabled", true);
    let movie = $('#deleteTitle').val();
    getMovies()
        .then(films => films.filter(film => film.title.toLowerCase() === movie.toLowerCase()))
        .then(item => {
            deleteMovie(item[0].id);
            editHtml();
            $('#deleteTitle').val("");
        });
});


//
//
// function editHtml () {
//     getMovies().then((movies) => {
//         $('#output').html(null);
//         console.log('Here are all the movies:');
//         movies.forEach(({title, rating, genre, id}) => {
//
//             $('#output').append(
//                 `<br>
//                         <div class="single-movie">
//                         <h2> ${title} </h2>
//                         <h5>rating: ${rating} / 10 <i class="nes-icon is-small star"></i></h5>
//                         <h5>Genre: ${genre}</h5>
//                         </div>
//                 <br>
//                 `);
//         });
//     }).catch((error) => {
//         alert('Oh no! Something went wrong.\nCheck the console for details.');
//         console.log(error);
//     });
// }
// editHtml();
//
//
//     $('#movieSubmit').click(function () {
//       let movie = {
//         title: $('#title').val(),
//         rating: $('#rating').val(),
//         genre: $('#genre').val()
//       };
//       addMovie(movie);
//       editHtml();
//     });
//
//
//     let stars = movie.genre;
//
//
// $('#movieChange').click(function(){
//         let movieEdit = {
//             title: $('#newTitle').val(),
//             rating: $('#newRating').val(),
//             genre: $('#genre').val()
//         };
//         let movieTitle = $('#editTitle').val();
//         getMovies()
//             .then(films => films.filter(film => film.title.toLowerCase() === movieTitle.toLowerCase()))
//             .then(item => {
//                 editMovie(item[0].id, movieEdit);
//                 editHtml();
//             });
//     });
//
//     $('#movieDelete').click(function(){
//       let movie = $('#deleteTitle').val();
//      getMovies()
//           .then(films => films.filter(film => film.title.toLowerCase() === movie.toLowerCase()))
//           .then(item => {
//             deleteMovie(item[0].id);
//             editHtml();
//           });
//       });

