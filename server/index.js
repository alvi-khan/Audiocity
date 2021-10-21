const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { nanoid } = require('nanoid')
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

app.listen(3001, () => {
    console.log("running on port 3001");
})

app.get("/api/query", (req, res) => {
    const searchTerm = "%" + (req.query.searchTerm) + "%";

    const query = "SELECT ID, title, artist, album, uploader FROM music_files WHERE ((title LIKE (?)) OR (artist LIKE (?)) OR (album LIKE (?)) OR (uploader LIKE (?)))"

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