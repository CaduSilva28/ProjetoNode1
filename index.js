const express = require("express");
const app = express();
const port = 2000;
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//======= CONEXÃO COM BD =======//
connection
.authenticate()
.then(() => {
    console.log("Conexão feita com BD");
})   
.catch((msgError) => {
    console.log("Erro de conexão com BD: " + msgError);
});

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//======= ROTAS =======//
app.get("/",(req,res) => {
    Pergunta.findAll({
        raw: true,
        order:[
            ['id','DESC']
        ]
    })
    .then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

app.post("/salvarPergunta",(req,res) => {
    let title = req.body.title;
    let desc = req.body.desc;

    Pergunta.create({
        title: title,
        desc: desc
   })
   .then(() => {
       res.redirect("/");
   })
   .catch((msgError) => {
        console.log("Ocorreu um erro ao salvar pergunta no BD");
   })
});

app.get("/pergunta/:id",(req,res) => {
    let id = req.params.id;
    
    Pergunta.findOne({
        raw: true,
        where: {id: id}
    })
   .then(pergunta => {
        if(pergunta) {
            res.render("pergunta",{
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
   });
});

app.post("/resposta",(req,res) => {
    let idPergunta = req.body.idPergunta;
    let corpo = req.body.corpo;

    Resposta.create({
        idPergunta: idPergunta,
        corpo: corpo 
    })
    .then(() => {
        res.redirect("/pergunta/" + idPergunta);
    })
    .catch((msgError) => {
        console.log("Ocorreu um erro!");
    });
});

//======= SERVIDOR =======//
app.listen(port,(msgError) => {
    if(msgError){
        console.log("Erro ao criar servidor");
    }else{
        console.log("Servidor rodando");
    }
});