export function validatelogin(db, res, email, password) {
    const query = "SELECT email FROM users WHERE email=(?) AND password=(?)"
    db.query(query, [email, password], (error, results) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function checkUser(db, res, email) {
    const query = "SELECT email FROM users WHERE email=(?)"
    db.query(query, [email], (error, results) => {
        if (error)  return console.error(error.message);
        res.send(results);
    })
}

export function register(db, res, email, password) {
    const query = "INSERT INTO users VALUES (?, ?)";
    db.query(query, [email, password], (error) => {
        if (error)  return console.error(error.message);
        res.send("Done");
    })
}