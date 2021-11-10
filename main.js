const apiKey = "8aed6689a5a522ba993af5a55ca53143";
const searchInput = document.getElementById("input");
const submitBtn = document.querySelector("button");
const resultsDiv = document.querySelector('.results');
const posterImg = document.getElementById('poster');
const seeMoreBtn = document.getElementById('btn');
const footer = document.querySelector('footer');
const seasons = document.getElementById('seasons');
const episodes = document.getElementById('episodes');
const rating = document.getElementById('rating');

function searchShows(){
    const titleSearch = searchInput.value;
    const dataPromise = 
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${titleSearch}`);
    dataPromise
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(typeof data.results); //Object
        console.log(data.results);
        console.log(Array.isArray(data.results)); //True
        const numOfResults = data.results.length; //How many matches?
        console.log(Array.isArray(data.results[0])); //False
        console.log(typeof (data.results[0])); //Object
        console.log(data.results[0].name); //Sample of first match
        const yearOfAiring = data.results[0].first_air_date;
        console.log(yearOfAiring);
        console.log(typeof yearOfAiring); //String
        const showMatches = data.results;
        resultsDiv.insertAdjacentHTML('beforebegin', `<h2>Your search returned ${numOfResults} results.</h2>`)
        showMatches.forEach((match) => {
            const show = `
                <li class="card"> 
                    <img src="https://image.tmdb.org/t/p/w780/${match.backdrop_path}" alt="">
                    <div>
                        <p>${match.name}</p><p>${match.first_air_date.substring(0,4)}</p>
                    </div>
                    <p>${match.id}</p>
                    <a id="btn" href="details.html">See more</a>
                </li>`;
                resultsDiv.insertAdjacentHTML('beforeend', show);
            });
        });
}
submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    resultsDiv.innerHTML = "";
    searchShows();
});
// Consume API showing details of the show
function redirectToShowDetails(){
    const secondPromise = 
        fetch(`https://api.themoviedb.org/3/tv/2316?api_key=${apiKey}&language=en-US`);
    secondPromise
        .then((response) => {
            return response.json();
        })
        .then((details) => {
            console.log(details);
            console.log(typeof details); //Object
            console.log(details.original_name);
            console.log(details.overview);
            console.log(details.first_air_date);
            console.log(details.number_of_episodes);
            console.log(details.last_air_date);
            console.log(details.popularity);
            console.log(details.status);
            console.log(details.vote_average);
            posterImg.src = `https://image.tmdb.org/t/p/w780/${details.backdrop_path}`;
            seasons.insertAdjacentText('beforebegin', `${details.number_of_seasons}`)
        }) 
    }
window.onload = redirectToShowDetails();
// Consume API showing details of the episodes
function episodeDetails(){
    const thirdPromise = 
        fetch(`https://api.themoviedb.org/3/tv/2316/season/1/episode/1?api_key=${apiKey}&language=en-US`);
    thirdPromise
        .then((response) => {
            return response.json();
        })
        .then((episodeDetails) => {
            const episode = episodeDetails;
            console.log(typeof episodeDetails);
            const episodeTab = `
                <div class="tab">
                    <ul>
                        <li>${episode.name}</li>
                        <li>${episode.overview}</li>
                        <li>Aired in ${episode.air_date.substring(0,4)}</li>
                        <li>Season ${episode.season_number}</li>
                        <li>Episode ${episode.episode_number}</li>
                        <li>Vote Average${episode.vote_average}</li>
                    </ul>
                </div>`;
            resultsDiv.insertAdjacentHTML('beforeend', episodeTab);
        })
}
footer.addEventListener('click', function(){
    episodeDetails();
});
