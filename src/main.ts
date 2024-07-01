import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';

import { Movies } from './types';
import { getPopular, getUpcoming } from './lib/getMovies';
import { generateHTML } from './lib/generateHTML';
// TODO render your app here

const popular: Movies = await getPopular();
const upcoming: Movies = await getUpcoming();

function getRandomItem<Movies>(movie: Movies[]): Movies {
    const randomIndex = Math.floor(Math.random() * movie.length);
    return movie[randomIndex];
}

let banner = getRandomItem(popular.results);

let containerContent: string = generateHTML(popular.results);

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

const upcomingButton: HTMLElement | null = document.getElementById('upcoming');
if (upcomingButton && container) {
    upcomingButton.onclick = async () => {
        containerContent = generateHTML(upcoming.results);
        banner = getRandomItem(upcoming.results);
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
