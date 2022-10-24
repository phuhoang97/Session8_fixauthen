const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

// "/user"

// Get all
router.get("/", userController.getAll);

// Get one by Id
router.get("/:id", userController.getById);

// Create one by Id
router.post("/", userController.createUser);

// Update one by Id
router.put("/:id", userController.updateUser);

// Delete one by Id
router.delete("/:id", userController.deleteUser);

module.exports = router;
