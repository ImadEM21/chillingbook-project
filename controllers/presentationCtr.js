const Presentation = require('../models/Presentation');


exports.newPresentation = (req, res) => {
    res.render('newPresentation.ejs', {presentation: new Presentation() });
};

exports.getModifyPresentation = async (req, res) => {
    const presentation = await Presentation.findById(req.params.id);
    res.render('editPresentation.ejs', {presentation: presentation});
};

exports.deletePresentation = async (req, res) => {
    await Presentation.findByIdAndDelete(req.params.id);
    res.redirect('/login');
};