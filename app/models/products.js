const { default: mongoose } = require("mongoose");
const { commentsSchema } = require("./public.schema");

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    shortText: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: [String], required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: 'category', required: true},
    comments: {type: [commentsSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], default: []},
    dislikes: {type: [mongoose.Types.ObjectId], default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
    type: {type: String, required: true}, // virtual or real
    format: {type: String},
    supplier: {type: mongoose.Types.ObjectId, required: true},
    feature: {type: Object, default: {
        width: '', 
        height: '', 
        length: '', 
        weight: '',
        colors: [],
        model: [],
        made_in: '',
    }},
});

module.exports = {
    ProductModel: mongoose.model('product', Schema)
};