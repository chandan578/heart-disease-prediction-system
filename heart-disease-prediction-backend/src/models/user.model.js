const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      // defaultValue: 'patient'
    },
    phone: {type: DataTypes.STRING, allowNull: true},
    address: {type: DataTypes.TEXT, allowNull: true},
    specialization: {type: DataTypes.STRING, allowNull: true},
    experience: {type: DataTypes.INTEGER, allowNull: true},
    age: {type: DataTypes.INTEGER, allowNull: true},
    gender: {type: DataTypes.STRING, allowNull: true},
    permissions: {type: DataTypes.STRING, allowNull: true},
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: true,
  }
);

module.exports = User;
