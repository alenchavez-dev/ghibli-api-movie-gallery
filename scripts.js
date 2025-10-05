/*
  ============================================
  Ghibli API Movie Gallery - JavaScript Logic
  Author: Alen Chavez
  Description: Fetches film data from the Studio Ghibli API and dynamically builds movie cards.
  ============================================
*/

const app = document.getElementById('root');

// Add logo image at the top
const logo = document.createElement('img');
logo.src = 'logo.png';

// Create container to hold all movie cards
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

// Make API request to fetch film data
var request = new XMLHttpRequest();
request.open('GET', 'https://mysql.cloud.wpcarey.asu.edu/ghibliapi/films', true);

request.onload = function () {
  var data = JSON.parse(this.response);

  // Check if request was successful
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      // Create card element
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // Movie title
      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      // Movie description (trimmed to 300 characters)
      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      // Add elements to the container
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    // Handle errors
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

request.send();
