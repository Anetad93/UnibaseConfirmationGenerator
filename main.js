const fetch = require('node-fetch');
const parseHtml = require('node-html-parser').parse
const excel = require('node-excel-export');
let excelCreat = require('excel4node');
const readXlsxFile = require('read-excel-file/node');
const Excel = require('exceljs');

// const resp = fetch("https://r.unibase.pl/55", {
//     "credentials": "include",
//     "headers": {
//         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//         "accept-language": "en-US,en;q=0.9,pl;q=0.8",
//         "cache-control": "max-age=0",
//         "content-type": "application/x-www-form-urlencoded",
//         "sec-fetch-mode": "navigate",
//         "sec-fetch-site": "same-origin",
//         "sec-fetch-user": "?1",
//         "upgrade-insecure-requests": "1",
//         'Cookie': '_ga=GA1.2.745731147.1572898705; lan=pl; _ym_d=1590059062; _ym_uid=1590059062935480695; _gcl_au=1.1.1701424439.1598818857; uid=1914; _gid=GA1.2.127812211.1601062632; logged_in=oNNhFcMlkyj8Nijg',
//         "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
//     },
//     "referrer": "https://r.unibase.pl/55",
//     "referrerPolicy": "no-referrer-when-downgrade",
//     "body": "sel_what=2&date_from=2020-05-01&date_to=2020-05-31",
//     "method": "POST",
//     "mode": "cors",
// });
//
// function extractCountryAndDocumentId(childNodes) {
//
//     if (childNodes.length === 3) {
//         return [childNodes[0].rawText, childNodes[2].rawText]
//     } else if (childNodes.length === 2) {
//         if (childNodes[0].tagName === 'br') {
//             return ["", childNodes[1].rawText]
//         } else {
//             return [childNodes[0].rawText, ""]
//         }
//     } else {
//         return [ "tu", "tu" ]
//     }
// }
//
// function getAddress(childNodes) {
//     if (childNodes.length !== 0) {
//         return childNodes[0].rawText + ", " + childNodes[2].rawText
//     } else {
//         return ""
//     }
// }
//
// resp.then(result => {
//     result.text().then(html => {
//         let root = parseHtml(html)
//         let workbook = new excelCreat.Workbook();
//         let worksheet = workbook.addWorksheet('Confirmation');
//
//         worksheet.cell(1, 1).string("UiD")
//         worksheet.cell(1, 2).string("Nazwisko i imię")
//         worksheet.cell(1, 3).string("Adres")
//         worksheet.cell(1, 4).string("Numer paszportu")
//         worksheet.cell(1, 5).string("Kraj")
//         worksheet.cell(1, 6).string("Data urodzenia")
//         worksheet.cell(1, 7).string("Płeć")
//         worksheet.cell(1, 8).string("Numer pokoju")
//         worksheet.cell(1, 9).string("Rozmiar pokoju")
//         worksheet.cell(1, 10).string("Start umowy")
//         worksheet.cell(1, 11).string("Koniec umowy")
//
//         let a = 2
//
//         for (let row of root.querySelectorAll("tbody tr")) {
//             let uid = parseInt(row.childNodes[1].rawText)
//             let name = row.childNodes[3].rawText
//             let address = getAddress(row.childNodes[13].childNodes)
//                 // row.childNodes[13].childNodes[0].rawText + ", " + row.childNodes[13].childNodes[2].rawText
//             let [country, passportNumber] = extractCountryAndDocumentId(row.childNodes[15].childNodes)
//             let dateOfBirth = row.childNodes[7].rawText
//             // let identificator = row.childNodes[15].lastChild.textContent
//             // let balance = parseFloat(row.childNodes[27].rawText.replace(/[,.]/g, m => (m === ',' ? '.' : ',')))
//
//             if (address === "" || passportNumber === "") {
//             } else {
//                 worksheet.cell(a, 1).number(uid)
//                 worksheet.cell(a, 2).string(name)
//                 worksheet.cell(a, 3).string(address)
//                 worksheet.cell(a, 4).string(passportNumber)
//                 worksheet.cell(a, 5).string(country)
//                 worksheet.cell(a, 6).string(dateOfBirth)
//
//                 a++
//             }
//         }
//         workbook.write('test.xlsx');
//     })
// })

const resp51 = fetch("https://r.unibase.pl/51", {
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
    "referrer": "https://r.unibase.pl/51",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "sel_what=2&date_from=2020-05-01&date_to=2020-05-31",
    "method": "POST",
    "mode": "cors",
});

resp51.then(result => {
    result.text().then(html => {
        let root = parseHtml(html)
        let workbook = new Excel.Workbook();

        workbook.xlsx.readFile("test.xlsx").then(() => {
            let worksheet = workbook.getWorksheet("Confirmation");

            let a = 2

            for (let row of root.querySelectorAll("tbody tr")) {
                let uid = parseInt(row.childNodes[1].rawText)
                let sex = row.childNodes[5].rawText // 1 to dziewczyna, 2 chłopak
                let country = row.childNodes[13].rawText
                let room = row.childNodes[17].rawText
                let sizeOfRoom = row.childNodes[19].rawText
                let dateOfStartAgreement = row.childNodes[21].rawText
                let dateOfEndAgreement = row.childNodes[23].rawText

                for (let i = 2; worksheet.getCell(i, 1).value !== null; i++) {
                    if (worksheet.getCell(i, 1).value === uid) {
                        worksheet.getCell(i, 7).value= sex
                        worksheet.getCell(i, 8).value = room
                        worksheet.getCell(i, 9).value = sizeOfRoom
                        worksheet.getCell(i, 10).value = dateOfStartAgreement
                        worksheet.getCell(i, 11).value = dateOfEndAgreement
                    }
                }
                a++
            }
            workbook.xlsx.writeFile('test3.xlsx');
        }).catch(err => console.log(err));

    })
})
