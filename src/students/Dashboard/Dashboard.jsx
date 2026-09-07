import React from 'react';
import './Dashboard.css';
import BookCard from './components/BookCard';

const books = [
  { id: 'COMP233', title: 'Computer Networks', description: 'Learn about networking concepts and protocols.' },
  { id: 'COMP234', title: 'Information Security', description: 'Understand the principles of securing information.' },
  { id: 'COMP236', title: 'Computer Organization & Assembly Language', description: 'Dive into computer architecture and assembly programming.' },
  { id: 'MATH111', title: 'Multivariable Calculus', description: 'Explore advanced calculus topics.' },
  { id: 'SENG222', title: 'Software Construction & Development', description: 'Learn software development methodologies.' },
];

const Dashboard = () => {
  const handleCardClick = (bookId) => {
    console.log(`Book ${bookId} clicked`);
    // Navigate to the book details page
  };

  return (
    <div className="dashboard">
      <h1>Registered Courses (Fall 2025)</h1>
      <div className="book-cards">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            description={book.description}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;