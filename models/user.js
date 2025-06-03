import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';
import Picture from './picture.js';
import Message from './message.js';

class Usuario extends Model { }

Usuario.init({
    user_id: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING(50),
        field: 'user_name',
        allowNull: false,
    },
    user_password: {
        type: DataTypes.STRING(255),
        field: 'user_password',
        allowNull: false,
    },
    user_number_pp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_number_pp',
        defaultValue: 0, // Default to 0 if no picture is set
    },
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuario',
    timestamps: false,
});

// Usuario pertenece a Picture
Usuario.belongsTo(Picture, {
    foreignKey: 'user_number_pp',
    as: 'picture',
});

// Usuario tiene muchos mensajes
Usuario.hasMany(Message, {
    foreignKey: 'user_id',
    as: 'messages',
});

export default Usuario;
