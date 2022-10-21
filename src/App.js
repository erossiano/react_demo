import React, {useEffect, useState} from 'react';
import './App.css';
import Movie from './components/Movie';

const API_KEY = 'b4717d9d6dc5c95dc09a72ee06e90e91';

const FEATURED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=`;

function App() {
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(
   () => {
      getMovies(FEATURED_API);
    }
    ,[]
  );
  

  const getMovies = (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
        getMovies(SEARCH_API + searchTerm);
    };
    setSearchTerm('');
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
            <input className="search"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
        </form>
        
      </header>
      <div className='movie-container'>
        {movies.map( movie => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;



/**
 * DISCOVER
 * https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
 * 
 * TOP RATED
 * https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
 * 
 * 
 * SEARCH MOVIE
 * https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
 * 
 * IMAGES
 * https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
 * 
 * 
 */