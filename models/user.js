'use strict';
const {
  Model
} = require('sequelize');
const axios = require('axios')
const {hashPassword} = require('../helpers/bycript')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserRoom, {foreignKey : 'UserId'})
    }
    async getWeather(){
        let weather = await axios({
          method : 'GET',
          url : 'https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=aa901ff9d89c451fa8ce9fc54b2b94cf&include=minutely'
        })
        return weather.data.data[0]
    }
  };
  User.init({
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {msg : 'Username required'}
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        notNull : {msg : 'Email is required'},
        notEmpty : {msg : 'Email is required'},
        isEmail : {msg : 'Wrong email format'}
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : 'Password is required'},
        notEmpty : {msg : 'Password is required'}
      }
    },
    address: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {msg : 'Address is required'}
      }
    },
    phoneNumber: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {msg : 'Address is required'}
      }
    },
    status : {
      type :DataTypes.STRING,
      defaultValue : 'online'
    },
    longitude : {
      type : DataTypes.STRING
    },
    latitude : {
      type : DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user,options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};