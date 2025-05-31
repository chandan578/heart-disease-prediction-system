const User = require("../models/user.model");

const UserService = {
  async createUser(userData) {
    return await User.create(userData);
  },

  async getUserById(userId) {
    return await User.findByPk(userId);
  },

  async getAllUsers() {
    return await User.findAll();
  },

  async updateUser(userId, updatedData) {
    return await User.update(updatedData, { where: { id: userId } });
  },

  async deleteUser(userId) {
    return await User.destroy({ where: { id: userId } });
  },
};

module.exports = UserService;
