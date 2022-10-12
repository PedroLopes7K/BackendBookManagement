const express = require('express')
const app = express()
const livros = require('./livros')
const bp = require('body-parser')
const port = 3001

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/livros', livros)

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:3001')
})
