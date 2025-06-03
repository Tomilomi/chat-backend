import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';
import Usuario from './user.js';  // Importa Usuario para definir la relación

class Picture extends Model { }

Picture.init({
  pp_number: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    field: 'pp_number',
    primaryKey: true,
  },
  pp_image: {
    field: 'pp_image',
    type: DataTypes.BLOB('long'),
  },
}, {
  sequelize,
  modelName: 'Picture',
  tableName: 'Picture',
  timestamps: false,
});



export default Picture;
