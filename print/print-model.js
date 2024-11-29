const fs = require('fs');
const pdfLib = require("pdf-lib");
const fieldMap = require("../utils/expungementFieldMap.json");

const printModel = {};

// const data = {
//     "DefPhone": "123-456-7890",
//     "Arrest1Loc": "New York City",
//     "Arrest1Offense": "Theft",
//     "Arrest1IndNum": "00123A",
//     "Arrest1ChrgDt": "2024-01-15",
//     "Arrest1ChrgOffense": "Shoplifting",
//     "Arrest1DismissCrt": "Manhattan District Court",
//     "ExpungeCntyName": "Kings County",
//     "DefName": "John Doe",
//     "DefAddrStr": "123 Main Street",
//     "DefAddr2": "Apt 4B",
//     "FormReset": "Reset",
//     "FormPrint": "Print",
//     "Arrest1GuiltyDt": "2024-03-05",
//     "Arrest1GuiltyOffense": "Misdemeanor Theft",
//     "Arrest1GuiltyStatute": "PL 155.25",
//     "Arrest1Sent": "Community Service",
//     "Arrest1TimeEndDt": "2024-06-10",
//     "Arrest1ProbEndDt": "2024-12-10",
//     "Arrest1FinePaidDt": "2024-04-01",
//     "Arrest2Loc": "Brooklyn",
//     "Arrest2Offense": "Vandalism",
//     "Arrest2IndNum": "00234B",
//     "Arrest2ChrgDt": "2023-10-25",
//     "Arrest2ChrgOffense": "Property Damage",
//     "Arrest2DismissCrt": "Brooklyn District Court",
//     "Arrest2GuiltyDt": "2024-01-20",
//     "Arrest2GuiltyOffense": "Felony Vandalism",
//     "Arrest2GuiltyStatute": "PL 145.10",
//     "Arrest2Sent": "Probation",
//     "Arrest2TimeEndDt": "2024-12-15",
//     "Arrest2ProbEndDt": "2025-01-01",
//     "Arrest2FinePaidDt": "2024-02-28",
//     "Arrest3Loc": "Queens",
//     "Arrest3Offense": "DUI",
//     "Arrest3IndNum": "00345C",
//     "Arrest3ChrgDt": "2022-08-14",
//     "Arrest3ChrgOffense": "Driving Under Influence",
//     "Arrest3DismissCrt": "Queens District Court",
//     "Arrest3GuiltyDt": "2022-10-30",
//     "Arrest3GuiltyOffense": "Misdemeanor DUI",
//     "Arrest3GuiltyStatute": "VTL 1192.3",
//     "Arrest3Sent": "6 months license suspension",
//     "Arrest3TimeEndDt": "2023-05-01",
//     "Arrest3ProbEndDt": "2023-11-01",
//     "Arrest3FinePaidDt": "2023-01-10",
//     "NotaryDtDay": "15",
//     "NotaryDtYr": "2024",
//     "NotaryDtMnth": "April",
//     "ExpungeDocketNum": "2024EXP4567",
//     "DefBirthDt": "1990-07-12",
//     "DefSsn": "123-45-6789",
//     "OrderExpungeDtDay": "10",
//     "OrderExpungeDtMth": "August",
//     "OrderExpungeDtYr": "2024",
//     "Arrest1Dt": "2023-02-18",
//     "Arrest1Statute": "PL 120.00",
//     "Arrest2Dt": "2022-07-10",
//     "Arrest2Statute": "PL 145.12"
// };

printModel.printPDF = (data) => {
    return new Promise((resolve, reject) => {
        pdfLib.PDFDocument.load(fs.readFileSync("./pdf-forms/expungement-form.pdf")).then((pdfDoc) => {
            const form = pdfDoc.getForm();
            const fields = form.getFields();
            fields.forEach((field) => {
                if (field.constructor.name === "PDFTextField") {
                    // field.setText(data[field.getName()] ? data[field.getName()] : "test data");
                    field.setText(getFieldValueFromData(field.getName(), data));
                }
            });

            pdfDoc.save().then((data) => {
                resolve(data);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        }).catch((err) => {
            console.error(err);
            reject(err);
        });
    });
}

const getFieldValueFromData = (fieldName, data) => {
    if (fieldMap[fieldName]) {
        const mapping = fieldMap[fieldName];
        if (mapping.fields && typeof mapping.fields === "string") {
            return data[mapping.fields];
        } else if (mapping.fields && Array.isArray(mapping.fields)) {
            return mapping.fields.map(field => data[field]).join(mapping.seperator || " ");
        }
    }
    return "";
}

module.exports = printModel;
// printModel.printPDF("expungement-form.pdf", data);