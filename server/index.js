import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg'
const { Pool } = pg
import {retrieveArtists, getAlbumArt, getMetadata, streamSong, query} from './general.js';
import {removeFromPlaylist, addToPlaylist, getPlaylists, deletePlaylist, createPlaylist, retrievePlaylistContent, checkFavorite, addToFavorites, removeFromFavorites} from './playlists.js';
import {validatelogin, checkUser, register} from "./users.js";
import {uploadSong} from "./upload.js";
import fs from "fs";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const db = new Pool({connectionString: process.env.DATABASE_URL});

db.connect();

let sql = fs.readFileSync('init_db.sql').toString();
db.query(sql, (error, results, fields) => {
    if (error)  return console.error(error.message);
})

var albumArt = "Album Art";
app.use(express.static(albumArt));

let PORT = 3001
if (process.env.NODE_ENV === 'production') {
    PORT = process.env.PORT;
}
app.listen(PORT, () => {})

// playlists
app.post("/api/removefromplaylist",
    (req, res) => { removeFromPlaylist(db, res, req.body.params.playlistID, req.body.params.songID) })
app.post("/api/addtoplaylist",
    (req, res) => { addToPlaylist(db, res, req.body.params.playlistID, req.body.params.songID) });
app.get("/api/playlists", (req, res) => { getPlaylists(db, res, req.query.owner); })
app.post("/api/deleteplaylist", (req, res) => { deletePlaylist(db, res, req.body.params.playlistID); })
app.post("/api/createplaylist", (req, res) => { createPlaylist(db, res, req.body.params.username, req.body.params.playlist); })
app.get("/api/playlistcontent", (req, res) => { retrievePlaylistContent(db, res, req.query.playlistID); })

// favorites
app.post("/api/unfavorite", (req, res) => { removeFromFavorites(db, res, req.body.params.user, req.body.params.songID); })
app.post("/api/favorite", (req, res) => { addToFavorites(db, res, req.body.params.user, req.body.params.songID); })
app.get("/api/checkfavorite", (req, res) => { checkFavorite(db, res, req.query.user, req.query.songID); })

// users
app.get("/api/validateuser", (req, res) => { validatelogin(db, res, req.query.userEmail, req.query.userPassword); })
app.get("/api/checkuser", (req, res) => { checkUser(db, res, req.query.userEmail); })
app.post("/api/register", (req, res) => { register(db, res, req.body.params.userEmail, req.body.params.userPassword); })

// general
app.get("/api/metadata", (req, res) => { getMetadata(db, res, req.query.songID); })
app.get("/api/albumart", (req, res) => { getAlbumArt(db, res, req.query.songID); })
app.get("/api/artists", (req, res) => { retrieveArtists(db, res); })
app.get("/api/song", (req, res) => { streamSong(db, res, req.query.songID); })
app.get("/api/query", (req, res) => { query(db, res, req.query.searchTerm); })
app.post("/api/upload", function (req, res) { uploadSong(db, req, res); });