const service = require('./print-service');

module.exports = function (app) {
  app.post('/expungementform/print', service.printExpungementForm);
}