const Patient = require("../models/patients.model");

const patientService = {
  async createPatient(patientData) {
    console.log("uuuuuuuuuuuuuuuu")
    
    return await Patient.create(patientData);
  },

  async getPatientByEmail(email) {
    return await Patient.findOne({
      where: {
        email_id: email
      }
    });
  },

  async getAllPatients() {
    return await Patient.findAll();
  },

  async updatePatient(patientId, patientData) {
    return await Patient.update(patientData, { where: { id: patientId } });
  },

  async deletePatient(patientId) {
    return await Patient.destroy({ where: { id: patientId } });
  },
};

module.exports = patientService;
