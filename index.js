const express = require('express')
const axios = require('axios').default
const parser = require('node-html-parser').parse
const app = express()
const PORT = process.env.PORT || 8080

app.get('/', function(req, res){
    var url = "https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/agenda-do-presidente-da-republica/2021-05-27"
    var requisicao = axios.get(url)
    
    requisicao.then(function(resposta){
        var root = parser(resposta.data);
        var divCompromissos = root.querySelectorAll(".item-compromisso");

        compromisso = divCompromissos.map(function(curso){
            var titulo_compromisso = curso.querySelector('.compromisso-titulo').rawText
            var horario_inicio = curso.querySelector('.compromisso-inicio').rawText
            var horario_fim = curso.querySelector('.compromisso-fim').rawText
            
            return {
                "Compromisso": titulo_compromisso,
                "Horário de início": horario_inicio,
                "Horário de término": horario_fim,
            }
        })

        res.json(compromisso)
    })
})

app.listen(PORT, function(){
    console.log("Servidor iniciado!")
})
