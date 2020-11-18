const mongoose = require('mongoose');
const slugify = require('slugify');


const articleSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    slug: {type: String, required: true, unique: true},
    comments: [{
        pseudo: {type: String, required: true},
        comment: {type: String, required: true},
        created: {type: Date, default: Date.now},
        title: {type: String, required: true},
        reply: [{
            pseudo: {type: String, default: "Jennifer (Admin)"},
            reply: {type: String, required: true},
            create: {type: Date, default: Date.now}
        }]
    }],
    likes: {type: Number, default: 0}


});

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
      }

      next();
});

module.exports = mongoose.model("Article", articleSchema);