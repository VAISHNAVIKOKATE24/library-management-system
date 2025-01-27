**Library Management System API
Table of Contents**
**1.	Setup Instructions**
**2.	API Documentation**
o	Books APIs
o	Users APIs
o	Borrowing APIs
**3.	Assumptions and Limitations**
**4.	Third Table Theory (Many-to-Many Relationship)**
   
**Setup Instructions**
**1. Clone the Repository**
Clone the repository to your local machine using the following command:
git clone <repository-link>
cd vk-library-management-system
**2. Initialize the Project**
npm init -y
**3. Install Dependencies**
Ensure you have Node.js installed. Run the following command to install required dependencies:
npm install	
npm install express pg dotenv

**4. Set Up Environment Variables**
Create a .env file in the root directory of the project and add the following variables:
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=library_db
Make sure to replace your_db_user, your_db_password, and library_db with your actual PostgreSQL database credentials.

**5. Run the Application**
Start the server using:
Node server.js
Your server will now be running at http://localhost:5000.
________________________________________
**API Documentation** : All APIs in the Library Management System have been tested using Postman to ensure proper functionality and reliable responses.
**Books APIs**
1. GET /books
•	Description: Retrieve a list of all books.
•	Response:
[
    {
        "id": 1,
        "title": "Soft Skills",
        "author": "Fernandez",
        "published_year": 2020,
        "genre": "study",
        "availability": true
    },
    {
        "id": 2,
        "title": "Let us c",
        "author": "Yashwant Kanitkar",
        "published_year": 2021,
        "genre": "study",
        "availability": true
    },
    {
        "id": 3,
        "title": "Aptitude",
        "author": "R.s.Agarwal",
        "published_year": 2022,
        "genre": "study",
        "availability": true
    }
]
2. GET /books/:id
•	Description: Retrieve details of a specific book by ID.
•	Example: GET /books/1
•	Response:
{
    "id": 1,
    "title": "Soft Skills",
    "author": "Fernandez",
    "published_year": 2020,
    "genre": "study",
    "availability": true
}
3. POST /books
•	Description: Add a new book.
•	Request:
{
  "id": 3,
  "title": "Aptitude",
  "author": "R.s.Agarwal",
  "published_year": 2022,
  "genre": "study"
}
•	Response:
{
    "id": 3,
    "title": "Aptitude",
    "author": "R.s.Agarwal",
    "published_year": 2022,
    "genre": "study",
    "availability": true
}
4. PUT /books/:id
•	Description: Update details of a specific book by ID.
•	Example: PUT /books/1
•	Request:
{
    "id": 1,
    "title": "Soft Skills and employement",
    "author": "Fernandez",
    "published_year": 2020,
    "genre": "study",
    "availability": true
}
•	Response:
{
    "id": 1,
    "title": "Soft Skills and employement",
    "author": "Fernandez",
    "published_year": 2020,
    "genre": "study",
    "availability": true
}
5. DELETE /books/:id
•	Description: Remove a book by ID.
•	Example: DELETE /books/1
•	Response:
{
    "message": "Book deleted successfully"
}

**Users APIs**
1. GET /users
•	Description: Retrieve a list of all users.
•	Response:
[
    {
        "id": 1,
        "name": "Vaishnavi Kokate",
        "email": "vk@gmail.com",
        "membership_start_date": "2016-02-02T18:30:00.000Z"
    },
    {
        "id": 2,
        "name": "yash bhosale",
        "email": "yb@gmail.com",
        "membership_start_date": "2014-04-04T18:30:00.000Z"
    }
]
2. POST /users
•	Description: Add a new user.
•	Request:
{
  "name": "Vaishnavi Kokate",
  "email": "vk@gmail.com",
  "membership_start_date": "2016-02-03"
}
•	Response:
{
    "id": 1,
    "name": "Vaishnavi Kokate",
    "email": "vk@gmail.com",
    "membership_start_date": "2016-02-02T18:30:00.000Z"
}

**Borrowing APIs**
1. POST /borrow
•	Description: Borrow a book.
•	Request:
{
  "user_id": 2,
  "book_id": 6
}
•	Response:
{
    "id": 2,
    "user_id": 2,
    "book_id": 6,
    "borrow_date": "2025-01-27T17:00:15.177Z",
    "return_date": null
}
2. POST /return
•	Description: Return a borrowed book.
•	Request:
{
  "user_id": 2,
  "book_id": 6
}
•	Response:
{
    "id": 2,
    "user_id": 2,
    "book_id": 6,
    "borrow_date": "2025-01-27T17:00:15.177Z",
    "return_date": null
}
**Assumptions and Limitations**
1.	Assumptions:
o	The database schema is already set up and includes the necessary tables for books, users, and borrowings.
o	Email addresses for users are unique in the database.
o	Book availability is managed by a boolean value (TRUE for available, FALSE for borrowed).
o	Borrowing of books is managed by linking user_id and book_id in the borrowings table.
2.	Limitations:
o	This API does not handle user authentication/authorization.
o	Borrowed books cannot be borrowed again until returned.
________________________________________

**Database Table Code**
1. books Table
This table stores information about the books in the library. It includes details like the title, author, published year, genre, and availability status.
sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,                  -- Unique identifier for each book
  title VARCHAR(255) NOT NULL,             -- Title of the book
  author VARCHAR(255) NOT NULL,            -- Author of the book
  published_year INT,                      -- Year the book was published
  genre VARCHAR(100),                      -- Genre or category of the book
  availability BOOLEAN DEFAULT TRUE        -- Whether the book is available for borrowing
);

2. users Table
This table stores information about the users who are borrowing books. It contains details like name, email, and the start date of the membership.
sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,                  -- Unique identifier for each user
  name VARCHAR(255) NOT NULL,              -- Name of the user
  email VARCHAR(255) UNIQUE NOT NULL,      -- Email of the user (unique constraint)
  membership_start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Membership start date
);

3. borrowings Table (Third Table)
This table acts as the third table to represent the many-to-many relationship between the users and books tables. It tracks which books are borrowed by which users, along with the borrowing and return dates.
sql
CREATE TABLE borrowings (
  id SERIAL PRIMARY KEY,                  -- Unique identifier for each borrowing record
  user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key referencing the `users` table (on delete cascade)
  book_id INT REFERENCES books(id) ON DELETE CASCADE,  -- Foreign key referencing the `books` table (on delete cascade)
  borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- The date and time when the book was borrowed
  return_date TIMESTAMP                    -- The date and time when the book is returned (can be null if not returned)
);
________________________________________

**Third Table Theory (Many-to-Many Relationship)**
The borrowings table represents the many-to-many relationship between the users and books tables.
Explanation:
1.	Many-to-Many Relationship:
o	A user can borrow multiple books.
o	A book can be borrowed by multiple users (over time).
o	Therefore, there is a need for a third table (borrowings) to track which books each user has borrowed and when.
2.	Foreign Key Constraints:
o	The user_id column references the users table, establishing a relationship between a borrowed book and the user who borrowed it.
o	The book_id column references the books table, establishing which book is being borrowed.
o	The ON DELETE CASCADE ensures that if a user or a book is deleted, all associated records in the borrowings table are also removed.

