const express = require('express')
const app = express()
const rotas = require('./routes')
const PORT = process.env.PORT || 8080

app.use('/',rotas)

app.listen(PORT, function(){
    console.log("Servidor iniciado!")
})
