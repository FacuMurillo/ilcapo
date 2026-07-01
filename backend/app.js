require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const pizzasRoutes = require("./routes/pizzasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.use("/api/pizzas", pizzasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});