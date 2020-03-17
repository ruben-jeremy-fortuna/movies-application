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

    function output(value) {
        value.forEach(({title, rating, genre, id}) => {
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
    }


// Output of function will append movies
    function editHtml() {
        getMovies().then((movies) => {
            $('#output').html(null);
            console.log('Here are all the movies:');
            output(movies);
            $("#movieToDelete, #movieToSubmit, #movieToEdit").attr("disabled", false);
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
    }

    editHtml();



    $('#movieToSubmit').click(function () {
        let title = $('#title').val().toString().toUpperCase();
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
                $('#deleteModal').modal('show');
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

    function compareTitleA(a, b){
        const titleA = a.title;
        const titleB = b.title;
        let comparison = 0;
        if (titleA.startsWith("THE ") && titleB.startsWith("THE ")){
            if (titleA.charCodeAt(4) > titleB.charCodeAt(4)){
                comparison = 1;
            } else if (titleA.charCodeAt(4) < titleB.charCodeAt(4)) {
                comparison = -1
            }
        } else if (titleA.charCodeAt(0) > titleB.charCodeAt(0)){
            comparison = 1;
        } else if (titleA.charCodeAt(0) < titleB.charCodeAt(0)){
            comparison = -1
        } else if (titleA.charCodeAt(0) === titleB.charCodeAt(0)){
            if(titleA.charCodeAt(1) > titleB.charCodeAt(1)){
                comparison = 1
            } else if (titleA.charCodeAt(1) < titleB.charCodeAt(1)){
                comparison = -1
            }
        }
        return comparison;
    }


    function compareTitleD(a, b){
        let comparison = compareTitleA(a, b);
        return comparison * -1;
    }

    function compareRatingA(a, b){
        const ratingA = parseInt(a.rating);
        const ratingB = parseInt(b.rating);
        let comparison = 0;
        if(ratingA > ratingB){
            comparison = 1
        } else if (ratingA < ratingB){
            comparison = -1;
        } else if (ratingA === ratingB){
            comparison = compareTitleA(a, b)
        }
        return comparison;
    }

    function compareRatingD(a, b){
        let comparison = compareRatingA(a, b);
        return comparison * -1;
    }



    function compareGenreA(a, b){
        const genreA = a.genre;
        const genreB = b.genre;

        let comparison = 0;
        if (genreA.charCodeAt(0) > genreB.charCodeAt(0)){
            comparison = 1;
        } else if (genreA.charCodeAt(0) < genreB.charCodeAt(0)){
            comparison = -1
        } else if (genreA.charCodeAt(0) === genreB.charCodeAt(0)){
            if(genreA.charCodeAt(1) > genreB.charCodeAt(1)){
                comparison = 1
            } else if (genreA.charCodeAt(1) < genreB.charCodeAt(1)){
                comparison = -1
            }
        }
        return comparison;
    }


    function compareGenreD(a, b){
        let comparison = compareGenreA(a, b);
        return comparison * -1;
    }








    $('#ascendingTitle').click(function(){
        getMovies().then((movies) => {
            $('#output').html(null);
            let moviesArray = movies.sort(compareTitleA);
            output(moviesArray);
        })
    });

    $('#descendingTitle').click(function(){
        getMovies().then((movies) => {
            $('#output').html(null);
            let moviesArray = movies.sort(compareTitleD);
            output(moviesArray);
        })
    });


    $('#ascendingRating').click(function(){
        getMovies().then((movies) => {
            $('#output').html(null);
            let moviesArray = movies.sort(compareRatingA);
            output(moviesArray);
        })
    });

    $('#descendingRating').click(function(){
        getMovies().then((movies) => {
            $('#output').html(null);
            let moviesArray = movies.sort(compareRatingD);
            output(moviesArray);
        })
    });


    $('#ascendingGenre').click(function(){
        getMovies().then((movies) => {
            $('#output').html(null);
            let moviesArray = movies.sort(compareGenreA);
            output(moviesArray);
        })
    });

    $('#descendingGenre').click(function(){
        getMovies().then((movies) => {
            $('#output').html(null);
            let moviesArray = movies.sort(compareGenreD);
            output(moviesArray);
        })
    });



});