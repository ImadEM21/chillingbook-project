const Article = require('../models/Article');
const Presentation = require('../models/Presentation');
const Message = require('../models/Message');
const fs = require('fs');




exports.getAllArticles = async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    const presentations = await Presentation.find();
    res.render('index', {articles: articles, presentations: presentations});
};

exports.getAdminArticles = async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    const presentations = await Presentation.find();
    res.render('admin', {articles: articles, presentations: presentations});
};

exports.newArticle = (req, res) => {
    res.render('new', { article: new Article() });
};

exports.createArticle = async (req, res, next) => {
    if (req.file) {
        const article = new Article({
            title: req.body.title,
            description: req.body.description,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        await article.save()
        .then(() => res.redirect(`${article.slug}`))
        .catch(error => res.status(500).json({error}));
    } else {
        const presentation = new Presentation({
            title: req.body.title,
            description: req.body.description
        });
        await presentation.save()
        .then(() => res.redirect('/login'))
        .catch(error => res.status(500).json({ error }));
    }
};

exports.getSlug = async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    const presentations = await Presentation.find();
    if (article == null) {
        res.redirect('/');
    } else {
        res.render('show', {article: article, presentations: presentations});
    }
}; 

exports.getAdminSlug = async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    const presentations = await Presentation.find();
    if (article == null) {
        res.redirect('/login');
    } else {
        res.render('showAdmin', {article: article, presentations: presentations});
    }
};

exports.getModifyArticle = async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('edit', {article: article});
};

exports.modifyArticle = async (req, res) => {
    if (req.file) {
        const article = { 
            title: req.body.title,
            description: req.body.description,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        try {
            await Article.updateOne({_id: req.params.id}, {...article, _id: req.params.id})
            .then(() => res.redirect(`/login/${article.slug}`))
            .catch(error => res.render('edit', {article: article}));
        } catch (e) {
            res.render(`edit`, {article: article});
        }
    } else {
        const presentation = {
            title: req.body.title,
            description: req.body.description
        };
        try {
            await Presentation.updateOne({_id: req.params.id}, {...presentation, _id: req.params.id});
            res.redirect('login');
        } catch (e) {
            res.status(500).json({ e });
        }
    }
};

exports.deleteArticle = async (req, res) => {
        await Article.findOne({_id: req.params.id})
        .then(article => {
            const filename = article.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, () => {
                Article.deleteOne({_id: req.params.id})
                .then(() => res.redirect('login'))
                .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
};

exports.getContact = (req, res) => {
    res.render('contact', {message: new Message() });
};

exports.getMessages = async (req, res) => {
    await Message.find()
    .then(messages => {
        console.log(messages);
        res.render('messages', {messages: messages});
    })
    .catch(error => res.status(400).json({error}));
};

exports.createMessage = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body);
    req.message = new Message();
    let message = req.message;
    message.email = req.body.email;
    message.name = req.body.name;
    message.message = req.body.message;
    try {
      message = await message.save();
      res.redirect(`/`);
    } catch (e) {
      res.status(400).json({e});
    }
};

exports.deleteMessage = async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.redirect('/login');
};