import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Create', () => {
  beforeAll(async () => {
    await testServer
    .post('/cadastrar')
    .send({
      nome: 'Joao',
      senha: '123456',
      email: 'joao@gmail.com'
    })
  })

  it('Faz login', async () => {

    const res1 = await testServer
    .post('/entrar')
    .send({ 
      senha: '123456',
      email: 'joao@gmail.com'
    })
    expect(res1.statusCode).toEqual(StatusCodes.OK)
    expect(res1.body).toHaveProperty('accessToken')
    })

  it('Senha incorreta', async () => {

    const res1 = await testServer
    .post('/entrar')
    .send({ 
      senha: '1234567',
      email: 'joao@gmail.com'
    })
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
    })

  it('Email errado', async () => {

    const res1 = await testServer
    .post('/entrar')
    .send({ 
      senha: '123456',
      email: 'joaooooooo@gmail.com'
    })
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default') 
  })
  
  it('Email com formato inválido', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({ 
      senha: '123456',
      email: 'joao @gmail.com'
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

  it('Senha muito curta', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({ 
      senha: '123',
      email: 'joao@gmail.com'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.senha')
  })

  it('Senha não informada', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({ 
      email: 'joao@gmail.com'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.senha')
  })

  it('Email não informado', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({ 
      senha: '123456',

    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

 

  it('Tenta criar registro sem nenhuma propriedade', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({})
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.senha')
  })


})
