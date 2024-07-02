import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';

import { Results, Movies } from './types';
import { getMovies, searchMovie } from './lib/getMovies';
import { generateHTML } from './lib/generateHTML';

// TODO render your app here

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

const bannerContainer: HTMLElement | null = document.getElementById('random-movie');
const bannerTitle: HTMLElement | null = document.getElementById('random-movie-name');
const bannerDescription: HTMLElement | null = document.getElementById('random-movie-description');

if (bannerContainer && bannerTitle && bannerDescription) {
    bannerTitle.innerText = popular[1].title;
    bannerDescription.innerText = popular[1].overview;
    bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${popular[1].backdrop_path})`;
    bannerContainer.style.backgroundPosition = 'center';
    bannerContainer.style.backgroundSize = 'cover';
}

const popularButton: HTMLElement | null = document.getElementById('popular');
const upcomingButton: HTMLElement | null = document.getElementById('upcoming');
const topRatedButton: HTMLElement | null = document.getElementById('top_rated');

let currentPage = 1;
const loadButton: HTMLElement | null = document.getElementById('load-more');

if (loadButton) {
    loadButton.addEventListener('click', async () => {
        if (currentPage === 1) {
            popularPage += 1;

            const loadedPopular: Results[] = await getMovies(popularPage, 0);
            let addedHTML = generateHTML(loadedPopular);
            addedHTML = containerContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }
        }
        if (currentPage === 2) {
            upcomingPage += 1;

            const loadedUpcoming: Results[] = await getMovies(upcomingPage, 1);
            let addedHTML = generateHTML(loadedUpcoming);
            addedHTML = containerContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }
        }
        if (currentPage === 3) {
            topRatedPage += 1;

            const loadedTopRated: Results[] = await getMovies(topRatedPage, 2);
            let addedHTML = generateHTML(loadedTopRated);
            addedHTML = containerContent + addedHTML;
            if (container) {
                container.innerHTML = addedHTML;
            }
        }
        if (currentPage === 4) {
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

if (popularButton && container && loadButton) {
    popularButton.onclick = async () => {
        containerContent = generateHTML(popular);
        container.innerHTML = containerContent;

        currentPage = 1;
        loadButton.style.display = 'block';

        const clickableElements: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill');

        clickableElements.forEach((element: HTMLElement) => {
            element.addEventListener('click', handleClick);
        });
    };
}

if (upcomingButton && container && loadButton) {
    upcomingButton.onclick = async () => {
        containerContent = generateHTML(upcoming);
        container.innerHTML = containerContent;

        currentPage = 2;
        loadButton.style.display = 'block';

        const clickableElements: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill');

        clickableElements.forEach((element: HTMLElement) => {
            element.addEventListener('click', handleClick);
        });
    };
}

if (topRatedButton && container && loadButton) {
    topRatedButton.onclick = async () => {
        containerContent = generateHTML(topRated);
        container.innerHTML = containerContent;

        currentPage = 3;
        loadButton.style.display = 'block';

        const clickableElements: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill');

        clickableElements.forEach((element: HTMLElement) => {
            element.addEventListener('click', handleClick);
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

        const clickableElements: NodeListOf<HTMLElement> = document.querySelectorAll('.bi-heart-fill');

        clickableElements.forEach((element: HTMLElement) => {
            element.addEventListener('click', handleClick);
        });
    } else {
        container.innerHTML = searchContent;
        loadButton.style.display = 'none';
    }
}

function handleClick(event: MouseEvent): void {
    let target = event.target as HTMLElement;

    // Traverse up the DOM to find the parent with the class 'bi-heart-fill'
    while (target && !target.classList.contains('bi-heart-fill')) {
        target = target.parentElement as HTMLElement;
    }

    if (target) {
        if (target.getAttribute('fill') === 'red') {
            target.setAttribute('fill', '#ff000078');
        } else {
            target.setAttribute('fill', 'red');
        }

        const elementId = target.id;
        console.log('Clicked element ID:', elementId);
    }
}
