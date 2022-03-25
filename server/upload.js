import {nanoid} from "nanoid";
import fs from "fs";
import multer from "multer";

var fileName = "";
var extensions = [];

function generateFileName() {
    let newName = nanoid();
    while (fs.existsSync('./Music Files/' + newName + '.mp3') || fs.existsSync('./MusicFiles/' + newName + '.flac'))  newName = nanoid();
    fileName = newName;
}

function getDestination(file) {
    var extension = file.originalname.split('.');
    extension = extension[extension.length - 1];
    extensions[file.fieldname] = extension;
    if (extension === "jpg" || extension === "png") return "Album Art";
    else                                            return "Music Files";
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getDestination(file))
    },
    filename: function (req, file, cb) {
        cb(null, fileName + "." + extensions[file.fieldname]);
    }
});

var upload = multer({ storage: storage }).fields([{ name: 'song', maxCount: 1 }, {name: 'image', maxCount: 1 }]);

export function uploadSong(db, req, res) {
    generateFileName();
    extensions = [];
    var title, artist, album, uploader, filePath, coverpath = "";
    upload(req, res, function (err) {
        if (err)  return res.status(500).json(err);
        title = req.body.title;
        artist = req.body.artist;
        album = req.body.album;
        uploader = req.body.uploader;
        filePath = "./Music Files/" + fileName + "." + extensions["song"];
        if (extensions["image"])  coverpath = fileName + "." + extensions["image"];
        const query = "INSERT INTO music_files (title, artist, album, uploader, filepath, coverpath) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
            query,
            [title, artist, album, uploader, filePath, coverpath],
            (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                res.send(results);
            }
        );
    })
}