// RECAP
// First thing whenever we want to interact with an element in the DOM
// is to select the element
const btn = document.querySelector('#click-me');

// After doing it we can add 'microphone' to it and
// do some manipulation or run some code based on
// the event fire by the element

btn.addEventListener('click', (event) => {
  event.currentTarget.innerText = 'Hold still...';
  event.currentTarget.setAttribute('disabled', '');
  // event.currentTarget.disabled = true;
});

// ====================================================

// AJAX REQUEST USING FETCH

// fetch is just a Javascript function that allow us to do HTTP request using Javascript
// By default, fetch will always do a GET request to the url provided

// SINTAX -> HOW DOES IT WORK
// fetch(url)                            -> this is where Javascript does the request!
//   .then(response => response.json())  -> this is where we PARSE the response to a Javascript Object and send it to the next 'then' function
//   .then((data) => {                   -> parsed response is assigned to 'data'
//     console.log(data)                 -> we print 'data' to understand what is the server response
// })                                    -> end of fetch function ;)

// ======================================================

// AJAX GET REQUEST

const list = document.querySelector('#movies');

const searchMovies = (input) => {
  // WHEN DOING GET REQUEST THE FETCH FUNCTION HAS ONLY ONE ARGUMENT
  // THE URL WE WILL MAKE THE REQUEST
  fetch(`http://www.omdbapi.com/?apikey=adf1f2d7&s=${input}`)
    .then(response => response.json())
    .then((data) => {
      // console.log(data.Search);
      data.Search.forEach((movie) => {
        const listItem = `<li class='list-inline-item'>
        <img src="${movie.Poster}" alt="poster">
        <p>${movie.Title}</p>
      </li>`;
        list.insertAdjacentHTML('beforeend', listItem);
      });
    });
};

// When the user submits a form the event fired is the SUBMIT
// and it HAPPENS IN THE FORM TAG, not on the button :)
// By default a form submmision will refresh the page and
// when using AJAX we DON'T WANT that to happen.

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('search-input');
  const userInput = input.value;
  searchMovies(userInput);
});

// ===================================================

// POST REQUEST
const signUp = (event) => {
  event.preventDefault();
  const emailValue = document.getElementById('email').value;
  const passwordValue = document.getElementById('password').value;

  fetch('https://reqres.in/api/register', {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify({ "email": emailValue, "password": passwordValue })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
};

const form = document.getElementById('form');
form.addEventListener('submit', signUp);
