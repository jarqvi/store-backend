const { default: mongoose } = require("mongoose");
const { commentsSchema } = require("./public.schema");

const blogSchema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
    title: {type: String, required: true},
    shortText: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: [mongoose.Types.ObjectId], ref: 'category', required: true},
    comments: {type: [commentsSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: 'user', default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: 'user', default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: 'user', default: []},
});

module.exports = {
    BlogModel: mongoose.model('blog', blogSchema)
};