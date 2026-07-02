const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ilcapo",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log("Error al conectar:", err);
        return;
    }

    console.log("Base de datos conectada");
});

module.exports = connection;