const { default: mongoose } = require("mongoose");
const { commentsSchema } = require("./public.schema");

const Episodes = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: 'free'},
    time: {type: String, required: true},
});

const Chapter = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ''},
    episodes: {type: [Episodes], default: []},
});

const CourseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    shortText: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: 'category', required: true},
    comments: {type: [commentsSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], default: []},
    dislikes: {type: [mongoose.Types.ObjectId], default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    type: {type: String, default: 'free', required: true}, // free - cash - special
    time: {type: String, default: '00:00:00'},
    teacher: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
    chapters: {type: [Chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: 'user'}
});

CourseSchema.index({title: 'text', shortText: 'text', text: 'text'});

module.exports = {
    CourseModel: mongoose.model('course', CourseSchema)
};