# Expense Tracker API

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)](https://www.mongodb.com/)

A comprehensive REST API for personal expense tracking with user authentication, budget management, and financial reporting capabilities.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Data Models](#data-models)
- [Authentication](#authentication)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [License](#license)

## Description

Expense Tracker API is a robust backend service built with Node.js and Express.js that enables users to manage their personal finances effectively. The API provides comprehensive expense tracking, income management, budget monitoring, and detailed financial reporting with user authentication and security features.

## Features

### Core Functionality
- ✅ Complete user authentication system (register, login, logout, password reset)
- ✅ Full CRUD operations for expenses, income, categories, and budgets
- ✅ Advanced financial reporting (weekly/monthly with budget comparisons)
- ✅ Category-based expense organization
- ✅ Budget tracking with spending alerts
- ✅ Recurring transaction support

### Security & Performance
- 🔒 Session-based authentication with secure cookies
- 🛡️ Rate limiting and brute-force protection
- ✅ Input validation and sanitization
- 🚀 Optimized database queries with aggregation pipelines
- 📊 Comprehensive logging with Morgan

### Developer Experience
- 📖 Well-documented API with examples
- 🧪 Ready for testing framework integration
- 🐳 Docker support for easy deployment
- 📈 Monitoring and error tracking capabilities

## Technology Stack

### Backend Framework
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Authentication & Security
- **Passport.js** - Authentication middleware
- **passport-local-mongoose** - Password hashing and validation
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **express-mongo-sanitize** - NoSQL injection prevention
- **CORS** - Cross-origin resource sharing

### Validation & Utilities
- **Joi** - Schema validation
- **Nodemailer** - Email services
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management
- **express-session** - Session management

### API Documentation
- **swagger-jsdoc** - API documentation generation
- **swagger-ui-express** - API documentation UI

### Development Tools
- **Nodemon** - Development auto-restart
- **PM2** - Production process manager

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevOlabode/expense-tracker-API.git
   cd expense-tracker-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_URL=mongodb://localhost:27017/expenseTracker
   SECRET=your_super_secret_session_key_here
   NODE_ENV=development
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system or update `DB_URL` for cloud instance.

5. **Run the application**
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:3000
```

### Interactive API Docs
The API includes interactive documentation powered by Swagger UI. Access it at:
```
http://localhost:3000/api-docs
```

### GET /
Get homepage message.

**Response (200):**
```json
{
  "msg": "The Homepage"
}
```

### Response Format
All responses follow this structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

## Authentication Endpoints

### POST /register
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "msg": "User registered successfully"
}
```

**Validation Rules:**
- Username: 3-30 characters, alphanumeric
- Email: Valid email format
- Password: 8-32 characters, must contain uppercase, lowercase, and number

### POST /login
Authenticate user and establish session.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

**Note:** Login uses username, not email.

**Response (200):**
```json
{
  "msg": "Logged in successfully"
}
```

### POST /logout
Destroy user session.

**Response (200):**
```json
{
  "msg": "Logged out successfully"
}
```

### GET /profile
Get current user profile information.

**Response (200):**
```json
{
  "_id": "60f1b2b3c4d5e6f7g8h9i0j1",
  "username": "johndoe",
  "email": "john.doe@example.com"
}
```

### DELETE /delete
Delete logged-in user account.

**Response (200):**
```json
{
  "msg": "Account Deleted Successfully"
}
```

### Password Reset Flow

#### POST /forgot-password
Request password reset code.

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

#### POST /verify-reset-code
Verify the reset code sent to email.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "resetCode": "123456"
}
```

#### POST /new-password
Set new password after code verification.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "newPassword": "NewSecurePass123!"
}
```

### POST /reset-password
Reset password while logged in (requires current password).

**Request Body:**
```json
{
  "currentPassword": "SecurePass123!",
  "newPassword": "NewSecurePass456!",
  "confirmPassword": "NewSecurePass456!"
}
```

**Response (200):**
```json
{
  "message": "Password updated successfully."
}
```

## Expense Management

### POST /expense
Create a new expense entry.

**Request Body:**
```json
{
  "name": "Grocery Shopping",
  "amount": 85.50,
  "category": "60f1b2b3c4d5e6f7g8h9i0j1",
  "description": "Weekly groceries at Whole Foods",
  "paymentMethod": "Card",
  "recurring": false,
  "date": "2023-09-15"
}
```

**Note:** Category is optional.

**Response (200):**
```json
{
  "msg": "Expense Created Successfully",
  "expense": {
    "_id": "60f1b2b3c4d5e6f7g8h9i0j2",
    "name": "Grocery Shopping",
    "amount": 85.5,
    "category": "60f1b2b3c4d5e6f7g8h9i0j1",
    "description": "Weekly groceries at Whole Foods",
    "paymentMethod": "Card",
    "recurring": false,
    "date": "2023-09-15T00:00:00.000Z",
    "user": "60f1b2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2023-09-15T10:30:00.000Z"
  }
}
```

### GET /expense
Retrieve all expenses for the authenticated user.

**Response (200):**
```json
{
  "msg": "All Expenses",
  "expenses": [
    {
      "_id": "60f1b2b3c4d5e6f7g8h9i0j2",
      "name": "Grocery Shopping",
      "amount": 85.5,
      "category": {
        "_id": "60f1b2b3c4d5e6f7g8h9i0j1",
        "name": "Food & Dining"
      },
      "date": "2023-09-15T00:00:00.000Z"
    }
  ]
}
```

### GET /expense/:id
Get a specific expense by ID.

### PUT /expense/:id
Update an expense entry.

### DELETE /expense/:id
Delete an expense entry.

## Income Management

### POST /income
Create a new income entry.

**Request Body:**
```json
{
  "source": "Salary",
  "amount": 3500.00,
  "recurring": true,
  "notes": "Monthly salary payment",
  "date": "2023-09-01"
}
```

### GET /income
Retrieve all income entries.

### GET /income/:id
Get a specific income entry.

### PUT /income/:id
Update an income entry.

### DELETE /income/:id
Delete an income entry.

## Category Management

### POST /category
Create a new expense category.

**Request Body:**
```json
{
  "name": "Transportation",
  "description": "Car, public transport, fuel expenses"
}
```

### GET /category
Retrieve all categories.

### GET /category/:id
Get a specific category.

### PUT /category/:id
Update a category.

### DELETE /category/:id
Delete a category.

## Budget Management

### POST /budget
Create a new budget.

**Request Body:**
```json
{
  "name": "Monthly Food Budget",
  "category": "60f1b2b3c4d5e6f7g8h9i0j1",
  "amount": 600.00,
  "period": "monthly",
  "startDate": "2023-09-01",
  "endDate": "2023-09-30"
}
```

### GET /budget
Retrieve all budgets.

### GET /budget/:id
Get a specific budget.

### PUT /budget/:id
Update a budget.

### DELETE /budget/:id
Delete a budget.

## Financial Reports

### GET /reports/weekly
Generate a comprehensive weekly financial report.

**Query Parameters:**
- `start` (required): Start date (YYYY-MM-DD)
- `end` (required): End date (YYYY-MM-DD)

**Example Request:**
```
GET /reports/weekly?start=2023-09-01&end=2023-09-07
```

**Response (200):**
```json
{
  "week": {
    "start": "2023-09-01",
    "end": "2023-09-07"
  },
  "totalIncome": 3500.00,
  "totalExpenses": 450.75,
  "balance": 3049.25,
  "expensesByCategory": [
    {
      "category": "Food & Dining",
      "total": 150.50
    },
    {
      "category": "Transportation",
      "total": 75.25
    }
  ],
  "budgetComparison": [
    {
      "category": "Food & Dining",
      "budget": 300.00,
      "spent": 150.50,
      "remaining": 149.50,
      "percentageUsed": "50.17"
    }
  ]
}
```

### GET /reports/monthly
Generate a comprehensive monthly financial report.

**Query Parameters:**
- `month` (required): Month number (1-12)
- `year` (required): Year (YYYY)

**Example Request:**
```
GET /reports/monthly?month=9&year=2023
```

**Response (200):**
```json
{
  "month": "9",
  "year": "2023",
  "totalIncome": 3500.00,
  "totalExpenses": 1850.75,
  "balance": 1649.25,
  "expensesByCategory": [
    {
      "category": "Food & Dining",
      "total": 450.50
    },
    {
      "category": "Transportation",
      "total": 275.25
    },
    {
      "category": "Entertainment",
      "total": 125.00
    }
  ],
  "budgetComparison": [
    {
      "category": "Food & Dining",
      "budget": 600.00,
      "spent": 450.50,
      "remaining": 149.50,
      "percentageUsed": "75.08"
    }
  ]
}
```

## Data Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  resetPasswordToken: String,
  resetPasswordExpires: Date
}
```

### Expense Model
```javascript
{
  name: String (required),
  amount: Number (required, positive),
  date: Date (default: now),
  category: ObjectId (ref: 'Category'),
  description: String,
  paymentMethod: String (enum: ['Cash', 'Card', 'Bank Transfer', 'Other']),
  recurring: Boolean (default: false),
  user: ObjectId (ref: 'User', required)
}
```

### Income Model
```javascript
{
  source: String (required),
  amount: Number (required, positive),
  date: Date (default: now),
  recurring: Boolean (default: false),
  notes: String,
  user: ObjectId (ref: 'User', required)
}
```

### Category Model
```javascript
{
  name: String (required),
  description: String,
  user: ObjectId (ref: 'User', required)
}
```

### Budget Model
```javascript
{
  name: String (required),
  category: ObjectId (ref: 'Category'),
  amount: Number (required, positive),
  period: String (enum: ['monthly', 'yearly'], default: 'monthly'),
  startDate: Date (default: now),
  endDate: Date,
  user: ObjectId (ref: 'User', required)
}
```

## Authentication

### How It Works
The API uses session-based authentication with Passport.js:
1. User registers/logs in
2. Server creates a session and sends session cookie
3. Client includes cookie in subsequent requests
4. Server validates session for protected routes

### Session Configuration
- **Secure**: HTTPS only in production
- **HTTP-only**: Prevents XSS attacks
- **SameSite**: Protects against CSRF
- **Max Age**: 24 hours

### Password Requirements
- Minimum 8 characters
- Maximum 32 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number

## Security

### Implemented Security Measures

#### Authentication & Authorization
- **Session-based authentication** with secure cookies
- **Password hashing** using PBKDF2 via passport-local-mongoose
- **Rate limiting** on authentication endpoints (5 attempts per 15 minutes)
- **Session security** with httpOnly, secure, and sameSite flags

#### Data Protection
- **Input validation** using Joi schemas
- **MongoDB injection prevention** with express-mongo-sanitize
- **XSS protection** via Helmet security headers
- **CORS configuration** for allowed origins

#### Network Security
- **HTTPS enforcement** in production
- **Security headers** via Helmet (HSTS, CSP, X-Frame-Options, etc.)
- **Request logging** for monitoring and debugging

### Security Best Practices
- Store sensitive data in environment variables
- Use strong, randomly generated session secrets
- Regularly update dependencies for security patches
- Implement proper error handling to avoid information leakage
- Use HTTPS in production environments

## Testing

### Current Status
Automated tests are implemented using Jest and Supertest for integration testing, with MongoDB Memory Server for database mocking.

### Running Tests

1. **Run all tests**
   ```bash
   npm test
   ```

2. **Run tests in watch mode**
   ```bash
   npm run test:watch
   ```

3. **Run tests with coverage**
   ```bash
   npm run test:coverage
   ```

### Test Structure
```
tests/
├── setup.js          # Test configuration and database setup
├── integration/      # Integration tests for API endpoints
│   └── app.test.js   # Main integration test file
├── unit/             # Unit tests (to be added)
└── fixtures/         # Test data fixtures (to be added)
```

### Example Test File
```javascript
const request = require('supertest');
const app = require('../index');

describe('Authentication', () => {
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'TestPass123!'
      });
    expect(response.status).toBe(201);
  });
});
```

### Testing Strategy
- **Unit Tests**: Test individual functions and utilities
- **Integration Tests**: Test API endpoints and database interactions
- **End-to-End Tests**: Test complete user workflows

## Deployment

### Development Deployment
```bash
npm run dev
```

### Production Deployment

#### Using PM2
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start index.js --name "expense-tracker-api"

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

#### Using Docker
1. **Create Dockerfile**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DB_URL=mongodb://mongo:27017/expenseTracker
       depends_on:
         - mongo
     mongo:
       image: mongo:5.0
       ports:
         - "27017:27017"
       volumes:
         - mongo_data:/data/db
   volumes:
     mongo_data:
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Environment Configuration for Production
- Set `NODE_ENV=production`
- Use production MongoDB instance (MongoDB Atlas recommended)
- Configure proper CORS origins
- Set up SSL/TLS certificates
- Use environment-specific configuration

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests** (when implemented)
5. **Commit your changes**
   ```bash
   git commit -m 'Add: brief description of changes'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Guidelines
- Follow existing code style and naming conventions
- Add Joi validation schemas for new endpoints
- Include proper error handling and logging
- Update documentation for any new features
- Write tests for new functionality
- Use meaningful commit messages

### Commit Message Format
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

## Troubleshooting

### Common Issues

#### Database Connection Issues
**Problem:** `MongoError: failed to connect to server`
**Solution:**
- Ensure MongoDB is running locally
- Check `DB_URL` in `.env` file
- For cloud MongoDB, verify connection string and IP whitelist

#### Authentication Problems
**Problem:** Unable to login after registration
**Solution:**
- Verify password meets requirements (8-32 chars, uppercase, lowercase, number)
- Check that session cookies are being sent with requests
- Ensure `SECRET` is set in environment variables

#### CORS Errors
**Problem:** `Access-Control-Allow-Origin` header missing
**Solution:**
- Check CORS configuration in `index.js`
- Add your frontend URL to allowed origins
- Ensure credentials are included in requests

#### Email Not Sending
**Problem:** Password reset emails not being received
**Solution:**
- Verify `EMAIL_USER` and `EMAIL_PASS` in `.env`
- For Gmail, use App Passwords instead of regular password
- Check spam folder

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=express:*
```

### Performance Issues
- Monitor database query performance
- Check for N+1 query problems in reports
- Consider adding database indexes for frequently queried fields

## FAQ

**Q: Can I use this API with a frontend framework?**
A: Yes! The API is designed to work with any frontend framework. Configure CORS to allow your frontend's domain.

**Q: How do I reset my password?**
A: Use the `/forgot-password` endpoint to receive a reset code via email, then use `/verify-reset-code` and `/new-password` to complete the reset.

**Q: Are transactions supported?**
A: Currently, the API doesn't support database transactions. This is planned for future releases.

**Q: Can I import/export data?**
A: Not currently implemented, but you can use the GET endpoints to retrieve data and process it as needed.

**Q: What's the maximum number of expenses I can store?**
A: No hard limit is set, but performance may degrade with very large datasets. Consider pagination for large result sets.

**Q: Is the API rate limited?**
A: Yes, authentication endpoints are rate limited to 5 attempts per 15 minutes to prevent brute force attacks.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Samuel Olabode**
- GitHub: [@DevOlabode](https://github.com/DevOlabode)
- Email: samuelolabode@example.com

### CORS Configuration
The API is configured with CORS to allow requests from frontend applications. In development, it allows `http://localhost:3000` and `http://localhost:5173`. Update the CORS origins in `index.js` for production deployments.

## Support

For questions, bug reports, or feature requests:

1. Check the [Issues](https://github.com/DevOlabode/expense-tracker-API/issues) page
2. Create a new issue with detailed information
3. Include error messages, steps to reproduce, and your environment details

---

⭐ If you find this project helpful, please give it a star on GitHub!
