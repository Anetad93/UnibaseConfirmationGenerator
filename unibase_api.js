const fetch = require('node-fetch');
const parseHtml = require('node-html-parser').parse
const config = require('./config')

async function sendRequest(method, endpoint, body) {
    const url = "https://r.unibase.pl/" + endpoint;

    console.log(`fetching ${url}...`)

    let result = await fetch(url, {
        "credentials": "include",
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,pl;q=0.8",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            'Cookie': config.cookie,
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
        },
        "referrer": url,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": body,
        "method": method,
        "mode": "cors",
    });

    let html = await result.text();

    console.log(`${url} fetched`);

    let root = parseHtml(html);
    return root;
}

function getUsers() {
    return sendRequest("POST", "55", "");
}

function getCurrentResidents() {
    return sendRequest("POST", "51", "");
}

module.exports = {
    getUsers,
    getCurrentResidents,
}
