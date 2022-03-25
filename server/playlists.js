export function removeFromPlaylist(db, res, playlistID, songID) {
    const query = "DELETE FROM playlist_songs WHERE playlist_id=(?) AND song_id=(?)";
    db.query(query, [playlistID, songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function addToPlaylist(db, res, playlistID, songID) {
    const query = "INSERT INTO playlist_songs VALUES (?, ?)"
    db.query(query, [playlistID, songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
    })
}

export function getPlaylists(db, res) {
    const query = "SELECT ID, name FROM playlists";
    db.query(query, (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function deletePlaylist(db, res, playlistID) {
    var query = "DELETE FROM playlist_songs WHERE playlist_id=(?)";
    db.query(query, [playlistID] , (error, results, fields) => {
        if (error)  return console.error(error.message);
        query = "DELETE FROM playlists WHERE id=(?)";
        db.query(query, [playlistID], (error, results, fields) => { res.send(results); })
    })
}

export function createPlaylist(db, res, playlistName) {
    const query = "INSERT INTO playlists (name) VALUES (?)"
    db.query(query, [playlistName], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function retrievePlaylistContent(db, res, playlistID) {
    var query = "SELECT song_id FROM playlist_songs WHERE playlist_id = (?)";
    var songs = [];
    db.query(query, [playlistID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        results.forEach(element => { songs.push('"' + element.song_id + '"'); });
        query = "SELECT ID, title, artist, album, coverpath FROM music_files WHERE ID IN (" + songs + ")";
        db.query(query, [songs], (error, results, fields) => {
            if (error)  return console.error(error.message);
            res.send(results);
        })
    })
}

export function checkFavorite(db, res, songID) {
    const query = "SELECT * FROM playlist_songs WHERE playlist_id = (?) AND song_id = (?)"
    db.query(query, [0, songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(!(results[0] === undefined));
    })
}