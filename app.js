const express = require('express')
const app = express()

const port = 3001

app.get('/', (req, res) => {
  res.send('Olá...Bem vindo Pedro!')
})
app.get('/12', (req, res) => {
  res.send('<h1> Curso de express! </h1>')
})
// Exemplode middleware
const middleware = (req, res, next) => {
  console.log('tentando acessar a rota transfer...')
  console.log(`${new Date()}`)
  next()
}
// app.use(middleware);

app.get('/transfer', middleware, (req, res) => {
  res.send('ACESSANDO ROTA TRANSFER!')
})

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:3001')
})
