const fetch = require('node-fetch');
const parseHtml = require('node-html-parser').parse

const cookie = '_ga=GA1.2.745731147.1572898705; lan=pl; _ym_d=1590059062; _ym_uid=1590059062935480695; _gcl_au=1.1.1701424439.1598818857; uid=1914; _gid=GA1.2.127812211.1601062632; logged_in=oNNhFcMlkyj8Nijg';

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
            'Cookie': cookie,
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
