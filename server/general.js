import fs from "fs";

export function retrieveArtists(db, res) {
    const query = "SELECT DISTINCT ON (artist) artist, coverpath FROM music_files WHERE coverpath != ''";
    db.query(query, (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function getAlbumArt(db, res, songID) {
    const query = "SELECT coverpath FROM music_files WHERE id = $1";
    db.query(query, [songID], (error, results, fields) => {
        if (error)  return  console.error(error.message);
        res.send(results)
    })
}

export function getMetadata(db, res, songID) {
    const query = "SELECT title, artist FROM music_files WHERE id = $1";
    db.query(query, [songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function streamSong(db, res, songID) {
    const query = "SELECT filepath FROM music_files WHERE id = $1";
    db.query(query, [songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        const filePath = results.rows[0].filepath;
        res.setHeader("content-type", "audio/mpeg");
        fs.createReadStream(filePath).pipe(res);
    })
}

export function query(db, res, searchTerm) {
    searchTerm = "%" + (searchTerm) + "%";
    const query = "SELECT id, title, artist, album, coverpath, uploader FROM music_files WHERE ((title LIKE $1) OR (artist LIKE $1) OR (album LIKE $1))"
    db.query(query, [searchTerm], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}