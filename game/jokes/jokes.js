// call init function when page is loaded
//window.addEventListener("load", init); 

// define global variables
let jokes;
let nextBtn;
let jokeCountEl;
let jokeEl;
let refreshLifeEl;
let categories = ["Any", "Misc", "Programming", "Dark", "Pun", "Spooky", "Christmas"]
let selectedCategoryIndex = 2;



window.addEventListener("load", init);

// function called initial on page load
function init () { //
	// get jokes from api
	getJokes(categories[selectedCategoryIndex]);
	// get DOM Element references
	let anyBtn = document.getElementById("any-btn");
	anyBtn.addEventListener("click", selectCategory("Any"))

	nextBtn = document.querySelector(".next")
	nextBtn.addEventListener("click", onNextBtnClick)

	jokeCountEl = document.querySelector("#joke-count")
	jokeEl = document.querySelector("#joke")

	refreshLifeEl = document.querySelector("#refreshLife")
	refreshLifeEl.addEventListener("click", refreshLife)
}

function selectCategory(category) {
    var confirmationElement = document.getElementById("confirmationText");
    confirmationElement.innerHTML = "Selected category: " + category;
	getJokes(category);
}

// function to show next joke
function onNextBtnClick () {
	// check if still jokes available
	if (jokes.length > 0) {
		console.log("Next joke...")
		// write joke to DOM
		jokeEl.innerHTML = jokes[0].joke
		// remove joke from que (array)
		jokes.shift()
		// update joke count
		jokeCountEl.innerHTML = 10 - jokes.length
	} else {
		// TODO: Congratulations alert if lives left
		// end game and reset everything
		endGame();
	}
}

// function to get jokes from api
function getJokes(category) {
	// fetch jokes with api parameter in URL
	 fetch(`https://v2.jokeapi.dev/joke/${category}?type=single&amount=10`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// return the response JSON object
			return response.json();
		})
		.then(data => {
			// handle the JSON data
			jokes = data.jokes
			// write first joke to DOM
			jokeEl.innerHTML = jokes[0].joke
			// remove first joke from DOM
			jokes.shift()
			// update jokes count
			jokeCountEl.innerHTML = 10 - jokes.length
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}

// function to reset lives
function refreshLife () {
	// get all heart elements
	let lifeEls = document.querySelectorAll(".icofont-heart")
	// loop over the heart elements
	for (let el of lifeEls) {
		// add the class 'active' to the element (so the heart is red again)
		el.classList.add('active')
	}
}