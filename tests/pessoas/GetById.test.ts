import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - GetById', () => {
  let accessToken = ''
  beforeAll(async () => {
    const email = 'create-pessoas@gmail.com'
    await testServer
    .post('/cadastrar')
    .send({
      nome: 'Teste',
      email,
      senha: '123456'
    })
    const signInRes = await testServer
    .post('/entrar')
    .send({
      email,
      senha: '123456'
    })

    accessToken = signInRes.body.accessToken
  })

  let cidadeId: number | undefined = undefined
  beforeAll(async () => {
    const resCidade = await testServer
    .post('/cidades')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({ nome: 'Teste' })

  cidadeId = resCidade.body
  })

  it('Tenta consultar sem usar token de autenticação', async () => {
    const res1 = await testServer
      .get('/pessoas/1')
      .send()

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Busca registro por id', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({ 
      cidadeId,
      email: 'netogetbyid@gmail.com',
      nomeCompleto: 'Neto Vieira'
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resBuscada = await testServer
    .get(`/pessoas/${res1.body}`)
    .set({ Authorization: `Bearer ${accessToken}` })
    .send()

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
    expect(resBuscada.body).toHaveProperty('nomeCompleto')
 
  })

  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer
    .get('/pessoas/99999')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
})