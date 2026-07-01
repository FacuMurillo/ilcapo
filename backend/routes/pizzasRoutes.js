const express = require("express");

const router = express.Router();

const pizzasController = require("../controllers/pizzasController");

router.get("/", pizzasController.getPizzas);

module.exports = router;