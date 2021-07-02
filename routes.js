const express = require('express')
const route = express.Router()
const axios = require('axios').default
const parser = require('node-html-parser').parse

route.get('/presidente', function(req, res){
    var url = "https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/agenda-do-presidente-da-republica/"
    var requisicao = axios.get(url)
    
    var filtro;
    if(req.query.titulo) filtro = req.query.titulo

    requisicao.then(function(resposta){
        const date = new Date().getTime()
        
        var root = parser(resposta.data);
        var divCompromissos = root.querySelectorAll(".item-compromisso");
        var ar = [];
        
        divCompromissos.map(function(curso){
            var titulo = curso.querySelector('.compromisso-titulo').rawText
            var inicio = curso.querySelector('.compromisso-inicio').rawText
            var fim = curso.querySelector('.compromisso-fim').rawText
            
            var com = {titulo,inicio,fim}

            if(filtro){
                if(titulo.includes(filtro)){
                    ar.push(com)
                }
            } else {
                ar.push(com)
            }
        })

        res.json(ar)
    }).catch(err => {
        res.json(err)
    })
})

// NOTE - Algumas vezes a agenda do vice-presidente está vazia. Isto faz com que
//        a busca retorne um objeto vazio, caso isto ocorra verificar usando a 
//        seguinte url: https://www.gov.br/planalto/pt-br/conheca-a-vice-presidencia/agenda-vice-presidente/2021-06-30/
route.get('/vice-presidente', function(req, res){
    var url =  "https://www.gov.br/planalto/pt-br/conheca-a-vice-presidencia/agenda-vice-presidente/"
    var requisicao = axios.get(url)
    
    var filtro;
    if(req.query.titulo) filtro = req.query.titulo

    requisicao.then(function(resposta){
        const date = new Date().getTime()
        
        var root = parser(resposta.data);
        var divCompromissos = root.querySelectorAll(".item-compromisso");
        var ar = [];
        
        divCompromissos.map(function(curso){
            var titulo = curso.querySelector('.compromisso-titulo').rawText
            var inicio = curso.querySelector('.compromisso-inicio').rawText
            var fim = curso.querySelector('.compromisso-fim').rawText
            
            var com = {titulo,inicio,fim}

            if(filtro){
                if(titulo.includes(filtro)){
                    ar.push(com)
                }
            } else {
                ar.push(com)
            }
        })

        res.json(ar)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = route