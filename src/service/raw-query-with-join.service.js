import { query } from "../util/database.util.js"

export class WithJoinService {
  async getAuthorsWithBooks() {
    const { time, data: rows } = await query(`
      SELECT 
        a.author_id, a.name, a.email, a.created_at as author_created_at,
        b.book_id, b.title, b.published_year, b.genre, b.price, b.created_at as book_created_at
      FROM 
        authors a
      LEFT JOIN 
        books b ON a.author_id = b.author_id
      ORDER BY 
        a.author_id, b.book_id
    `);
    
    // Process the flat result into a nested structure
    const authorsMap = new Map();

    rows.forEach(row => {
      if (!authorsMap.has(row.author_id)) {
        authorsMap.set(row.author_id, {
          author_id: row.author_id,
          name: row.name,
          email: row.email,
          created_at: row.author_created_at,
          books: []
        });
      }
      
      if (row.book_id) {
        authorsMap.get(row.author_id).books.push({
          book_id: row.book_id,
          title: row.title,
          published_year: row.published_year,
          genre: row.genre,
          price: row.price,
          created_at: row.book_created_at
        });
      }
    });
    
    // Convert the map to an array
    const authors = Array.from(authorsMap.values());
    
    return {
      time, // Only one query, so this is the total time
      queryCount: 1, // Only one query executed
      data: authors
    };
  }

  async getAuthorsWithBooksAndReviews() {
    // Single query with multiple JOINs
    const { time, data: rows } = await query(`
      SELECT 
        a.author_id, a.name, a.email, a.created_at as author_created_at,
        b.book_id, b.title, b.published_year, b.genre, b.price, b.created_at as book_created_at,
        r.review_id, r.reviewer_name, r.rating, r.review_text, r.created_at as review_created_at
      FROM 
        authors a
      LEFT JOIN 
        books b ON a.author_id = b.author_id
      LEFT JOIN 
        reviews r ON b.book_id = r.book_id
      ORDER BY 
        a.author_id, b.book_id, r.review_id
    `);
    
    // Process the flat result into a nested structure
    const authorsMap = new Map();
    const booksMap = new Map();
    
    rows.forEach(row => {
      // Process author
      if (!authorsMap.has(row.author_id)) {
        authorsMap.set(row.author_id, {
          author_id: row.author_id,
          name: row.name,
          email: row.email,
          created_at: row.author_created_at,
          books: []
        });
      }
      
      // Process book if it exists
      if (row.book_id) {
        // Create a unique key for each book
        const bookKey = `${row.author_id}-${row.book_id}`;
        
        if (!booksMap.has(bookKey)) {
          const book = {
            book_id: row.book_id,
            title: row.title,
            published_year: row.published_year,
            genre: row.genre,
            price: row.price,
            created_at: row.book_created_at,
            reviews: []
          };
          
          booksMap.set(bookKey, book);
          authorsMap.get(row.author_id).books.push(book);
        }
        
        // Process review if it exists
        if (row.review_id) {
          booksMap.get(bookKey).reviews.push({
            review_id: row.review_id,
            reviewer_name: row.reviewer_name,
            rating: row.rating,
            review_text: row.review_text,
            created_at: row.review_created_at
          });
        }
      }
    });
    
    // Convert the map to an array
    const authors = Array.from(authorsMap.values());
    
    return {
      time, // Only one query, so this is the total time
      queryCount: 1,
      data: authors
    };
  }

  async getAuthorsWithBooksReviewsAndComments() {
    // Single query with multiple JOINs including comments
    const { time, data: rows } = await query(`
      SELECT 
        a.author_id, a.name, a.email, a.created_at as author_created_at,
        b.book_id, b.title, b.published_year, b.genre, b.price, b.created_at as book_created_at,
        r.review_id, r.reviewer_name, r.rating, r.review_text, r.created_at as review_created_at,
        c.comment_id, c.commenter_name, c.comment_text, c.created_at as comment_created_at
      FROM 
        authors a
      LEFT JOIN 
        books b ON a.author_id = b.author_id
      LEFT JOIN 
        reviews r ON b.book_id = r.book_id
      LEFT JOIN 
        comments c ON r.review_id = c.review_id
      ORDER BY 
        a.author_id, b.book_id, r.review_id, c.comment_id
    `);
    
    // Process the flat result into a nested structure
    const authorsMap = new Map();
    const booksMap = new Map();
    const reviewsMap = new Map();
    
    rows.forEach(row => {
      // Process author
      if (!authorsMap.has(row.author_id)) {
        authorsMap.set(row.author_id, {
          author_id: row.author_id,
          name: row.name,
          email: row.email,
          created_at: row.author_created_at,
          books: []
        });
      }
      
      // Process book if it exists
      if (row.book_id) {
        // Create a unique key for each book
        const bookKey = `${row.author_id}-${row.book_id}`;
        
        if (!booksMap.has(bookKey)) {
          const book = {
            book_id: row.book_id,
            title: row.title,
            published_year: row.published_year,
            genre: row.genre,
            price: row.price,
            created_at: row.book_created_at,
            reviews: []
          };
          
          booksMap.set(bookKey, book);
          authorsMap.get(row.author_id).books.push(book);
        }
        
        // Process review if it exists
        if (row.review_id) {
          // Create a unique key for each review
          const reviewKey = `${row.book_id}-${row.review_id}`;
          
          if (!reviewsMap.has(reviewKey)) {
            const review = {
              review_id: row.review_id,
              reviewer_name: row.reviewer_name,
              rating: row.rating,
              review_text: row.review_text,
              created_at: row.review_created_at,
              comments: []
            };
            
            reviewsMap.set(reviewKey, review);
            booksMap.get(bookKey).reviews.push(review);
          }
          
          // Process comment if it exists
          if (row.comment_id) {
            reviewsMap.get(reviewKey).comments.push({
              comment_id: row.comment_id,
              commenter_name: row.commenter_name,
              comment_text: row.comment_text,
              created_at: row.comment_created_at
            });
          }
        }
      }
    });
    
    // Convert the map to an array
    const authors = Array.from(authorsMap.values());
    
    return {
      time, // Only one query, so this is the total time
      queryCount: 1,
      data: authors
    };
  }
}