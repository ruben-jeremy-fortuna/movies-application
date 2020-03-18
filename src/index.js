"use strict";

jQuery(document).ready(function($) {


    const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');


    function output(value) {
        value.forEach(({title, rating, genre, id}) => {
            $('#output').append(
                `  
                        <div class="single-movie card">
                        <div class="card-body"><h2 style="color: #ffc901"> ${title} </h2>
                        <h5>rating: <span style="font-family: 'Cuprum', sans-serif; font-size: 18px;">${rating} / 10 <i class="nes-icon is-small star"></i></span></h5>
                        <h5>Genre: <span style="font-family: 'Cuprum', sans-serif; font-size: 18px;">${genre}</span></h5>
                        </div>
                        </div>
               
                `);
        });
        $('.btn').attr("disabled", false);
    }
    $('.usebtn').hover(
        function () {
            $(this).css('transform','scale(1.1)');
        },
        function () {
            $(this).css('transform','scale(1)');
        }
    );

    let searchArray = [];
    let newSearchArray = [];


    let sortData={
        "titleA":false,
        "titleD" : false,
        "ratingA" : false,
        "ratingD" : false,
        "genreA" : false,
        "genreD" : false
    };

    let searchData = {
        "titleS" : true,
        "ratingS" : false,
        "genreS" : false
    };



    function resetAllSorts(truth){
        sortData.titleA = false;
        sortData.titleD = false;
        sortData.ratingA = false;
        sortData.ratingD = false;
        sortData.genreA = false;
        sortData.genreD = false;
        sortData[truth] = true;
    }

    function resetAllSearch(property){
        searchData.titleS = false;
        searchData.ratingS = false;
        searchData.genreS = false;
        searchData[property] = true;
    }


// Output of function will append movies
    function editHtml() {
        getMovies().then((movies) => {
            $('#output').html(null);
            console.log('Here are all the movies:');
            output(movies);
            getMovies().then(movies => {
                searchArray = movies
            });
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
            $(".btn").attr("disabled", true);
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
            $(".btn").attr("disabled", true);
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
        $(".btn").attr("disabled", true);
        let movie = $('#deleteTitle').val();
        getMovies()
            .then(films => films.filter(film => film.title.toLowerCase() === movie.toLowerCase()))
            .then(item => {
                deleteMovie(item[0].id);
                editHtml();
                $('#deleteTitle').val("");
            });
    });



    // COMPARING FUNCTIONS

    function compareTitleA(a, b){
        const titleA = a.title;
        const titleB = b.title;
        let comparison = 0;
        if (titleA > titleB){
            comparison = 1
        } else if (titleA < titleB) {
            comparison = -1
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
        if (genreA > genreB){
            comparison = 1
        } else if (genreA < genreB) {
            comparison = -1
        }
        return comparison;
    }


    function compareGenreD(a, b){
        let comparison = compareGenreA(a, b);
        return comparison * -1;
    }


    // SORTING FUNCTIONS

    function arraySort(array, compare){
        $('#output').html(null);
        let moviesArray = array.sort(compare);
        output(moviesArray);
    }

    function sortActive(array) {
        if (sortData.titleA === true) {
            let moviesArray = array.sort(compareTitleA);
            $('#choice').html("Ascending Titles");
            output(moviesArray);
        } else if (sortData.titleD === true) {
            let moviesArray = array.sort(compareTitleD);
            $('#choice').html("Descending Titles");
            output(moviesArray);
        } else if (sortData.ratingA === true) {
            let moviesArray = array.sort(compareRatingA);
            $('#choice').html("Ascending Ratings");
            output(moviesArray);
        } else if (sortData.ratingD === true) {
            let moviesArray = array.sort(compareRatingD);
            $('#choice').html("Descending Ratings");
            output(moviesArray);
        } else if (sortData.genreA === true) {
            let moviesArray = array.sort(compareGenreA);
            $('#choice').html("Ascending Genres");
            output(moviesArray);
        } else if (sortData.genreD === true) {
            let moviesArray = array.sort(compareGenreD);
            $('#choice').html("Descending Genres");
            output(moviesArray);
        } else {
            output(array)
        }

    }

// SORTING BUTTONS



    $('#ascendingTitle').click(function(){
        $('.btn').attr("disabled", true);
        if($('#search').val() !== "" && $('#search').val().length > 0){
            arraySort(newSearchArray, compareTitleA);
            $('#choice').html("Ascending Titles")
        } else {
            getMovies().then((movies) => {
                arraySort(movies, compareTitleA);
                $('#choice').html("Ascending Titles");
                resetAllSorts('titleA');
                console.log(sortData.titleA + "This is titleA");
            })
        }
    });

    $('#descendingTitle').click(function(){
        $('.btn').attr("disabled", true);
        if($('#search').val() !== "" && $('#search').val().length > 0){
            arraySort(newSearchArray, compareTitleD);
            $('#choice').html("Descending Titles")
        } else {
            getMovies().then((movies) => {
                arraySort(movies, compareTitleD);
                $('#choice').html("Descending Titles");
                resetAllSorts('titleD');
            })
        }
    });


    $('#ascendingRating').click(function() {
        $('.btn').attr("disabled", true);
        if ($('#search').val() !== "" && $('#search').val().length > 0) {
            arraySort(newSearchArray, compareRatingA);
            $('#choice').html("Ascending Ratings")
        } else {
            getMovies().then((movies) => {
                arraySort(movies, compareRatingA);
                $('#choice').html("Ascending Ratings");
                resetAllSorts('ratingA');
            })
        }
    });

    $('#descendingRating').click(function(){
        $('.btn').attr("disabled", true);
        if($('#search').val() !== "" && $('#search').val().length > 0){
            arraySort(newSearchArray, compareRatingD);
            $('#choice').html("Descending Ratings")
        } else {
            getMovies().then((movies) => {
                arraySort(movies, compareRatingD);
                $('#choice').html("Descending Ratings");
                resetAllSorts('ratingD');
            })
        }
    });


    $('#ascendingGenre').click(function(){
        $('.btn').attr("disabled", true);
        if($('#search').val() !== "" && $('#search').val().length > 0){
            arraySort(newSearchArray, compareGenreA);
            $('#choice').html("Ascending Genres")
        } else {
            getMovies().then((movies) => {
                arraySort(movies, compareGenreA);
                $('#choice').html("Ascending Genres");
                resetAllSorts('genreA');
            })
        }
    });

    $('#descendingGenre').click(function(){
        $('.btn').attr("disabled", true);
        if($('#search').val() !== "" && $('#search').val().length > 0){
            arraySort(newSearchArray, compareGenreD);
            $('#choice').html("Descending Genres")
        } else {
            getMovies().then((movies) => {
                arraySort(movies, compareGenreA);
                $('#choice').html("Descending Genres");
                resetAllSorts('genreD');
            })
        }
    });

    $('#sortReset').click(function () {
        $('.btn').attr("disabled", true);
        if($('#search').val() !== "" && $('#search').val().length > 0){
            resetAllSorts(null);
            $('#choice').html("Movie Sort Options");
            output(newSearchArray)
        } else {
            resetAllSorts(null);
            $('#choice').html("Movie Sort Options");
            output(searchArray)
        }
    });


    // SEARCH BUTTONS

    $('#searchTitleButton').click(function(){
        resetAllSearch('titleS');
        $('#choice2').html('Search by Title')
    });

    $('#searchRatingButton').click(function(){
        resetAllSearch('ratingS');
        $('#choice2').html('Search by Rating (0-10)');
        console.log(searchData.ratingS);
    });

    $('#searchGenreButton').click(function(){
        resetAllSearch('genreS');
        $('#choice2').html('Search by Genre')
    });


    // SEARCH FUNCTIONALITY

    $('#search').on('input',function (e) {

        let result = $('#search').val().toUpperCase();

        if ((result !== "") && (result.length > 0)) {
            if(searchData.titleS === true) {
                $('#output').html(null);
                newSearchArray = searchArray.filter(movie => {
                    return movie.title.includes(result);
                });
                sortActive(newSearchArray)
            } else if(searchData.ratingS === true){
                console.log("PureRatingTest");
                if(isNaN(result) === true || !((result <= 10) && (result >= 0))){
                    console.log('NANTest');
                    alert('This is not a valid criteria for this this search');
                    $('#search').val("");
                    output(searchArray)
                } else {
                    console.log("OkayNum");
                    $('#output').html(null);
                    newSearchArray = searchArray.filter(movie => {
                        return movie.rating.includes(result);
                    });
                    sortActive(newSearchArray)
                }
            } else if(searchData.genreS === true){
                $('#output').html(null);
                newSearchArray = searchArray.filter(movie => {
                    return movie.genre.includes(result);
                });
                sortActive(newSearchArray)
            }



        } else {
            sortActive(searchArray)
        }
    })



});
