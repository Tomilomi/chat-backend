import { DataTypes, Model } from 'sequelize';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import sequelize from '../db/db.js';
import Picture from './picture.js';
import Message from './message.js';

class Usuario extends Model {
    getName() {
        return this.user_name
    }

    getSecureUser() {
        const { user_id, user_name, user_number_pp } = this;
        return { user_id, user_name, user_number_pp }
    }

    async validatePassword(plainPw) {
        return bcrypt.compare(plainPw, this.user_password)
    }

    generateJwt() {
        const payload = {
            id: this.user_id,
            user_name: this.user_name,
            user_number_pp: this.user_name
        }
        return jwt.sign(payload, process.env.JWT_SECRET)
    }

}

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
