import { Movies, Results, MovieByID } from '../types';

const endpoint: string[] = [
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=',
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=',
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=',
];

export async function getMovies(page: number, topic: number): Promise<Results[]> {
    try {
        const response = await fetch(endpoint[topic] + page, {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjAxNzNmNDIyYzFkMWE5M2UxNjJiZmNiYTNhZjFhOSIsIm5iZiI6MTcxOTc5NTAxNS42MjA0MjEsInN1YiI6IjY2ODEwYTUyNWRhOGFkZjYwMmZlYTc4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRRGI7u0ZLYJWKYp3LVhtDkv5ZBkcJ5BynKdCfoyJrA',
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Movies = await response.json();

        return data.results.map(({ backdrop_path, id, overview, poster_path, release_date, title }) => ({
            backdrop_path,
            id,
            overview,
            poster_path,
            release_date,
            title,
        }));
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}
export async function searchMovie(page: number, search: string): Promise<Movies> {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjAxNzNmNDIyYzFkMWE5M2UxNjJiZmNiYTNhZjFhOSIsIm5iZiI6MTcxOTc5NTAxNS42MjA0MjEsInN1YiI6IjY2ODEwYTUyNWRhOGFkZjYwMmZlYTc4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRRGI7u0ZLYJWKYp3LVhtDkv5ZBkcJ5BynKdCfoyJrA',
                    accept: 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Movies = await response.json();

        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export async function getMovieById(movie_id: string): Promise<Results> {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjAxNzNmNDIyYzFkMWE5M2UxNjJiZmNiYTNhZjFhOSIsIm5iZiI6MTcxOTc5NTAxNS42MjA0MjEsInN1YiI6IjY2ODEwYTUyNWRhOGFkZjYwMmZlYTc4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRRGI7u0ZLYJWKYp3LVhtDkv5ZBkcJ5BynKdCfoyJrA',
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: MovieByID = await response.json();
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { backdrop_path, id, overview, poster_path, release_date, title } = data;

        // console.log(data);

        return { backdrop_path, id, overview, poster_path, release_date, title };
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}
