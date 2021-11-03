const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { nanoid } = require('nanoid');
const multer = require('multer');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "music_Streaming_service"
})

var albumArt = "Album Art";
app.use(express.static(albumArt));

app.listen(3001, () => {
    console.log("running on port 3001");
})

app.get("/api/playlists", (req, res) => {
  const query = "SELECT ID, name FROM playlists WHERE owner = (?)";
  db.query(query, [req.query.owner], (error, results, fields) => {
    if (error)  return console.error(error.message);
    res.send(results);
  })
})

app.get("/api/playlistcontent", (req, res) => {
  var query = "SELECT song_id FROM playlist_songs WHERE playlist_id = (?)";
  var songs = [];
  db.query(query, [req.query.playlistID], (error, results, fields) => {
    if (error)  return console.error(error.message);
    results.forEach(element => {
      songs.push('"' + element.song_id + '"');
    });
    query = "SELECT ID, title, artist, album, uploader, coverpath FROM music_files WHERE ID IN (" + songs + ")";
    db.query(query, [songs], (error, results, fields) => {
      if (error)  return console.error(error.message);
      res.send(results);
    })
  })
  
})

app.get("/api/query", (req, res) => {
    const searchTerm = "%" + (req.query.searchTerm) + "%";

    const query = "SELECT ID, title, artist, album, uploader, coverpath FROM music_files WHERE ((title LIKE (?)) OR (artist LIKE (?)) OR (album LIKE (?)) OR (uploader LIKE (?)))"

    db.query(query, [searchTerm, searchTerm, searchTerm, searchTerm], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        res.send(results);
    })
})

app.get("/api/song", (req, res) => {
    const songID = req.query.songID;
    const query = "SELECT filepath FROM music_files WHERE ID = " + songID;
    db.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        const filePath = results[0].filepath;
        res.setHeader("content-type", "audio/mpeg");
        fs.createReadStream(filePath).pipe(res);
    })
})

app.post("/api/unfavorite", (req, res) => {
  var query = "SELECT ID FROM playlists WHERE name = 'Favorites' AND owner = (?)"
  db.query(query, [req.body.params.user], (error, results, fields) => {
    if(error) return console.error(error.message);
    query = "DELETE FROM playlist_songs WHERE playlist_id = (?) AND song_id = (?)"
    db.query(query, [results[0].ID, req.body.params.songID], (error, results, fields) => {
      if(error) return console.error(error.message);
    })
  })
})

app.post("/api/favorite", (req, res) => {
  var query = "SELECT ID FROM playlists WHERE name = 'Favorites' AND owner = (?)"
  db.query(query, [req.body.params.user], (error, results, fields) => {
    if (error)  return console.error(error.message);
    query = "INSERT INTO playlist_songs VALUES (?, ?)"
    db.query(query, [results[0].ID, req.body.params.songID], (error, results, fields) => {
      if (error)  return console.error(error.message);
    })
  })
})

app.get("/api/checkfavorite", (req, res) => {
  var query = "SELECT ID FROM playlists WHERE name = 'Favorites' AND owner = (?)"
  db.query(query, [req.query.user], (error, results, fields) => {
    if (error)  return console.error(error.message);
    query = "SELECT * FROM playlist_songs WHERE playlist_id = (?) AND song_id = (?)"
    db.query(query, [results[0].ID, req.query.songID], (error, results, fields) => {
      if (error)  return console.error(error.message);
      res.send(!(results[0] === undefined));
    })
  })
})

app.get("/api/metadata", (req, res) => {
    const songID = req.query.songID;
    const query = "SELECT title, artist FROM music_files WHERE ID = " + songID;
    db.query(query, (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
})

app.get("/api/albumart", (req, res) => {
    const songID = req.query.songID;
    const query = "SELECT coverpath FROM music_files WHERE ID = " + songID;
    db.query(query, (error, results, fields) => {
        if (error)  return  console.error(error.message);
        res.send(results)
    })
})

app.get("/api/artists", (req, res) => {
  const query = "SELECT artist, coverpath FROM music_files WHERE coverpath != '' GROUP BY artist";
  db.query(query, (error, results, fields) => {
    if (error)  return console.error(error.message);
    res.send(results);
  })
})

var fileName = "";
var extensions = [];

function generateFileName() {
  var newName = nanoid();
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

app.post("/api/upload", function (req, res) {
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
});