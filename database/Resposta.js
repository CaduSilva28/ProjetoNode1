const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('Resposta',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    idPergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false})
.then(() => {

});

module.exports = Resposta;