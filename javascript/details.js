const apiKey = "8aed6689a5a522ba993af5a55ca53143";
const main = document.querySelector('main');
// Consume API showing details of the show
function redirectToShowDetails(){
    // Pick up show ID from the href
    const idFromUrl = window.location.search.split("?id=")[1];
    console.log(idFromUrl);
    // Get general details of the show (how many seasons and episodes)
    const secondPromise = 
        fetch(`https://api.themoviedb.org/3/tv/${idFromUrl}?api_key=${apiKey}&language=en-US`);
        secondPromise
            .then((response) => {return response.json();})
            .then((details) => {
                console.log(details);
                console.log(details.seasons); //Returns an array with description of the seasons, including how many episodes each season had
                const arrayOfSeasons = details.seasons; //Save this array
                const arrayOfEpisodes = []; //Create an empty array to push in how many episodes there are
                    for(let value of Object.values(arrayOfSeasons)){ 
                        arrayOfEpisodes.push(value.episode_count); //Pick up episode count and push it in the arrayOfEpisodes
                    }
                console.log(arrayOfEpisodes);
                console.log(arrayOfEpisodes, "array-episodes");
                const theEpisodes = arrayOfEpisodes.reduce(
                    (accum, current) => (accum += current)
                );
                console.log(theEpisodes); //Array Iterator
                
                const episodeValues = arrayOfEpisodes.map((episode) => {
                    console.log(episode);
                });

                const episodeVls = arrayOfEpisodes.forEach(element => console.log(element));
                // To create the loop later we need to know how many times it needs to run the iteration
                let numberOfSeasons = details.number_of_seasons; //Get number of seasons to loop over and number of season strips
                console.log(typeof numberOfSeasons); // 5 Number

                // I will turn the seasons into an array and the episodes into an index (which will be controlled by the loop numbers)
                // Get info from the api as to how many episodes it had
                // Since the seasons info is stored in an array of objects in key-value pairs we need to access using dot notation or bracket notation. 
                const numberOfEpisodesPerSeason = arrayOfEpisodes.length; 
                const episodeRange = Array.from(Array(arrayOfEpisodes).keys());
                console.log(episodeRange);
                console.log(arrayOfSeasons.map(x => console.log(x.episode_count))); // 10 (for 4 times)
                const episodeNumberArray = Array.from(Array(numberOfEpisodesPerSeason).keys()); //Create an array containing a range of numbers [0,1,2,3,4,5]
                console.log(episodeNumberArray);    
                console.log(typeof episodeNumberArray);    
                const seasonNumberArray = Array.from(Array(numberOfSeasons).keys()); //Create an array containing a range of numbers [0,1,2,3,4,5]
                console.log(typeof seasonNumberArray);
                
                console.log(seasonNumberArray);
                for (let season = 1; season <= `${numberOfSeasons}`; season++){
                console.log("First loop loaded");
                    for (let episode = 1; episode <= `${theEpisodes}`; episode++){
                        console.log("Second loop entered");
                        const promise = 
                            fetch(`https://api.themoviedb.org/3/tv/${idFromUrl}/season/${season}/episode/${episode}?api_key=${apiKey}&language=en-US`);
                        promise
                            .then((response) => {return response.json();})
                            .then((episodeDetails) => {
                                const episode = episodeDetails;
                                console.log(typeof episode);
                                const createStrip = `
                                    <div>
                                        <h2>Season ${episode.season_number}</h2>
                                        <ul>
                                            <li>Episode ${episode.episode_number}</li>
                                            <li>Episode Name ${episode.name}</li>
                                            <li>Description ${episode.overview}</li>
                                            <li>Vote Average${episode.vote_average}</li>
                                        </ul>
                                    </div>
                                `;
                                console.log('Second loop finished loading');
                                if (episode === "undefined") {
                                    delete episode;
                                } else {
                                    main.insertAdjacentHTML('afterbegin', createStrip);
                                }
                                const createdStrip = document.querySelector('main');
                                createdStrip.classList.add('results');
                                const liDiv = document.querySelector('main div ul');
                                liDiv.classList.add('card');
                            });
                        }
                    }
                })
            };
window.addEventListener('load', function(){
    redirectToShowDetails();
});
