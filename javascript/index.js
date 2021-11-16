const apiKey = "8aed6689a5a522ba993af5a55ca53143";
const searchInput = document.getElementById("input");
const submitBtn = document.querySelector("button");
const resultsDiv = document.querySelector('.results');
const seeMoreBtn = document.getElementById('btn');

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
                    <p>${match.name}</p>
                    <p>${match.first_air_date.substring(0,4)}</p>
                </div>
                <p>${match.id}</p>
                <a id="btn" href="/details.html?id=${match.id}">See more</a>
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
