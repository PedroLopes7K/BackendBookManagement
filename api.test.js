const request = require('supertest')
const baseURL = 'http://localhost:3001/livros'

describe('GET /livros', () => {
  it('should return 200', async () => {
    const response = await request(baseURL).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.error).toBe(false)
  })
  it('should return books', async () => {
    const response = await request(baseURL).get('/')
    expect(response.body.length >= 1).toBe(true)
  })
})

describe('POST /livros', () => {
  const newBook = {
    titulo: 'testandooooooo',
    autor: 'paulinho',
    ano: 2022,
    preco: 122,
    foto: 'testestes'
  }

  afterAll(async () => {
    const resp = await request(baseURL).get(`/`)
    const lastElement = resp.body.pop()
    await request(baseURL).delete(`/${lastElement.id}`)
  })

  it('should add an item to todos array', async () => {
    const response = await request(baseURL).post('/').send(newBook)
    const responseItem = await request(baseURL).get(
      `/unico/${response.body.id}`
    )
    const lastItem = responseItem.body[0]

    expect(response.statusCode).toBe(201)
    expect(lastItem.titulo).toBe(newBook.titulo)
    expect(lastItem.autor).toBe(newBook.autor)
    expect(lastItem.ano).toBe(newBook.ano)
    expect(lastItem.preco).toBe(newBook.preco)
    expect(lastItem.foto).toBe(newBook.foto)
  })
})

describe('Update one book', () => {
  const newBook = {
    titulo: 'testandooooooo',
    autor: 'paulinho',
    ano: 2022,
    preco: 122,
    foto: 'testestes'
  }

  beforeAll(async () => {
    await request(baseURL).post('/').send(newBook)
  })
  afterAll(async () => {
    const resp = await request(baseURL).get(`/`)
    const lastElement = resp.body.pop()
    await request(baseURL).delete(`/${lastElement.id}`)
  })
  it('should update item if it exists', async () => {
    const resp = await request(baseURL).get(`/`)
    const lastElement = resp.body.pop()
    const response = await request(baseURL).put(`/${lastElement.id}`).send({
      autor: 'novo Autor'
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toBe(1) // 1 == true
  })
})

describe('Delete one book', () => {
  const newBook = {
    titulo: 'testandooooooo',
    autor: 'paulinho',
    ano: 2022,
    preco: 122,
    foto: 'testestes'
  }

  beforeAll(async () => {
    await request(baseURL).post('/').send(newBook)
  })
  it('should delete one item', async () => {
    const resp = await request(baseURL).get(`/`)
    const lastElement = resp.body.pop()
    const response = await request(baseURL).delete(`/${lastElement.id}`)
    const books = await request(baseURL).get('/')

    const exists = books.body.find(book => {
      lastElement.id == book.id
    })
    expect(exists).toBe(undefined)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(1) // 1 == true
  })
})
