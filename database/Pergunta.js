const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('Pergunta',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    desc:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Pergunta.sync({force: false})
.then(() =>{

})

module.exports = Pergunta;
