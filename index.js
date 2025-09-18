const dotenv = require('dotenv');
dotenv.config();

const express  = require('express');
const mongoose = require('mongoose');

const session = require('express-session');

const morgan = require('morgan');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const helmet = require('helmet');

const rareLimit = require('express-rate-limit');

const cors = require('cors');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const categoryRoutes = require('./routes/category');
const incomeRoutes = require('./routes/income');
const budgetRoutes = require('./routes/budget');
const reportRoutes = require('./routes/reports');



const loginLimiter = rareLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, try again later." }
});

const User = require('./models/user');

const app = express()
const PORT = process.env.PORT || 3000;

const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24
  }
};

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description: "API documentation for Expense Tracker project",
    },
    servers: [
      {
        url: "http://localhost:3000", 
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));



app.use(express.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());

app.use(morgan('dev'));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/expenseTracker';

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(dbUrl);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, "Connection error"));
  db.once('open', () => {
    console.log('Database connected');
  });
}

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? ["https://your-frontend.com"] : ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));

app.use('/', authRoutes);
app.use('/expense', expenseRoutes);
app.use('/category', categoryRoutes);
app.use('/income', incomeRoutes);
app.use('/budget', budgetRoutes);
app.use('/reports', reportRoutes);

app.use('/login', loginLimiter);

app.get('/', (req, res)=>{
  res.status(200).json({msg : 'The Homepage'})
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).json({ error: message });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
}

module.exports = app;
