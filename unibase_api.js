const fetch = require('node-fetch');
const parseHtml = require('node-html-parser').parse

function sendRequest(method, endpoint, body) {
    const url = "https://r.unibase.pl/" + endpoint;
    const resp = fetch(url, {
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
            'Cookie': '_ga=GA1.2.745731147.1572898705; lan=pl; _ym_d=1590059062; _ym_uid=1590059062935480695; _gcl_au=1.1.1701424439.1598818857; uid=1914; _gid=GA1.2.127812211.1601062632; logged_in=oNNhFcMlkyj8Nijg',
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
        },
        "referrer": url,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": body,
        "method": method,
        "mode": "cors",
    });

    return resp;
}

function getUsers() {
    return sendRequest("POST", "55", "").then(result => {
        return result.text().then(html => {
            let root = parseHtml(html);
            return root;
        })
    });
}

module.exports = {
    getUsers,
}
