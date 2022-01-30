import React from 'react';
import axios from 'axios';
import apiClient from '../services/api';

const Mybooks = () => {
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:8000/api/book')
        .then(response => {
            setBooks(response.data)
        })
        .catch(error => console.error(error));
    }, []);
    const bookList = books.map(
        (bok) =>
          <li key={bok.id}>{bok.title}</li> 
        );
  return  <ul>
  {bookList}
  </ul>;
};

export default Mybooks;
