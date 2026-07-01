const Pizza = require("../models/pizzaModel");

// GET todas
const getPizzas = (req, res) => {

    Pizza.getAll((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

// GET por id
const getPizzaById = (req, res) => {

    Pizza.getById(req.params.id, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results[0]);

    });

};

// POST
const createPizza = (req, res) => {

    Pizza.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Pizza creada",
            id: result.insertId
        });

    });

};

// PUT
const updatePizza = (req, res) => {

    Pizza.update(
        req.params.id,
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Pizza actualizada"
            });

        }
    );

};

// DELETE
const deletePizza = (req, res) => {

    Pizza.remove(
        req.params.id,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Pizza eliminada"
            });

        }
    );

};

module.exports = {
    getPizzas,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
};