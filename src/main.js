
// Function to handle click event on Movie Folio link
document.getElementById('movieFolioLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    showYearSearchContainer(); // Show year search container
});

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
                document.getElementById('movieTitle').innerText = title;
                document.getElementById('movieYear').innerText = `Year: ${year}`;
                document.getElementById('movieGenre').innerText = `Genre: ${genre}`;
                document.getElementById('moviePlot').innerText = `Plot: ${plot}`;

                // Display the movie poster
                if (poster !== "N/A") {
                    document.getElementById('moviePoster').src = poster;
                    document.getElementById('moviePoster').style.display = "block";
                } else {
                    // If poster is not available, hide the poster element
                    document.getElementById('moviePoster').style.display = "none";
                }

                // Create and append the "Save to Watchlist" button
                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save to Watchlist';
                saveButton.classList.add('btn', 'btn-primary', 'mt-3');
                saveButton.addEventListener('click', function() {
                    // Call saveToWatchlist function to save the movie to the watchlist
                    saveToWatchlist(data);
                });
                document.getElementById('movieInfo').appendChild(saveButton);
            } else {
                // If movie is not found, display an error message
                document.getElementById('error').innerText = data.Error;
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            // Handle error
        });
}

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
                    <p style="color: antiquewhite;" id="movieYear">Year: ${year}</p>
                    <p style="color: antiquewhite;" id="movieGenre">Genre: ${genre}</p>
                    <p style="color: antiquewhite;" id="moviePlot">Plot: ${plot}</p><br>
                    <button onclick="saveToWatchlist(${title})">Save to Watchlist</button>
                `;
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

// Function to handle saving a movie to the watchlist and redirect to CRUD page
function saveToWatchlist(movieData) {
    // Save movie data to local storage
    localStorage.setItem('selectedMovie', JSON.stringify(movieData));

    // Navigate to CRUD page
    window.location.href = 'stw.html';
}

function SaveToWatchlist(data) {
    navigateToCRUDPage();
}

function navigateToCRUDPage() {
    window.location.href = 'stw.html'; 
}

function displayMovieButton() {
    const addtowatchlist = document.getElementById("addtowatchlist");
    addtowatchlist.style.display = "block";
}

