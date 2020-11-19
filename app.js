const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const articleRouter = require('./routes/articles');
const userRouter = require('./routes/user');
const emailRouter = require('./routes/email');


const app = express();

// Connexion à MongoDB en prod (cloud)-->
/*
mongoose.connect('mongodb+srv://username:password@cluster0.r2pkt.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
*/
  

  // Connexion à MongoDB en developpement (local)-->
  

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
.then(() => console.log("Connexion à MongoDB réussie"))
.catch(() => console.log("connexion à MongoDB échouée"));
  

//CORS
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


// accès aux fichiers statiques
app.use('/views', express.static('views'));
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/', articleRouter);
app.use('/adminid', userRouter);
app.use('/email', emailRouter);


module.exports = app;
