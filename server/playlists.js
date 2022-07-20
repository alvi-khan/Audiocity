export function removeFromPlaylist(db, res, playlistID, songID) {
    const query = "DELETE FROM playlist_songs WHERE playlist_id=$1 AND song_id=$2";
    db.query(query, [playlistID, songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function addToPlaylist(db, res, playlistID, songID) {
    const query = "INSERT INTO playlist_songs VALUES ($1, $2)"
    db.query(query, [playlistID, songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
    })
}

export function getPlaylists(db, res, owner) {
    const query = "SELECT id, name FROM playlists WHERE owner = $1";
    db.query(query, [owner], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function deletePlaylist(db, res, playlistID) {
    var query = "DELETE FROM playlist_songs WHERE playlist_id=$1";
    db.query(query, [playlistID] , (error, results, fields) => {
        if (error)  return console.error(error.message);
        query = "DELETE FROM playlists WHERE id=$1";
        db.query(query, [playlistID], (error, results, fields) => { res.send(results); })
    })
}

export function createPlaylist(db, res, owner, playlistName) {
    const query = "INSERT INTO playlists (name, owner) VALUES ($1, $2)"
    db.query(query, [playlistName, owner], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function retrievePlaylistContent(db, res, playlistID) {
    var query = "SELECT song_id FROM playlist_songs WHERE playlist_id = $1";
    var songs = [];
    db.query(query, [playlistID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        results.rows.forEach(element => { songs.push(element.song_id); });
        query = "SELECT id, title, artist, album, coverpath, uploader FROM music_files WHERE id = ANY($1)";
        db.query(query, [songs], (error, results, fields) => {
            if (error)  return console.error(error.message);
            res.send(results);
        })
    })
}

export function checkFavorite(db, res, user, songID) {
    const query = "SELECT * FROM playlists AS pl, playlist_songs AS ps " +
        "WHERE pl.id = ps.playlist_id AND pl.name = 'Favorites' AND pl.owner = $1 AND ps.song_id = $2";
    db.query(query, [user, songID], (error, results, fields) => {
        if (error)  return console.error(error.message);
        res.send(!(results.rows[0] === undefined));
    })
}

export function addToFavorites(db, res, user, songID) {
    const query = "SELECT id FROM playlists WHERE name = $1 AND owner = $2";
    db.query(query, ['Favorites', user], (error, results) => {
        if (error)  return console.error(error.message);
        let playlist_id = results.rows[0].id;
        addToPlaylist(db, res, playlist_id, songID);
    })
}

export function removeFromFavorites(db, res, user, songID) {
    const query = "SELECT id FROM playlists WHERE name = $1 AND owner = $2";
    db.query(query, ['Favorites', user], (error, results) => {
        if (error)  return console.error(error.message);
        let playlist_id = results.rows[0].id;
        removeFromPlaylist(db, res, playlist_id, songID);
    })
}