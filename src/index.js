"use strict";

jQuery(document).ready(function($) {


    /**
     * es6 modules and imports
     */
    // const $ = require('jquery');

    // import sayHello from './hello';
    // sayHello('World');

    /**
     * require style imports
     */

    const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');

// Output of function will append movies

    function editHtml() {
        getMovies().then((movies) => {
            $('#output').html(null);
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, genre, id}) => {
                $('#output').append(
                    `
                        <div class="single-movie" style="padding: 10px;">
                        <h2> ${title} </h2>
                        <h6>rating: ${rating} / 10 <i class="nes-icon is-small star"></i></h6>
                        <h6>Genre: ${genre}</h6>
                        </div>
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
        let title = $('#title').val().toUpperCase();
        if(title !== ""){
            $('#addingTitle').val(title);
            $('#additionModal').modal('show');
        } else {
            alert(`${title} isn't a valid title!`);
            $('#additionModal').modal("hide");
        }

    });

    $('#movieSubmit').click(function () {
        let titleCheck = false;
        let ratingCheck = false;
        let genreCheck = false;
        let title = $('#addingTitle').val().toUpperCase();
        let rating = $('#addingRating').val();
        let genre = $('#addingGenre').val().toUpperCase();
        if(title !== ""){
            $('#addingTitle').val(title);
            titleCheck = true;
        } else {
            alert(`${title} isn't a valid title!`);
        }
        if ((isNaN(parseInt(rating)) === false) && ((rating <= 10) && (rating >= 0))) {
            $('#addingRating').val(rating);
            ratingCheck = true;
        } else {
            alert(`${rating} isn't a valid rating number!`);
        }
        if(genre !== ""){
            $('#addingGenre').val(genre);
            genreCheck = true;
        } else {
            alert(`${genre} isn't a valid genre!`);
        }


        if(titleCheck === true && ratingCheck === true && genreCheck === true){
            $("#movieToSubmit").attr("disabled", true);
            let movie = {
                title: $('#addingTitle').val(),
                rating: $('#addingRating').val(),
                genre: $('#addingGenre').val()
            };
            addMovie(movie);
            editHtml();
            $('#title').val("");
            $('#addingTitle').val("");
            $('#addingRating').val("");
            $('#addingGenre').val("");
            $('#additionModal').modal('hide');
        } else {
            alert('A value is incorrect, please fix this and try again');
            titleCheck = false;
            ratingCheck = false;
            genreCheck = false;
        }


    });


    $('#movieToEdit').click(function () {
        let movieTitle = $('#editTitle').val();
        getMovies()
            .then(films => films.filter(film => film.title.toLowerCase() === movieTitle.toLowerCase()))
            .then(item => {
                $('#newTitle').val(item[0].title.toUpperCase());
                $('#newRating').val(item[0].rating);
                $('#newGenre').val(item[0].genre.toUpperCase());
                $('#editModal').modal('show');
            }).catch(error => {
            $("#movieToDelete").attr("disabled", false);
            alert("Sorry, that movie isn't in the database!'");
        });
    });

    $('#movieChange').click(function () {
        let titleCheck = false;
        let ratingCheck = false;
        let genreCheck = false;
        let title = $('#newTitle').val().toUpperCase();
        let rating = $('#newRating').val();
        let genre = $('#newGenre').val().toUpperCase();
        if(title !== ""){
            $('#newTitle').val(title);
            titleCheck = true;
        } else {
            alert(`${title} isn't a valid title!`);
        }
        if ((isNaN(parseInt(rating)) === false) && ((rating <= 10) && (rating >= 0))) {
            $('#newRating').val(rating);
            ratingCheck = true;
        } else {
            alert(`${rating} isn't a valid rating number!`);
        }
        if(genre !== ""){
            $('#newGenre').val(genre);
            genreCheck = true;
        } else {
            alert(`${genre} isn't a valid genre!`);
        }

        if(titleCheck === true && ratingCheck === true && genreCheck === true){
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
            $('#editModal').modal('hide');
        } else {
            alert('A value is incorrect, please fix this and try again');
            titleCheck = false;
            ratingCheck = false;
            genreCheck = false;
        }

    });


    $('#movieToDelete').click(function () {
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


    $('#movieDelete').click(function () {
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

});