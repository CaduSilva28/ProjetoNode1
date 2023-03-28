const express = require("express");
const app = express();
const route = 10;

app.set('view engine','ejs');
app.use(express.static('public'));

//========= Rotas =========//
app.get("/",(req,res) => {
    res.render("index");
});

app.get("/perguntar",(req,res) => {
    res.render("toAsk");
});

//========= Servidor =========//
app.listen(route,(error) => {
    if(error){
        console.log("Ocorreu um erro");
    }else{
        console.log("Servidor rodando");
    }
});
