module.exports = (app) => {
    const DATESCONTROLLER = require('../controllers/dates.controller');
    app.get('/festivos/:year', DATESCONTROLLER.list);
    app.get('/festivos/verificar/:year/:month/:day', DATESCONTROLLER.verify);
}