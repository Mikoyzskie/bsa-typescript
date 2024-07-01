import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';

import { PopularMovies, Result } from './types';
import { getPopular } from './lib/getMovies';

// TODO render your app here

const movies: PopularMovies = await getPopular();

function getRandomItem<PopularMovies>(movie: PopularMovies[]): PopularMovies {
    const randomIndex = Math.floor(Math.random() * movie.length);
    return movie[randomIndex];
}

const banner = getRandomItem(movies.results);

const containerContent: string = movies.results
    .map(
        (movie: Result) => `
<div class="col-lg-3 col-md-4 col-12 p-2">
    <div class="card shadow-sm">
        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="red"
            fill="red"
            width="50"
            height="50"
            class="bi bi-heart-fill position-absolute p-2"
            viewBox="0 -2 18 22"
        >
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
        <div class="card-body">
            <p class="card-text truncate">
                ${movie.overview}
            </p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">${movie.release_date}</small>
            </div>
        </div>
    </div>
</div>

`
    )
    .join('');

const container: HTMLElement | null = document.getElementById('film-container');
if (container) {
    container.innerHTML = containerContent;
}

const bannerContainer: HTMLElement | null = document.getElementById('random-movie');
if (bannerContainer) {
    bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${banner.backdrop_path})`;
    bannerContainer.style.backgroundPosition = 'center';
    bannerContainer.style.backgroundSize = 'cover';
}

const bannerTitle: HTMLElement | null = document.getElementById('random-movie-name');
const bannerDescription: HTMLElement | null = document.getElementById('random-movie-description');

if (bannerTitle && bannerDescription) {
    bannerTitle.innerText = banner.title;
    bannerDescription.innerText = banner.overview;
}
