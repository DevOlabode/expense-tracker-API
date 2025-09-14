# Expense Tracker API

## Description
Expense Tracker API is a backend service that allows users to manage their personal finances by tracking expenses, income, budgets, and generating financial reports. It features user authentication and authorization, enabling secure access to personal financial data.

## Features
- User registration, login, logout, and profile management
- CRUD operations for expenses, income, categories, and budgets
- Generate weekly and monthly financial reports
- Authentication using Passport.js with local strategy
- Input validation and error handling
- Session management with express-session

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- Passport.js for authentication
- Joi for input validation
- dotenv for environment variable management

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   DB_URL=mongodb://localhost:27017/expenseTracker
   SECRET=your_session_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage

The API server will start on the port specified in the `.env` file (default is 3000). Use an API client like Postman or curl to interact with the endpoints.

## API Endpoints Overview

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /profile` - Get logged-in user profile
- `DELETE /delete` - Delete logged-in user account

### Expenses
- `POST /expense` - Create a new expense
- `GET /expense` - Get all expenses for logged-in user
- `GET /expense/:id` - Get a specific expense by ID
- `PUT /expense/:id` - Update an expense by ID
- `DELETE /expense/:id` - Delete an expense by ID

### Income
- `POST /income` - Create a new income record
- `GET /income` - Get all income records for logged-in user
- `GET /income/:id` - Get a specific income record by ID
- `PUT /income/:id` - Update an income record by ID
- `DELETE /income/:id` - Delete an income record by ID

### Categories
- `POST /category` - Create a new category
- `GET /category` - Get all categories for logged-in user
- `GET /category/:id` - Get a specific category by ID
- `PUT /category/:id` - Update a category by ID
- `DELETE /category/:id` - Delete a category by ID

### Budgets
- `POST /budget` - Create a new budget
- `GET /budget` - Get all budgets for logged-in user
- `GET /budget/:id` - Get a specific budget by ID
- `PUT /budget/:id` - Update a budget by ID
- `DELETE /budget/:id` - Delete a budget by ID

### Reports
- `GET /reports/weekly?start=YYYY-MM-DD&end=YYYY-MM-DD` - Get weekly report for date range
- `GET /reports/monthly?month=MM&year=YYYY` - Get monthly report for specified month and year

## Environment Variables
- `PORT` - Port number for the server (default: 3000)
- `DB_URL` - MongoDB connection string
- `SECRET` - Session secret for express-session

## License
This project is licensed under the ISC License.

## Author
[Your Name]
