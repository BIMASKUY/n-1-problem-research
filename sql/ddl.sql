-- DDL: Create the tables with one-to-many relationships

-- Authors table (parent)
CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table (child of authors, parent of reviews)
CREATE TABLE books (
    book_id INT PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    published_year INT,
    genre VARCHAR(50),
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

-- Reviews table (child of books, parent of comments)
CREATE TABLE reviews (
    review_id INT PRIMARY KEY,
    book_id INT NOT NULL,
    reviewer_name VARCHAR(100),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Comments table (child of reviews)
CREATE TABLE comments (
    comment_id INT PRIMARY KEY,
    review_id INT NOT NULL,
    commenter_name VARCHAR(100),
    comment_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);