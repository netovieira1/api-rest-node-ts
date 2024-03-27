import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - Create', () => {
  let cidadeId: number | undefined = undefined
  beforeAll(async () => {
    const resCidade = await testServer
    .post('/cidades')
    .send({ nome: 'Teste' })

  cidadeId = resCidade.body
  })

  it('Cria registro', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({ 
      cidadeId,
      email: 'neto@gmail.com',
      nomeCompleto: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
    })

  it('Cria registro 2', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({ 
      cidadeId,
      email: 'neto2@gmail.com',
      nomeCompleto: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
    })

  it('Tenta criar registro com email duplicado', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({ 
      cidadeId,
      email: 'netoduplicado@gmail.com',
      nomeCompleto: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number') 
    
    const res2 = await testServer
    .post('/pessoas')
    .send({ 
      cidadeId,
      email: 'netoduplicado@gmail.com',
      nomeCompleto: 'Neto Vieira'
    })
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res2.body).toHaveProperty('errors.default') 
    })
  
  it('Tenta criar um registro com nomeCompleto muito curto', async () => {
    const res1 = await testServer
    .post('/pessoas')
    .send({
      cidadeId,
      email: 'neto@gmail.com',
      nomeCompleto: 'Ne'
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('tenta criar registro sem o nomeCompleto', async () => {
    const res1 = await testServer
    .post('/pessoas')
    .send({
      cidadeId,
      email: 'neto@gmail.com',
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('Tenta criar registro sem o email', async () => {
    const res1 = await testServer
    .post('/pessoas')
    .send({
      cidadeId,
      nomeCompleto: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

  it('Tenta criar registro com o email inválido', async () => {
    const res1 = await testServer
    .post('/pessoas')
    .send({
      cidadeId,
      email: 'neto gmail.com',
      nomeCompleto: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

  it('Tenta criar registro sem cidadeId', async () => {
    const res1 = await testServer
    .post('/pessoas')
    .send({
      email: 'neto@gmail.com',
      nomeCompleto: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
  })

  it('Tenta criar registro com cidadeId inválida', async () => {
    const res1 = await testServer
    .post('/pessoas')
    .send({
      cidadeId: 'teste' || 9999,
      email: 'neto@gmail.com',
      nomeCompleto: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
  })

  it('Tenta criar registro sem nenhuma propriedade', async () => {
    const res1 = await testServer
    .post('/pessoas')
    .send({})
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })


})
