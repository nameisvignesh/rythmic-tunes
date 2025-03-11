import React, { useState, useEffect, useMemo } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './sidebar.css';

function Songs() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/items')
      .then(response => setItems(response.data))
      .catch(error => setError('Failed to fetch items.'));
    axios.get('http://localhost:3000/favorities')
      .then(response => setWishlist(response.data))
      .catch(error => setError('Failed to fetch wishlist.'));
    axios.get('http://localhost:3000/playlist')
      .then(response => setPlaylist(response.data))
      .catch(error => setError('Failed to fetch playlist.'));
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const lowerCaseQuery = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.singer.toLowerCase().includes(lowerCaseQuery) ||
        item.genre.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [items, searchTerm]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="songs-container">
      <h2 className="text-3xl font-semibold mb-4 text-center">Songs List</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text id="search-icon"><FaSearch /></InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search by singer, genre, or song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <div className="row">
        {filteredItems.map(item => (
          <div key={item.id} className="col">
            {/* ... Render item content */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Songs;
