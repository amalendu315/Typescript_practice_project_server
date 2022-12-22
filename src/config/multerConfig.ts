import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/assets'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/assets'),
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb:any) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: File upload only supports the following filetypes - ' + filetypes);
    },
});