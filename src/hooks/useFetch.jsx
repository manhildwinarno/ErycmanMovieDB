import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchMovies,
  getPopularMovies,
  movieDetail,
} from "../services/api.js";

export const useFetch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      navigate("/explore");
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  const handleModal = async (movie) => {
    try {
      const movieDetailResult = await movieDetail(movie.id);
      setSelectedMovie(movieDetailResult);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => setSelectedMovie(null);
  return {
    searchQuery,
    setSearchQuery,
    movies,
    error,
    loading,
    selectedMovie,
    handleSearch,
    handleModal,
    handleCloseModal,
  };
};
