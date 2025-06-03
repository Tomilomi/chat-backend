import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';
import Usuario from './user.js';

class Message extends Model { }

Message.init({
    message_id: {
        type: DataTypes.INTEGER,
        field: 'message_id',
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: true,
    },
    date_time: {
        type: DataTypes.DATE,
        field: 'date_time',
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    content: {
        type: DataTypes.TEXT,
        field: 'content',
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Message',
    tableName: 'Message',
    timestamps: false,
});


export default Message;
