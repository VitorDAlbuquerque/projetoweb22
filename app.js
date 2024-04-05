const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.render("index.handlebars")
})

app.post("/cadastrar", function(req,res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Falha ao conectar: " +erro)
    })

    
})


app.get("/atualizar", function(req,res){
    post.update({
        nome: req.body.name,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }), {where: {id: req.body.id}}}.then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
    res.send("falha ao atuaizar os dados" + erro)
    })
)


app.get("/consultar", function(req,res){
    post.findAll().then(function(post){
        res.render("consultar", {post: post})
    })
})

app.get("/editar/:id", function(req,res){
post.findAll({where: {"id": req.params.id}}).then(function(posts){
res.render("editar",{post:posts})
})
})

app.delete("/deletar/:id",function(req,res){
    post.destroy({where: {"id": req.params.id}}).then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
    res.send("falha ao deletar" +erro)})
})

app.listen("8081", function(req,res){
    console.log("Rodando!")
})