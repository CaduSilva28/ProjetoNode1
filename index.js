const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = 10;
const connection = require("./database/database");


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
    res.render("index");
});

app.get("/perguntar",(req,res) => {
    res.render("toAsk");
});


app.post("/salvarPergunta",(req,res) => {
    let titulo = req.body.titulo;
    let desc = req.body.desc;

    res.send("<h3>Formulario Recebido</h3><p><b>Titulo: </b>" + titulo +"</p><p><b>Descrição: </b>" + desc +"</p>");
});


//========= Servidor =========//
app.listen(route,(error) => {
    if(error){
        console.log("Ocorreu um erro");
    }else{
        console.log("Servidor rodando");
    }
});
