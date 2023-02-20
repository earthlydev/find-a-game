// API Docs: https://api.rawg.io/docs/#operation/games_list
// we have 20,000 requests max per month with the free version of RAWG
// we get a max of 40 results (numOfGames) per request, and there are 870,000 games in the database. So, we will need to add multiple search parameters/ filters to narrow down the results

const API_KEY = "7c16349caadb492fa5baab41614f6865"

async function getListOfGames() {
    const numOfGames = 10 // max is 40 games returned per request
    const pageNumber = 2 // change this number to see a different page of results

    const request = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${numOfGames}&page=${pageNumber}`);
    const response = await request.json();

    // check the console to see what comes back from the API initially. Click the dropdown arrow, then 'results'
    console.log(response)
}

// adding button so that api requests are only used on button click and not on page load
document.querySelector('#getDataButton').addEventListener('click', getListOfGames)


// the next step is to filter results with search parameters in the 'getListOfGames' API request
// once the games we want are returned, pull the ID from the games object and send a seperate request to get the details. 
// This link has the list of the details (responses) about the game we can choose from to show the user https://api.rawg.io/docs/#operation/games_read once we have the gameID from the original request
async function getGameDetails(gameID) {

}