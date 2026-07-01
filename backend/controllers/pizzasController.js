const Pizza = require("../models/pizzaModel");

const getPizzas = (req, res) => {

    Pizza.getAll((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

module.exports = {
    getPizzas
};