const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const Article = require('./models/Article');
const Presentation = require('./models/Presentation');

const articleRouter = require('./routes/articles');
const userRouter = require('./routes/user');
const emailRouter = require('./routes/email');


const app = express();
mongoose.connect('mongodb+srv://imad21:Wqs79xwqs79x@cluster0.r2pkt.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/views', express.static('views')); 
app.use('/images', express.static('images'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', articleRouter);
app.use('/', userRouter);
app.use('/email', emailRouter);


module.exports = app;
