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
            imageUrl: `https://www.chillingbook.fr/images/${req.file.filename}`
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
            imageUrl: `https://www.chillingbook.fr/images/${req.file.filename}`
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
                .then(() => res.redirect('/login'))
                .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
};



exports.createComment = (req, res, next) => {
    const comment = {
        pseudo: req.body.pseudo,
        title: req.body.title,
        comment: req.body.comment
    };
    Article.findByIdAndUpdate(req.params.id, {$push: {comments: comment}})
    .then(() => res.status(201).json({message: "Commentaire ajouté avec succès"}))
    .catch(() => res.status(500).json({message: "Echec"}));
};


exports.deleteComment = (req, res, next) => {
    const article = Article.findById(req.params.id);
    Article.findByIdAndUpdate(req.params.id, {$pull: {comments: {_id: req.params.com}}})
    .then(() => res.redirect(`/login`))
    .catch(err => next(err));
};

exports.replyComment = (req, res, next) => {
    const reply = {
        reply: req.body.rep
    };
    Article.updateOne({_id: req.params.id, "comments._id": req.params.com}, {$push: {"comments.$.reply": reply}})
    .then(() => res.redirect('/login'))
    .catch(err => next(err));
};

exports.deleteReply = (req, res, next) => {
    Article.updateOne({_id: req.params.id, "comments._id": req.params.com}, {$pull: {"comments.$.reply": {_id: req.params.rep}}})
    .then(() => res.redirect('/login'))
    .catch(err => next(err));
};


exports.getContact = (req, res) => {
    res.render('contact', {message: new Message() });
};

exports.getMessages = async (req, res) => {
    await Message.find()
    .then(messages => {
        res.render('messages', {messages: messages});
    })
    .catch(error => res.status(400).json({error}));
};

exports.createMessage = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const message = new Message({
        email: req.body.email,
        name: req.body.name,
        message: req.body.message
    });
    
    await message.save()
      .then(() => res.redirect(`/`))
      .catch(error => res.status(400).json({error}));
};

exports.deleteMessage = async (req, res, next) => {
    await Message.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/login'))
    .catch(err => next(err));
};


exports.like = (req, res, next) => {
    Article.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}})
    .then(() => res.status(201).json({message: "Like ajouté"}))
    .catch(err => next(err));
};

exports.dislike = (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, {$inc: {likes: -1}})
  .then(() => res.status(201).json({message: "Like annulé"}))
  .catch(err => next(err));
}