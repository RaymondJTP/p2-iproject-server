'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/bycript');


module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.UserRoom, {foreignKey : 'RoomId'})
    }
  };
  Room.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : 'Room Name cant be empty'},
        notEmpty : {msg : 'Room Name cant be empty'}
      }
    },
    member: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {msg : 'Total Member cant be empty'},
        notEmpty : {msg : 'Total Member room cant be empty'}
      }
    },
    passwordRoom: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : 'Please input your password'},
        notEmpty : {msg : 'Password Room cant be empty'}
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
    hooks : {
      beforeCreate : (room,options) => {
        room.passwordRoom = hashPassword(room.passwordRoom)
      }
    }
  });
  return Room;
};