import https from "https";

export function startKeepAlive() {
    let url = "https://localhost:3001/"
    if (process.env.NODE_ENV === 'production') {
        url = process.env.HOSTED_ON;
    }
    setInterval(function() {
        https.get(url, function(res) {}).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 10 * 60 * 1000); // load every 10 minutes
}