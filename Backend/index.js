const express = require('express');
const app = express();
const cors = require('cors');
const userrouter = require('./routers/userrouter');
const postrouter = require('./routers/postrouter');
const categoryrouter = require('./routers/categoryrouter');
const auth = require('./auth/auth')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passports = require('./auth/passport')
const cookieSession = require('cookie-session');

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
mongoose.connect("mongodb://localhost:27017/ppl", () => console.log('ppl db connected'));

//use nodemon

app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: ['hello'],
    httpOnly: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/category"));
app.use(express.static(__dirname + "/profileimage"));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/user', userrouter);
app.use('/post', postrouter);
app.use('/auth', auth);
app.use('/category', categoryrouter);


app.listen(5000, () => console.log('Server is listening on port 5000!'));