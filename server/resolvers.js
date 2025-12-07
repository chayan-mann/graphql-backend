import { users, authors, books, reviews, generateId } from './data';

const resolvers = {
  Query: {
    me: () => users[0] || null,
    books: (parent, args) => {
      let result = books;
      if (args.search) {
        const term = args.search.toLowerCase();
        result = result.filter(
          (b) =>
            b.title.toLowerCase().includes(term) ||
            (b.description && b.description.toLowerCase().includes(term))
        );
      }
      if (args.tag) {
        const tag = args.tag.toLowerCase();
        result = result.filter((b) =>
          b.tags.some((t) => t.toLowerCase() === tag)
        );
      }
      return result;
    },
    book: (parent, { id }) => books.find((b) => b.id === id) || null,
    authors: () => authors,
    author: (parent, { id }) => authors.find((a) => a.id === id) || null,
    reviewsByBook: (parent, { bookId }) =>
      reviews.filter((r) => r.bookId === bookId)
  },

  Mutation: {
    addAuthor: (parent, { name, bio }) => {
      const newAuthor = { id: generateId('a'), name, bio: bio || '' };
      authors.push(newAuthor);
      return newAuthor;
    },
    addBook: (parent, { input }) => {
      const newBook = {
        id: generateId('b'),
        title: input.title,
        description: input.description || '',
        authorId: input.authorId,
        tags: input.tags || []
      };
      books.push(newBook);
      return newBook;
    },
    addToReadingList: (parent, { bookId, status }) => {
      const currentUser = users[0];
      const existing = currentUser.readingList.find(
        (i) => i.bookId === bookId
      );
      if (existing) {
        existing.status = status;
      } else {
        currentUser.readingList.push({ bookId, status });
      }
      return currentUser;
    },
    updateReadingStatus: (parent, { bookId, status }) => {
      const currentUser = users[0];
      const existing = currentUser.readingList.find(
        (i) => i.bookId === bookId
      );
      if (!existing) throw new Error('Book not in reading list');
      existing.status = status;
      return currentUser;
    },
    addReview: (parent, { input }) => {
      const newReview = {
        id: generateId('r'),
        userId: users[0].id,
        bookId: input.bookId,
        rating: input.rating,
        comment: input.comment
      };
      reviews.push(newReview);
      return newReview;
    }
  },

  User: {
    readingList: (user) => user.readingList
  },

  ReadingListItem: {
    book: (item) => books.find((b) => b.id === item.bookId)
  },

  Author: {
    books: (author) => books.filter((b) => b.authorId === author.id)
  },

  Book: {
    author: (book) => authors.find((a) => a.id === book.authorId),
    reviews: (book) => reviews.filter((r) => r.bookId === book.id),
    averageRating: (book) => {
      const r = reviews.filter((it) => it.bookId === book.id);
      if (!r.length) return null;
      return r.reduce((acc, x) => acc + x.rating, 0) / r.length;
    }
  },

  Review: {
    user: (review) => users.find((u) => u.id === review.userId),
    book: (review) => books.find((b) => b.id === review.bookId)
  }
};

export default resolvers;
