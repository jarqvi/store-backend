const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createError = require('http-errors');

function createRoute(req) {
    const data = new Date();
    const year = data.getFullYear().toString();
    const month = data.getMonth().toString();
    const day = data.getDay().toString();
    const dir = path.join(__dirname, `../../public/uploads/blogs/${year}/${month}/${day}`);
    req.body.fileUploadPath = path.join('uploads', 'blogs', year, month, day);
    fs.mkdirSync(dir, {recursive: true}); 
    return dir;
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = createRoute(req);
            return cb(null, filePath);
        }
        cb(null, null)
    },
    filename: (req, file, cb) => {
        if (file?.originalname) {
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.fileName = fileName;
            cb(null, fileName);
        }
        // cb(null, null)
    }
});
function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const mimeTypes = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
    if (mimeTypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createError.BadRequest('File is not valid'));
}
const maxSize = 1024 * 1024 * 2;
const uploadFile = multer({storage, fileFilter, limits: {fileSize: maxSize}});

module.exports = {
    uploadFile
};