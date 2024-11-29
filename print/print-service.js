const printModel = require('./print-model');

const printExpungementForm = (req, res) => {
    printModel.printPDF(req.body).then((data) => {
        res.setHeader('Content-disposition', 'attachment; filename=' + "ExpungeForm.pdf");
        res.setHeader('Content-type', 'application/pdf');
        res.end(data);
    }).catch((error) => {
        res.status(500).send({
            code : 5000,
            messageKey : "Print form failed",
            data : error
        });
    });
}

module.exports = {
    printExpungementForm: printExpungementForm
}