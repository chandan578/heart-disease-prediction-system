const express = require("express");
const patientController = require("../controllers/patientController");
const router = express.Router();

router.post("/patient", patientController.createPatient);
router.get("/patient", patientController.getAllPatients);
router.get("/patient/:email", patientController.getPatient);
router.put("/patient/:id", patientController.updatePatient);
router.delete("/patient/:id", patientController.deletePatient);


module.exports = router;