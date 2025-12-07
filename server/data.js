// In-memory data for the BookClub app

const users = [
  {
    id: 'u1',
    name: 'Alice',
    email: 'alice@example.com',
    // Each readingList item references a bookId and a status
    readingList: [
      { bookId: 'b1', status: 'WANT_TO_READ' },
      { bookId: 'b2', status: 'READING' }
    ]
  }
];

const authors = [
  {
    id: 'a1',
    name: 'J. R. R. Tolkien',
    bio: 'Author of The Hobbit and The Lord of the Rings.'
  },
  {
    id: 'a2',
    name: 'George Orwell',
    bio: 'Author of 1984 and Animal Farm.'
  }
];

const books = [
  {
    id: 'b1',
    title: 'The Hobbit',
    description: 'A fantasy novel about the journey of Bilbo Baggins.',
    authorId: 'a1',
    tags: ['fantasy', 'classic']
  },
  {
    id: 'b2',
    title: 'The Lord of the Rings',
    description: 'An epic high-fantasy novel.',
    authorId: 'a1',
    tags: ['fantasy', 'epic']
  },
  {
    id: 'b3',
    title: '1984',
    description: 'A dystopian social science fiction novel.',
    authorId: 'a2',
    tags: ['dystopian', 'classic']
  }
];

const reviews = [
  {
    id: 'r1',
    bookId: 'b1',
    userId: 'u1',
    rating: 5,
    comment: 'Amazing adventure, loved it!'
  },
  {
    id: 'r2',
    bookId: 'b3',
    userId: 'u1',
    rating: 4,
    comment: 'Very thought-provoking.'
  }
];

// Simple ID generator
function generateId(prefix = '') {
  return prefix + '_' + Math.random().toString(36).slice(2, 10);
}

module.exports = {
  users,
  authors,
  books,
  reviews,
  generateId
};
