import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';

import { Results, Movies } from './types';
import { getMovies, searchMovie, getMovieById } from './lib/getMovies';
import { generateHTML, generateFavorite } from './lib/generateHTML';

// TODO render your app here

const favorites = localStorage.getItem('favoriteMovies');
let favoritesArray: string[] = [];

if (favorites) {
    favoritesArray = JSON.parse(favorites);
}

let popularPage = 1;
let upcomingPage = 1;
let topRatedPage = 1;
let searchPage = 1;

const popular: Results[] = await getMovies(popularPage, 0);
const upcoming: Results[] = await getMovies(upcomingPage, 1);
const topRated: Results[] = await getMovies(topRatedPage, 2);

let containerContent: string = generateHTML(popular);

const container: HTMLElement | null = document.getElementById('film-container');
if (container) {
    container.innerHTML = containerContent;
}

const favoritesContainer: HTMLElement | null = document.getElementById('favorite-movies');

function getRandomItem(movie: Results[]): Results {
    const randomIndex = Math.floor(Math.random() * movie.length);
    return movie[randomIndex];
}

let banner = getRandomItem(popular);

const bannerContainer: HTMLElement | null = document.getElementById('random-movie');
const bannerTitle: HTMLElement | null = document.getElementById('random-movie-name');
const bannerDescription: HTMLElement | null = document.getElementById('random-movie-description');

if (bannerContainer && bannerTitle && bannerDescription) {
    bannerTitle.innerText = banner.title;
    bannerDescription.innerText = banner.overview;
    bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${banner.backdrop_path})`;
    bannerContainer.style.backgroundPosition = 'center';
    bannerContainer.style.backgroundSize = 'cover';
}

const popularButton: HTMLElement | null = document.getElementById('popular');
const upcomingButton: HTMLElement | null = document.getElementById('upcoming');
const topRatedButton: HTMLElement | null = document.getElementById('top_rated');

let currentPage = 1;
const loadButton: HTMLElement | null = document.getElementById('load-more');

// Function to handle load more button click event
if (loadButton) {
    // Add click event listener to the load more button
    loadButton.addEventListener('click', async () => {
        // Check the current page and load more movies accordingly
        if (currentPage === 1) {
            // Load more popular movies
            popularPage += 1;
            const loadedPopular: Results[] = await getMovies(popularPage, 0);
            let addedHTML = generateHTML(loadedPopular);
            addedHTML = containerContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }
        } else if (currentPage === 2) {
            // Load more upcoming movies
            upcomingPage += 1;
            const loadedUpcoming: Results[] = await getMovies(upcomingPage, 1);

            let addedHTML = generateHTML(loadedUpcoming);
            addedHTML = containerContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }

            // Update the banner with a random movie from the loaded upcoming movies
            banner = getRandomItem(loadedUpcoming);
            // console.log(banner);

            if (bannerContainer && bannerTitle && bannerDescription) {
                bannerTitle.innerText = banner.title;
                bannerDescription.innerText = banner.overview;
                bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${banner.backdrop_path})`;
                bannerContainer.style.backgroundPosition = 'center';
                bannerContainer.style.backgroundSize = 'cover';
            }
        } else if (currentPage === 3) {
            // Load more top rated movies
            topRatedPage += 1;
            const loadedTopRated: Results[] = await getMovies(topRatedPage, 2);

            let addedHTML = generateHTML(loadedTopRated);
            addedHTML = containerContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }
        } else if (currentPage === 4) {
            // Load more search results
            searchPage += 1;
            const loadedTopRated: Results[] = await getMovies(topRatedPage, 2);
            let addedHTML = generateHTML(loadedTopRated);
            addedHTML = containerContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }
        }
    });
}

const clickableElements: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill');

clickableElements.forEach((element: HTMLElement) => {
    element.addEventListener('click', handleClick);
});

/**
 * Add click event listener to the popular button and load popular movies into the container.
 * Update the current page to 1 and display the load button.
 * Add click event listener to the heart icon and bind it to the handleClick function.
 */
if (popularButton && container && loadButton) {
    popularButton.onclick = async () => {
        containerContent = generateHTML(popular);
        container.innerHTML = containerContent;

        currentPage = 1; // Set current page to 1
        loadButton.style.display = 'block'; // Display the load button

        const clickableElement: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill'); // Get all heart icons

        clickableElement.forEach((element: HTMLElement) => {
            element.addEventListener('click', handleClick); // Add click event listener to each heart icon
        });
    };
}

/**
 * Add click event listener to the upcoming button and load upcoming movies into the container.
 * Update the current page to 2 and display the load button.
 * Add click event listener to the heart icon and bind it to the handleClick function.
 */
if (upcomingButton && container && loadButton) {
    upcomingButton.onclick = async () => {
        containerContent = generateHTML(upcoming);
        container.innerHTML = containerContent;

        currentPage = 2; // Set current page to 2
        loadButton.style.display = 'block'; // Display the load button

        const clickableElement: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill'); // Get all heart icons

        clickableElement.forEach((element: HTMLElement) => {
            element.addEventListener('click', handleClick); // Add click event listener to each heart icon
        });
    };
}

/**
 * Add click event listener to the top rated button and load top rated movies into the container.
 * Update the current page to 3 and display the load button.
 * Add click event listener to the heart icon and bind it to the handleClick function.
 */
if (topRatedButton && container && loadButton) {
    topRatedButton.onclick = async () => {
        containerContent = generateHTML(topRated);
        container.innerHTML = containerContent;

        currentPage = 3; // Set current page to 3
        loadButton.style.display = 'block'; // Display the load button

        const clickableElement: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill'); // Get all heart icons

        clickableElement.forEach((element: HTMLElement) => {
            element.addEventListener('click', handleClick); // Add click event listener to each heart icon
        });
    };
}

const currentUrl = window.location.href;
// eslint-disable-next-line no-useless-escape
const searchParamMatch: RegExpMatchArray | null = currentUrl.match(/[\?&]search=([^&]+)/);

let searchContent = 'Nothing here...';

if (container && loadButton && searchParamMatch) {
    if (searchParamMatch.length > 0) {
        const encodedSearchParam = searchParamMatch[1];
        const loadSearch: Movies = await searchMovie(searchPage, encodedSearchParam);
        if (loadSearch.results.length > 0) {
            searchContent = generateHTML(loadSearch.results);
            container.innerHTML = searchContent;
        }

        if (loadSearch.total_pages === 1) {
            loadButton.style.display = 'none';
        } else {
            currentPage = 4;
        }

        loadButton.addEventListener('click', async () => {
            searchPage += 1;

            const loadedPopular: Movies = await searchMovie(searchPage, encodedSearchParam);
            let addedHTML = generateHTML(loadedPopular.results);
            addedHTML = searchContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }
        });
    } else {
        container.innerHTML = searchContent;
        loadButton.style.display = 'none';
    }
}

/**
 * Generates the HTML for the favorite movies and updates the DOM element with the id 'favorite-movies'.
 * If there are no favorite movies, the DOM element will be left empty.
 */

let favoritesContents: string = '';
if (favoritesArray.length > 0) {
    favoritesArray.map(async (favorite: string) => {
        const movie: Results = await getMovieById(favorite);

        const addHTML: string = generateFavorite(movie);
        favoritesContents += addHTML;
        if (favoritesContents && favoritesContainer) {
            favoritesContainer.innerHTML = favoritesContents;
        }
    });
}

if (favoritesContents && favoritesContainer) {
    favoritesContainer.innerHTML = favoritesContents;
}

/**
 * Generates the HTML for all the favorite movies and updates the DOM element with the id 'favorite-movies'.
 * If there are no favorite movies, the DOM element will be left empty.
 */

async function handleClick(event: MouseEvent): Promise<void> {
    let target = event.target as HTMLElement;

    // Traverse up the DOM to find the parent with the class 'bi-heart-fill'
    while (target && !target.classList.contains('bi-heart-fill')) {
        target = target.parentElement as HTMLElement;
    }

    // Handle the click event on a heart icon
    if (target) {
        // If the heart is filled (red), remove it from the favorites list and update local storage
        if (target.getAttribute('fill') === 'red') {
            target.setAttribute('fill', '#ff000078');
            const elementId = target.id;

            if (favoritesContainer && favoritesArray.includes(elementId)) {
                const newArray = favoritesArray.filter((x) => x !== elementId);
                // console.log(newArray);
                favoritesArray = newArray;
                localStorage.setItem('favoriteMovies', JSON.stringify(newArray));

                let favoritesContent: string = '';
                if (favoritesArray.length > 0) {
                    favoritesArray.map(async (favorite: string) => {
                        const movie: Results = await getMovieById(favorite);

                        const addHTML: string = generateFavorite(movie);
                        favoritesContent += addHTML;
                        if (favoritesContent && favoritesContainer) {
                            favoritesContainer.innerHTML = favoritesContent;
                        }
                    });
                } else {
                    favoritesContainer.innerHTML = '';
                }

                favoritesContents = favoritesContent;
            }
        }
        // If the heart is empty (transparent), add it to the favorites list and update local storage
        else {
            target.setAttribute('fill', 'red');
            const elementId = target.id;
            favoritesArray.push(elementId);
            localStorage.setItem('favoriteMovies', JSON.stringify(favoritesArray));

            if (favoritesArray.length > 0 && favoritesContainer) {
                const movie = await getMovieById(elementId);

                const addHTML: string = generateFavorite(movie);
                favoritesContents += addHTML;

                if (favoritesContents && favoritesContainer) {
                    favoritesContainer.innerHTML = favoritesContents;
                }
            }
        }
    }
    // generateFavorites();
    // window.location.reload();
}
