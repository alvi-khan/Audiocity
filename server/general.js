import fs from "fs";

export function retrieveArtists(db, res) {
    const query = "SELECT artist, coverpath FROM music_files WHERE coverpath != '' GROUP BY artist";
    db.query(query, (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function getAlbumArt(db, res, songID) {
    const query = "SELECT coverpath FROM music_files WHERE ID = (?)";
    db.query(query, songID, (error, results, fields) => {
        if (error)  return  console.error(error.message);
        res.send(results)
    })
}

export function getMetadata(db, res, songID) {
    const query = "SELECT title, artist FROM music_files WHERE ID = (?)";
    db.query(query, songID, (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function streamSong(db, res, songID) {
    const query = "SELECT filepath FROM music_files WHERE ID = (?)";
    db.query(query, [songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        const filePath = results[0].filepath;
        res.setHeader("content-type", "audio/mpeg");
        fs.createReadStream(filePath).pipe(res);
    })
}

export function query(db, res, searchTerm) {
    searchTerm = "%" + (searchTerm) + "%";
    const query = "SELECT ID, title, artist, album, coverpath FROM music_files WHERE ((title LIKE (?)) OR (artist LIKE (?)) OR (album LIKE (?)))"
    db.query(query, [searchTerm, searchTerm, searchTerm], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}