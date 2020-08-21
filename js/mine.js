let movies;
let data;
let imgPrefix = "https://image.tmdb.org/t/p/w500";
let currentPage = 1;

getMovies();

/* Function to get movies from tje API */
function getMovies () {
    /* Variable to instance XMLHttpRequest */
    let req;
    /* Check if the browser support the XMLHttpRequest or nt */
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    console.log(req);       // for test

    /* Variable to carry the URL */
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=66d42eace3ba8c9e20e33bbc3ac948e7&page=`+ currentPage +``;

    /* Open connection between the two sites */
    req.open("GET", url);

    /* Event which fire on any change in the data (readyState) */
    req.onreadystatechange = function () {
        /* Check if status is correct and the data (response) is ready => get the data and conert it to array of objects */
        if (req.status == 200 && req.readyState == 4) {
            movies = JSON.parse(req.response);
            data = movies.results;
            console.log(imgPrefix+data[0].poster_path);
            displayMovies();
        }
    };
    /* Send the data */
    req.send();
}


/* Function to display the data */
function displayMovies () {
    let temp = "";
    let tempTv = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].media_type == 'movie') {
            temp += `<div class="col-md-4">
                        <div class="movie-card my-4">
                            <a onclick="getDesc(`+ i +`)">
                                <img class="img-fluid" src=" https://image.tmdb.org/t/p/w500`+data[i].poster_path+` " />
                                <div class="movie-desc">
                                    <h4>`+ data[i].title +`</h4>
                                    <h6>`+ data[i].vote_average +`</h6>
                                    <i class="fas fa-star rate"></i>
                                    <i class="fas fa-star rate"></i>
                                    <i class="fas fa-star rate"></i>
                                    <i class="fas fa-star rate"></i>
                                    <i class="fas fa-star rate"></i>
                                    <h6>Release Date: `+ data[i].release_date +`</h6>
                                </div>
                            </a>
                        </div>
                    </div>`;
        }
    }
    document.getElementById("content").innerHTML = temp;
    pagination();
}

/* Function to dosplay the pagination */
function pagination () {
    let temp = "";
    for (let i = 1; i <= 10 ;i++) {
        temp += `<li class="page-item" onclick="getPage(`+ i +`)"><a class="page-link">`+ i +`</a></li>`;
    }
    document.getElementById("pageNum").innerHTML = temp;
}

/* Function to get the new page */
function getPage (i) {
    currentPage = i;
    getMovies();
}

/* Function to show the movie description in the same page */
function getDesc(i) {
    let temp = "";
    temp += `<div class="col">
            <div class="row movie-detailes">
                <div class="col-md-6">
                    <img class="img-fluid" src=" https://image.tmdb.org/t/p/w500`+data[i].poster_path+` " />
                </div>
                <div class="col-md-6">
                    <a href="index.html" class="back" title="back"><i class="far fa-arrow-alt-circle-left fa-2x"></i></a>
                    <h2>`+ data[i].title +`</h2>
                    <h6>`+ data[i].vote_average +`</h6>
                    <i class="fas fa-star rate"></i>
                    <i class="fas fa-star rate"></i>
                    <i class="fas fa-star rate"></i>
                    <i class="fas fa-star rate"></i>
                    <i class="fas fa-star rate"></i>
                    <h6>Release Date: `+ data[i].release_date +`</h6>
                    <a href="https://image.tmdb.org/t/p/w500`+data[i].backdrop_path+ `" target="_blank">Backdrop</a>
                    <p>`+ data[i].overview +`</p>
                    <h6>The Popularity: `+ data[i].popularity +`</h6>
                    <h6>Media Type: `+ data[i].media_type +`</h6>
                </div>
            </div>
        </div>`;
    document.getElementById("content").innerHTML = temp;
}