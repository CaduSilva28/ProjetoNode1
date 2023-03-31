const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = 10;
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//========= CONEXÃO COM BD =========//
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((error) =>{
        console.log("Ocorreu um erro: " + error);
    });


app.set('view engine','ejs');
app.use(express.static('public'));

//========= bodyParser =========//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//========= Rotas =========//
app.get("/",(req,res) => {
    //O findAll é equivalente ao SELECT * FROM ..
    //O raw significa crú, ou seja, vai trazer apenas os dados e mais nada
    Pergunta.findAll({raw:true}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
   
});

app.get("/perguntar",(req,res) => {
    res.render("toAsk");
});


app.post("/salvarPergunta",(req,res) => {
    let titulo = req.body.titulo;
    let desc = req.body.desc;
    //O metodo create é o mesmo que INSERT INTO....
    Pergunta.create({
        title: titulo,
        desc: desc
    })
    .then(() => {
       res.redirect("/");
    })
    .catch((msgError) => {
        console.log("Ocorreu um erro!");
    });
});


//========= Servidor =========//
app.listen(route,(error) => {
    if(error){
        console.log("Ocorreu um erro");
    }else{
        console.log("Servidor rodando");
    }
});
