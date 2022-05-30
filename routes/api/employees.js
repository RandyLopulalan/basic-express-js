const express = require("express");
const router = express.Router();
const employeesController = require('../../controllers/employeesController')

router.route("/")
.get(employeesController.getAllEmployees)
.post(employeesController.createNewEmployees)
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees);

// parameter direcli in the url
// get req has a parameter
router.route('/:id')
    .get(employeesController.getEmployees);

module.exports = router;
