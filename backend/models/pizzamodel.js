const db = require("../config/db");

// Obtener todas las pizzas
const getAll = (callback) => {
    db.query("SELECT * FROM pizzas", callback);
};

// Obtener pizza por id
const getById = (id, callback) => {
    db.query(
        "SELECT * FROM pizzas WHERE id = ?",
        [id],
        callback
    );
};

// Crear pizza
const create = (pizza, callback) => {

    const sql = `
        INSERT INTO pizzas
        (nombre, descripcion, precio, imagen)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            pizza.nombre,
            pizza.descripcion,
            pizza.precio,
            pizza.imagen
        ],
        callback
    );
};

// Actualizar pizza
const update = (id, pizza, callback) => {

    const sql = `
        UPDATE pizzas
        SET
            nombre = ?,
            descripcion = ?,
            precio = ?,
            imagen = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            pizza.nombre,
            pizza.descripcion,
            pizza.precio,
            pizza.imagen,
            id
        ],
        callback
    );
};

// Eliminar pizza
const remove = (id, callback) => {

    db.query(
        "DELETE FROM pizzas WHERE id = ?",
        [id],
        callback
    );

};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};