const Sequelize = require('sequelize');
module.exports = new Sequelize('mydb', 'root','', {
    dialect: 'mysql',
    host: 'localhost'
  });

 