import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';

import { Results } from './types';
import { getPopular, getUpcoming, getTopRated } from './lib/getMovies';
import { generateHTML } from './lib/generateHTML';

// TODO render your app here

const popular: Results[] = await getPopular();
const upcoming: Results[] = await getUpcoming();
const topRated: Results[] = await getTopRated();

function getRandomItem(movie: Results[]): Results {
    const randomIndex = Math.floor(Math.random() * movie.length);
    return movie[randomIndex];
}

let banner = getRandomItem(popular);

let containerContent: string = generateHTML(popular);

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

const popularButton: HTMLElement | null = document.getElementById('popular');
if (popularButton && container) {
    popularButton.onclick = async () => {
        containerContent = generateHTML(popular);
        banner = getRandomItem(popular);
        container.innerHTML = containerContent;

        if (bannerContainer) {
            bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${banner.backdrop_path})`;
            bannerContainer.style.backgroundPosition = 'center';
            bannerContainer.style.backgroundSize = 'cover';
        }

        if (bannerTitle && bannerDescription) {
            bannerTitle.innerText = banner.title;
            bannerDescription.innerText = banner.overview;
        }
    };
}

const upcomingButton: HTMLElement | null = document.getElementById('upcoming');
if (upcomingButton && container) {
    upcomingButton.onclick = async () => {
        containerContent = generateHTML(upcoming);
        banner = getRandomItem(upcoming);
        container.innerHTML = containerContent;

        if (bannerContainer) {
            bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${banner.backdrop_path})`;
            bannerContainer.style.backgroundPosition = 'center';
            bannerContainer.style.backgroundSize = 'cover';
        }

        if (bannerTitle && bannerDescription) {
            bannerTitle.innerText = banner.title;
            bannerDescription.innerText = banner.overview;
        }
    };
}

const topRatedButton: HTMLElement | null = document.getElementById('top_rated');
if (topRatedButton && container) {
    topRatedButton.onclick = async () => {
        containerContent = generateHTML(topRated);
        banner = getRandomItem(topRated);
        container.innerHTML = containerContent;

        if (bannerContainer) {
            bannerContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${banner.backdrop_path})`;
            bannerContainer.style.backgroundPosition = 'center';
            bannerContainer.style.backgroundSize = 'cover';
        }

        if (bannerTitle && bannerDescription) {
            bannerTitle.innerText = banner.title;
            bannerDescription.innerText = banner.overview;
        }
    };
}
