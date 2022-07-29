const API_kEY = 'api_key=1f4a60baa8bcbe1473222d8591a0a52d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL  = BASE_URL + '/discover/movie?sort_by=popularity.desc&'
 +API_kEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchurl = BASE_URL + '/search/movie?' + API_kEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getmiove(API_URL);


function getmiove(url){
    fetch(url).then ( res => res.json()).then(data => {
        console.log(data.results)
showmovies(data.results);
    })
}


function showmovies(data){
main.innerHTML = '';
    data.forEach(movie => {
        const {title , poster_path, vote_average , overview} = movie;
        const moviel = document.createElement('div');
        moviel.classList.add('movie');
        moviel.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="moive-info">
            <h3>${title}</h3>
            <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">

            <h3>overview</h3>
     ${overview}

        </div>
        `

        main.appendChild(moviel);
    })
}


function getcolor(vote){
if(vote >= 8 ){
    return 'green'
}else if(vote >=5 ){
    return "orange"
}else {
    return 'red'
}
}


form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const searchterm = search.value;
    if(searchterm){
        getmiove(searchurl+'&query='+searchterm)
    }else{
        getmiove(API_URL);
    }
})