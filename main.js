const Excel = require('exceljs');

const unibase_api = require("./unibase_api")

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
//         return ["tu", "tu"]
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
// unibase_api.getUsers().then(root => {
//     let workbook = new Excel.Workbook();
//     let worksheet = workbook.addWorksheet('Confirmation');
//
//     worksheet.getCell(1, 1).value = "UiD";
//     worksheet.getCell(1, 2).value = "Nazwisko i imię";
//     worksheet.getCell(1, 3).value = "Adres";
//     worksheet.getCell(1, 4).value = "Numer paszportu";
//     worksheet.getCell(1, 5).value = "Kraj";
//     worksheet.getCell(1, 6).value = "Data urodzenia";
//     worksheet.getCell(1, 7).value = "Płeć";
//     worksheet.getCell(1, 8).value = "Numer pokoju";
//     worksheet.getCell(1, 9).value = "Rozmiar pokoju";
//     worksheet.getCell(1, 10).value = "Start umowy";
//     worksheet.getCell(1, 11).value = "Koniec umowy";
//
//     let a = 2
//
//     for (let row of root.querySelectorAll("tbody tr")) {
//         let uid = parseInt(row.childNodes[1].rawText)
//         let name = row.childNodes[3].rawText
//         let address = getAddress(row.childNodes[13].childNodes)
//         // row.childNodes[13].childNodes[0].rawText + ", " + row.childNodes[13].childNodes[2].rawText
//         let [country, passportNumber] = extractCountryAndDocumentId(row.childNodes[15].childNodes)
//         let dateOfBirth = row.childNodes[7].rawText
//         // let identificator = row.childNodes[15].lastChild.textContent
//         // let balance = parseFloat(row.childNodes[27].rawText.replace(/[,.]/g, m => (m === ',' ? '.' : ',')))
//
//         if (address === "" || passportNumber === "") {
//         } else {
//             worksheet.getCell(a, 1).value = uid
//             worksheet.getCell(a, 2).value = name
//             worksheet.getCell(a, 3).value = address
//             worksheet.getCell(a, 4).value = passportNumber
//             worksheet.getCell(a, 5).value = country
//             worksheet.getCell(a, 6).value = dateOfBirth
//
//             a++
//         }
//     }
//
//     workbook.xlsx.writeFile('test3.xlsx');
// })


unibase_api.getCurrentResidents().then(root => {
    let workbook = new Excel.Workbook();

    workbook.xlsx.readFile("test3.xlsx").then(() => {
        let worksheet = workbook.getWorksheet("Confirmation");

        let a = 2

        for (let row of root.querySelectorAll("tbody tr")) {
            let uid = parseInt(row.childNodes[1].rawText)
            let sex = parseInt(row.childNodes[5].rawText) // 1 to dziewczyna, 2 chłopak
            let country = row.childNodes[13].rawText
            let room = row.childNodes[17].rawText
            let sizeOfRoom = parseInt(row.childNodes[19].rawText)
            let dateOfStartAgreement = row.childNodes[21].rawText
            let dateOfEndAgreement = row.childNodes[23].rawText

            for (let i = 2; worksheet.getCell(i, 1).value !== null; i++) {
                if (worksheet.getCell(i, 1).value === uid) {
                    worksheet.getCell(i, 7).value = sex
                    worksheet.getCell(i, 8).value = room
                    worksheet.getCell(i, 9).value = sizeOfRoom
                    worksheet.getCell(i, 10).value = dateOfStartAgreement
                    worksheet.getCell(i, 11).value = dateOfEndAgreement
                }
            }
            a++
        }
        workbook.xlsx.writeFile('test4.xlsx');
    }).catch(err => console.log(err));

})
