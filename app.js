const express = require('express')
const app = express()
const livros = require('./livros')

const port = 3001

app.use('/livros', livros)

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:3001')
})
