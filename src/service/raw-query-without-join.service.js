import { query } from "../util/database.util.js"

export class WithoutJoinService {
  async getAuthorsWithBooks() {
    let totalQueryTime = 0;
    
    // First query: Get all authors
    const { time: authorsTime, data: authors } = await query('SELECT * FROM authors');
    totalQueryTime += authorsTime;
    
    // For each author, make a separate query to get their books (N queries)
    for (let i = 0; i < authors.length; i++) {
      const { time: bookTime, data: books } = await query('SELECT * FROM books WHERE author_id = $1', [authors[i].author_id]);
      books.forEach(book => delete book.author_id);

      totalQueryTime += bookTime;
      authors[i].books = books;
    }
    
    return {
      time: totalQueryTime, // Total time for all queries
      queryCount: authors.length + 1, // Total number of queries executed
      data: authors
    };
  }

  async getAuthorsWithBooksAndReviews() {
    let totalQueryTime = 0;
    
    // First query: Get all authors
    const { time: authorsTime, data: authors } = await query('SELECT * FROM authors');
    totalQueryTime += authorsTime;
    
    // For each author, get their books (N queries)
    for (let i = 0; i < authors.length; i++) {
      const { time: booksTime, data: books } = await query('SELECT * FROM books WHERE author_id = $1', [authors[i].author_id]);
      books.forEach(book => delete book.author_id);

      totalQueryTime += booksTime;
      authors[i].books = books;
      
      // For each book, get its reviews (M queries per author)
      for (let j = 0; j < books.length; j++) {
        const { time: reviewsTime, data: reviews } = await query('SELECT * FROM reviews WHERE book_id = $1', [books[j].book_id]);
        reviews.forEach(review => delete review.book_id);

        totalQueryTime += reviewsTime;
        books[j].reviews = reviews;
      }
    }
    
    return {
      time: totalQueryTime, // Total time for all queries (1 + N + N*M)
      queryCount: 1 + authors.length + authors.reduce((sum, author) => sum + (author.books?.length || 0), 0),
      data: authors
    };
  }

  async getAuthorsWithBooksReviewsAndComments() {
    let totalQueryTime = 0;
    let queryCount = 0;
    
    // First query: Get all authors
    const { time: authorsTime, data: authors } = await query('SELECT * FROM authors');
    totalQueryTime += authorsTime;
    queryCount++;
    
    // For each author, get their books (N queries)
    for (let i = 0; i < authors.length; i++) {
      const { time: booksTime, data: books } = await query('SELECT * FROM books WHERE author_id = $1', [authors[i].author_id]);
      books.forEach(book => delete book.author_id);

      totalQueryTime += booksTime;
      queryCount++;
      authors[i].books = books;
      
      // For each book, get its reviews (M queries per author)
      for (let j = 0; j < books.length; j++) {
        const { time: reviewsTime, data: reviews } = await query('SELECT * FROM reviews WHERE book_id = $1', [books[j].book_id]);
        reviews.forEach(review => delete review.book_id);

        totalQueryTime += reviewsTime;
        queryCount++;
        books[j].reviews = reviews;
        
        // For each review, get its comments (P queries per book)
        for (let k = 0; k < reviews.length; k++) {
          const { time: commentsTime, data: comments } = await query('SELECT * FROM comments WHERE review_id = $1', [reviews[k].review_id]);
          comments.forEach(comment => delete comment.review_id);
          
          totalQueryTime += commentsTime;
          queryCount++;
          reviews[k].comments = comments;
        }
      }
    }
    
    return {
      time: totalQueryTime, // Total time for all queries (1 + N + N*M + N*M*P)
      queryCount, // Total number of queries (1 + N + N*M + N*M*P)
      data: authors
    };
  }
}