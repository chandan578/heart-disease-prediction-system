const { DataTypes, JSONB } = require("sequelize");
const { sequelize } = require("../config/database");


const patients = sequelize.define(
    "patients",{
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'patient'
        },
        symptoms_data: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        // created_at:{
        //     type: DataTypes.DATE,
        //     defaultValue: true
        // },
        // updated_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: true
        // }
    },
    {
        tableName: 'patients',
        schema: 'public',
        // underscored: true,
        timestamps: true
    }
);

module.exports = patients;