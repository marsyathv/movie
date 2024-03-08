function searchByYear() {
    var searchYear = document.getElementById('movieyear').value;
    var searchData = document.getElementById('movietitle').value;

    fetch(`https://www.omdbapi.com/?t=${searchData}&y=${searchYear}&apikey=c1aecf62&`)
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
                    <h2 id="movieTitle">${title}</h2>
                    <img id="moviePoster" src="${poster}" alt="Movie Poster" style="display: block; margin: 0 auto;"><br><br>
                    <p id="movieYear">Year: ${year}</p>
                    <p id="movieGenre">Genre: ${genre}</p>
                    <p id="moviePlot">Plot: ${plot}</p><br>`
            } else {
                // If movie is not found, display an error message
                document.getElementById('movieInfo').innerHTML = `<p id="error" style="color: red;">${data.Error}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            // Handle error
        });
}

function saveToWatchlist(data) {
    // Save movie data to local storage
    localStorage.setItem('selectedMovie', JSON.stringify(data));

    // Navigate to CRUD page
    window.location.href = 'stw.html';
}

function navigateToCRUDPage() {
    window.location.href = 'stw.html';
}
