export function validatelogin(db, res, email, password) {
    const query = "SELECT email FROM users WHERE email=$1 AND password=$2"
    db.query(query, [email, password], (error, results) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function checkUser(db, res, email) {
    const query = "SELECT email FROM users WHERE email=$1"
    db.query(query, [email], (error, results) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function register(db, res, email, password) {
    const query = "INSERT INTO users VALUES ($1, $2)";
    db.query(query, [email, password], (error) => {
        if (error)  return console.error(error.message);
        res.send("Done");
    })
}