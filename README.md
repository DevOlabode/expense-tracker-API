# Expense Tracker API

## Description
Expense Tracker API is a backend service for managing personal finances, including tracking expenses, income, budgets, and generating reports. It includes user authentication to ensure secure access to financial data.

## Features
- User registration, login, logout, and profile management
- CRUD operations for expenses, income, categories, and budgets
- Generate weekly and monthly financial reports
- Authentication using Passport.js with local strategy
- Input validation and error handling
- Session management with express-session
- Password reset functionality via email
- Rate limiting and security headers

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- Passport.js for authentication
- Joi for input validation
- Nodemailer for email services
- Helmet for security headers
- Express Rate Limit for API rate limiting
- Morgan for logging
- dotenv for environment variable management

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DevOlabode/expense-tracker-API
   cd expense-tracker-API
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
   NODE_ENV=development
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. Ensure MongoDB is running locally or update `DB_URL` for your MongoDB instance.

5. Start the server:
   ```bash
   npm run dev  # For development with nodemon
   # or
   node index.js  # For production
   ```

## Scripts
- `npm run dev`: Start the server in development mode with nodemon (auto-restart on changes)
- `npm test`: Run tests (currently no tests implemented)
- `node index.js`: Start the server in production mode

## Usage

The API server will start on the port specified in the `.env` file (default is 3000). Use an API client like Postman, Insomnia, or curl to interact with the endpoints.

### Authentication Flow
1. Register a new user with `POST /register`
2. Login with `POST /login` to receive session cookies
3. Include cookies in subsequent requests for authenticated endpoints
4. Logout with `POST /logout`

## API Endpoints Overview

### Authentication
- `POST /register` - Register a new user
  - **Request Body:**
    ```json
    {
      "username": "johndoe",
      "email": "john@example.com",
      "password": "StrongPass123"
    }
    ```
  - **Response:** `201 Created`
    ```json
    {
      "msg": "User registered successfully"
    }
    ```

- `POST /login` - Login user
  - **Request Body:**
    ```json
    {
      "username": "johndoe",
      "password": "StrongPass123"
    }
    ```
  - **Response:** `200 OK`
    ```json
    {
      "msg": "Logged in successfully"
    }
    ```

- `POST /logout` - Logout user
  - **Response:** `201 Created`
    ```json
    {
      "msg": "Logged out successfully"
    }
    ```

- `GET /profile` - Get logged-in user profile
  - **Response:** `200 OK`
    ```json
    {
      "username": "johndoe",
      "email": "john@example.com",
      "_id": "..."
    }
    ```

- `DELETE /delete` - Delete logged-in user account
  - **Response:** `200 OK`
    ```json
    {
      "msg": "Account Deleted Successfully"
    }
    ```

- `POST /forgot-password` - Request password reset
- `POST /verify-reset-code` - Verify reset code
- `POST /new-password` - Set new password
- `POST /reset-password` - Change password (authenticated)

### Expenses
- `POST /expense` - Create a new expense
  - **Request Body:**
    ```json
    {
      "name": "Groceries",
      "amount": 50.00,
      "category": "60f1b2b3c4d5e6f7g8h9i0j1",
      "description": "Weekly groceries",
      "paymentMethod": "Card",
      "recurring": false
    }
    ```
  - **Response:** `201 Created` (expense object)

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
- `GET /reports/weekly?start=2023-01-01&end=2023-01-07` - Get weekly report for date range
- `GET /reports/monthly?month=01&year=2023` - Get monthly report for specified month and year

## Testing

Currently, no automated tests are implemented. To add testing:

1. Install a testing framework like Jest:
   ```bash
   npm install --save-dev jest supertest
   ```

2. Add test scripts to `package.json`:
   ```json
   "scripts": {
     "test": "jest",
     "test:watch": "jest --watch"
   }
   ```

3. Create test files in a `tests/` directory
4. Run tests with `npm test`

## Security

This API implements several security measures:
- **Helmet**: Sets secure HTTP headers
- **Rate Limiting**: Limits login attempts to 5 per 15 minutes
- **Input Validation**: Uses Joi schemas to validate all inputs
- **MongoDB Sanitization**: Prevents NoSQL injection attacks
- **Secure Sessions**: HTTP-only, secure, sameSite cookies
- **CORS**: Configured for specific origins
- **Password Hashing**: Handled by passport-local-mongoose

**Important Security Notes:**
- Always use HTTPS in production
- Store sensitive environment variables securely
- Regularly update dependencies for security patches
- Implement proper logging and monitoring

## Environment Variables
- `PORT` - Port number for the server (default: 3000)
- `DB_URL` - MongoDB connection string
- `SECRET` - Session secret for express-session (use a strong, random string)
- `NODE_ENV` - Environment (development/production)
- `EMAIL_USER` - Email service username for password resets
- `EMAIL_PASS` - Email service password

## Deployment

### Local Development
1. Follow installation steps above
2. Use `npm run dev` for development

### Production Deployment
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance (e.g., MongoDB Atlas)
3. Configure proper CORS origins
4. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "expense-tracker-api"
   ```
5. Set up reverse proxy with Nginx if needed
6. Enable HTTPS with SSL certificate

### Docker Deployment (Optional)
Create a `Dockerfile` and `docker-compose.yml` for containerized deployment.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add Joi validation for new endpoints
- Include proper error handling
- Update this README for any new features
- Test your changes thoroughly

## License
This project is licensed under the ISC License.

## Author
Samuel Olabode

## Support
For questions or issues, please open an issue on the GitHub repository.
