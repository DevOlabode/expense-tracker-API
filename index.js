const dotenv = require('dotenv');
const express  = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const categoryRoutes = require('./routes/category')

const User = require('./models/user');

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

const sessionConfig = {
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}

app.use(express.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/expenseTracker';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error"));
db.once('open', () =>{
    console.log('Database connected');
});

app.use('/', authRoutes);
app.use('/expense', expenseRoutes);
app.use('/category', categoryRoutes);

app.get('/', (req, res)=>{
  res.json({msg : 'The Homepage'})
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, ()=> console.log(`App is listening on PORT ${PORT}`))