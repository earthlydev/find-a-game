
document.querySelector('#generate').addEventListener('click', () => {
    getListOfGames().then(games => {
        const extraData = games
        console.log(games.results);
        loadTableData(games.results)
    }).catch(error => {
        console.error(error);
    });
});


function loadTableData(games) {
    const table = document.getElementById("list");
    const tbody = table.getElementsByTagName("tbody")[0];

    for (let i = 0; i < games.length; i++) {
        const row = tbody.insertRow(i);
        // these are td elements being inserted
        const nameCell = row.insertCell(0);
        // this is the second column
        const imageCell = row.insertCell(1);
        const otherCell = row.insertCell(2);

        nameCell.innerHTML = games[i].name;
        otherCell.innerHTML = "more"

        const img = document.createElement("img");
        img.src = games[i].background_image;
        imageCell.appendChild(img);
    }
}















// API Docs: https://api.rawg.io/docs/#operation/games_list
// we have 20,000 requests max per month with the free version of RAWG
// we get a max of 40 results (numOfGames) per request, and there are 870,000 games in the database. So, we will need to add multiple search parameters/ filters to narrow down the results

const API_KEY = "7c16349caadb492fa5baab41614f6865"


//platform Ids   ---  there are a few other platforms as well like ios, android, xboxOne Series S/X
// hardcoding these becuase these IDs shouldn't change, and to save api requests. 
// We could get IDs dynamically like we do the genres by throwing this in async function (const response = await apiCall('platforms'))
const pc = 4;
const ps5 = 187
const ps4 = 18
const xboxOne = 1
const nSwitch = 7

async function apiCall(endpoint, filters) {
    const request = await fetch(`https://api.rawg.io/api/${endpoint}?key=${API_KEY}&${filters}`);
    const response = await request.json();
    return response;
}

// const platformSelected = document.querySelector('________').value

export async function getListOfGames() {
    const genres = await listOfGenres()
    const numOfGames = 10 // max is 40 games returned per request
    const pageNumber = 1 // change this number to see a different page of results
    const response = await apiCall('games', `page_size=${numOfGames}&page=${pageNumber}&platforms=${xboxOne}&genres=${genres['massively-multiplayer']}`)  // platform selected goes here
    // check the console to see what comes back from the API initially. Click the dropdown arrow, then 'results'
    return response
}

async function listOfGenres() {
    const genres = {}
    const response = await apiCall('genres')
    const results = response.results
    // dynamically create key/ value pairs in object of games genres and IDs
    for (const result of results) {
        genres[result.slug] = result.id;
    }
    console.log('genres: ', genres)
    return genres;
}



// once the games we want are returned, pull the ID from the games object and send a seperate request to get the details. 
// This link has the list of the details (responses) about the game we can choose from to show the user https://api.rawg.io/docs/#operation/games_read once we have the gameID from the original request
async function getGameDetails(gameID) {

}



