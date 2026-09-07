import React from 'react';
import './BookCard.css';

const BookCard = ({ id, title, description, onClick }) => {
  return (
    <div className="book-card" onClick={() => onClick(id)}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default BookCard;