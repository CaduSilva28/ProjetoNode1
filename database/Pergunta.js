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

//O {force:false} vai sincronizar o que tem aqui com o BD. Ou seja, se no meu BD não há essa tabela, então ele cria
Pergunta.sync({force:false})
.then(() =>{

});

module.exports = Pergunta;