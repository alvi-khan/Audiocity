import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg'
const { Pool } = pg
import {retrieveArtists, getAlbumArt, getMetadata, streamSong, query} from './general.js';
import {removeFromPlaylist, addToPlaylist, getPlaylists, deletePlaylist, createPlaylist, retrievePlaylistContent, checkFavorite} from './playlists.js';
import {validatelogin, checkUser, register} from "./users.js";
import {uploadSong} from "./upload.js";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "audiocity",
    post: 5432,
});

db.connect();

var albumArt = "Album Art";
app.use(express.static(albumArt));

app.listen(3001, () => { console.log("running on port 3001"); })

// playlists
app.post("/api/removefromplaylist",
    (req, res) => { removeFromPlaylist(db, res, req.body.params.playlistID, req.body.params.songID) })
app.post("/api/addtoplaylist",
    (req, res) => { addToPlaylist(db, res, req.body.params.playlistID, req.body.params.songID) });
app.get("/api/playlists", (req, res) => { getPlaylists(db, res); })
app.post("/api/deleteplaylist", (req, res) => { deletePlaylist(db, res, req.body.params.playlistID); })
app.post("/api/createplaylist", (req, res) => { createPlaylist(db, res, req.body.params.playlist); })
app.get("/api/playlistcontent", (req, res) => { retrievePlaylistContent(db, res, req.query.playlistID); })

// favorites
app.post("/api/unfavorite", (req, res) => { removeFromPlaylist(db, res, 0, req.body.params.songID); })
app.post("/api/favorite", (req, res) => { addToPlaylist(db, res, 0, req.body.params.songID); })
app.get("/api/checkfavorite", (req, res) => { checkFavorite(db, res, req.query.songID); })

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