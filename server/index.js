const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
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
    const query = "SELECT * FROM music_files";
    db.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        res.send(results);
    })
})