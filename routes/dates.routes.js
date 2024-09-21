modules.exports = (app) => {
    const DATESCONTROLLER = require('../controllers/dates.controller');
    app.get('/festivos', DATESCONTROLLER.list);
}