const Sequelize = require('sequelize');

const sequelize = new Sequelize('e-commerce-nodejs', 'root' , 'windows11' ,  {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;