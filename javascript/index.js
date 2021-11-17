const apiKey = "8aed6689a5a522ba993af5a55ca53143";
const form = document.querySelector("form");
const searchInput = document.getElementById("input");
const submitBtn = document.querySelector("button");
const resultsDiv = document.querySelector('.results');
const seeMoreBtn = document.getElementById('btn');
const mobileDiv = document.querySelector('.mobile-div');
const videoDiv = document.querySelector('video');
const heroDiv = document.querySelector('.hero-img');
const main = document.querySelector('main');

function searchShows(){
    mobileDiv.classList.add('close');
    videoDiv.classList.add('close');
    heroDiv.classList.add('close');
    main.classList.add('height');
    form.classList.add('close');
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
        console.log(data.results.yearOfAiring);
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
                    <a id="btn" href="/details.html?id=${match.id}">See more</a>
                </li>`;
            resultsDiv.insertAdjacentHTML('beforeend', show);
            const showImg = document.querySelector('.card img');
                if (showImg.src === "https://image.tmdb.org/t/p/w780/null"){
                    console.log('it worked');
                    showImg.src = "images/Image_not_available.png";
                }
        });
    });
}
submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    resultsDiv.innerHTML = "";
    searchShows();
});
