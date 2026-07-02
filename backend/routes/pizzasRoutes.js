const express = require("express");

const router = express.Router();

const pizzasController = require("../controllers/pizzasController");

router.get("/", pizzasController.getPizzas);

router.get("/:id", pizzasController.getPizzaById);

router.post("/", pizzasController.createPizza);

router.put("/:id", pizzasController.updatePizza);

router.delete("/:id", pizzasController.deletePizza);

module.exports = router;