import { PopularMovies } from '../types';

export async function getPopular(): Promise<PopularMovies> {
    try {
        const response = await fetch(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
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

        const data: PopularMovies = await response.json();

        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}