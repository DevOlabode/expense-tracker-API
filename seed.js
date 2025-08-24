const mongoose = require('mongoose');
const User = require('./models/user')

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/auth';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error"));
db.once('open', () =>{
    console.log('Database connected');
});

const fakeUser = [
    {
        username : "DevOlabode",
        email : 'Solabode499@gmail.com',
        password : 'pelumi 56'
    },
    {
        username : "solabode",
        email : 'devOlabode@gmail.com',
        password : 'pelumi 56'
    },
]

const add = async () => {
  for (let u of fakeUser) {
    await User.register(new User({ email: u.email, username: u.username }), u.password);
  }
  console.log("Added fake users");
};


add();


