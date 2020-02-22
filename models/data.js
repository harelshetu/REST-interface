const Sequelize = require('sequelize');
const db  = require('../util/database');

/**
 * firstName,
 * lastName,
 * isFinished - if the user finished his api call
 */
const Users = db.define('api_data', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true      
    },
    firstName:{
        type: Sequelize.STRING,
         allowNull: false
    },
    lastName:{
        type: Sequelize.STRING,
         allowNull: false,
         defaultValue:0
    },
    isFinished:{
        type:Sequelize.BOOLEAN,
        allowNull: false,

    }


});

module.exports = Users;