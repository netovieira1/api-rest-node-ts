import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Usuarios - SignUp', () => {

  it('Cadastra usuário 1', async () => {

    const res1 = await testServer
    .post('/cadastrar')
    .send({ 
      senha: '123456',
      nome: 'Neto Vieira',
      email: 'neto@gmail.com'
    })
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
    })

  it('Cadastra usuário 2', async () => {

    const res1 = await testServer
    .post('/cadastrar')
    .send({ 
      senha: '123456',
      nome: 'Joao Silva',
      email: 'joao@gmail.com'
    })
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
    })

  it('Erro ao cadastrar usuário com email duplicado', async () => {

    const res1 = await testServer
    .post('/cadastrar')
    .send({ 
      senha: '123456',
      email: 'netoduplicado@gmail.com',
      nome: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number') 
    
    const res2 = await testServer
    .post('/cadastrar')
    .send({ 
      senha: '123456',
      email: 'netoduplicado@gmail.com',
      nome: 'Neto Vieira'
    })
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res2.body).toHaveProperty('errors.default') 
    })
  
  it('Erro ao cadastrar usuário com nome muito curto', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      senha: '123456',
      email: 'neto@gmail.com',
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
  })

  it('Erro ao cadastrar usuário sem o nome', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      senha: '123456',
      email: 'neto@gmail.com',
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
  })

  it('Erro ao cadastrar usuário sem o email', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      senha: '123456',
      nome: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

  it('Erro ao cadastrar usuário com o email inválido', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      senha: '123456',
      email: 'neto gmail.com',
      nome: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })

  it('Erro ao cadastrar usuário sem senha', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      email: 'neto@gmail.com',
      nome: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.senha')
  })

  it('Erro ao cadastrar usuário com senha inválida', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      senha: 'teste' || 9999,
      email: 'neto@gmail.com',
      nome: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.senha')
  })

  it('Erro ao cadastrar usuário com senha muito curta', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      senha: '123',
      email: 'neto@gmail.com',
      nome: 'Neto Vieira'
    })
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.senha')
  })

  it('Erro ao cadastrar usuário sem nenhuma propriedade', async () => {
    const res1 = await testServer
    .post('/cadastrar')
    .send({})
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.senha')
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.nome')
  })


})
