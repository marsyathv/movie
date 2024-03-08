function buttonClicked() {
    var searchData = document.getElementById('movietitle').value;

    fetch(`https://www.omdbapi.com/?t=${searchData}&apikey=c1aecf62&`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Check if the movie was found
            if (data.Response == "True") {
                // Extract relevant information from the data object
                const title = data.Title;
                const year = data.Year;
                const genre = data.Genre;
                const plot = data.Plot;
                const poster = data.Poster;

                // Update the UI with the retrieved movie data
                document.getElementById('movieInfo').innerHTML = `
                    <h2>${title}</h2>
                    <p>Year: ${year}</p>
                    <p>Genre: ${genre}</p>
                    <p>Plot: ${plot}</p>
                    <img src="${poster}" alt="${title}" width="200px"><br><br>
                    <button onclick="saveToWatchlist('${title}')" class="save-button">Save to Watchlist</button>`;
            } else {
                // If movie is not found, display an error message
                document.getElementById('movieInfo').innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            // Handle error
        });
}

function saveToWatchlist(title) {
    // Save movie title to local storage
    localStorage.setItem('selectedMovie', title);

    // Navigate to CRUD page
    navigateToCRUDPage();
}

// NAVIGATE TO CRUD.HTML
function navigateToCRUDPage() {
    window.location.href = 'stw.html';
}
