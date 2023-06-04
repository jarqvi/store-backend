const { default: mongoose } = require("mongoose");

const commentsSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, default: new Date().now()},
    parent: {type: mongoose.Types.ObjectId}
});
const blogSchema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    shortText: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: [mongoose.Types.ObjectId], required: true},
    comments: {type: [commentsSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: 'users', default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: 'users', default: []},
    bookmark: {type: [mongoose.Types.ObjectId], ref: 'users', default: []},
}, {timestamps: true, versionKey: false});

module.exports = {
    BlogModel: mongoose.model('blog', blogSchema)
};