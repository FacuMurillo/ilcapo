const db = require("../config/db");

const getAll = (callback) => {
    const sql = "SELECT * FROM pizzas";

    db.query(sql, callback);
};

module.exports = {
    getAll
};