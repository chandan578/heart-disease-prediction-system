const patientService = require("../service/patientsService");
const patientModel = require("../models/patients.model");

const patientController = {
  async createPatient(req, res) {
    console.log(req.body);
    const email_id = req.body.email_id;
    try {
      let patient = await patientModel.findOne({where:{email_id}});
      if(patient) return res.status(400).json({
        message: "Patient already exists.."
      });
      const newPatient = await patientService.createPatient(req.body);
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPatient(req, res) {
    try {
      const patient = await patientService.getPatientByEmail(req.params.email);
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllPatients(req, res) {
    try {
      const patients = await patientService.getAllPatients();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updatePatient(req, res) {
    try {
      await patientService.updatePatient(req.params.id, req.body);
      res.json({ message: "Patient updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deletePatient(req, res) {
    try {
      await patientService.deletePatient(req.params.id);
      res.json({ message: "Patient deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};


module.exports = patientController;