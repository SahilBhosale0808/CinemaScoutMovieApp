import {useState, useEffect} from 'react';
import {fetchMovies} from '../services/movieService';
import {Toast} from 'toastify-react-native';
import useDebounce from './useDebounce';

const useMovies = query => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebounce(query, 700); 

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchMovies(debouncedQuery || 'action');
        setMovies(movies);
      } catch (error) {
        Toast.error(error.message);
        setMovies([]); 
      } finally {
        setLoading(false);
      }
    };

    if (debouncedQuery || debouncedQuery === '') {
      loadMovies();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [debouncedQuery]);

  return {movies, loading};
};

export default useMovies;
