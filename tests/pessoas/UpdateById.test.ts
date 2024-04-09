import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Pessoas - UpdateById', () => {
  let accessToken = ''
  beforeAll(async () => {
    const email = 'update-pessoas@gmail.com'
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

  it('Tenta atualizar sem usar token de autenticação', async () => {
    const res1 = await testServer
      .put('/pessoas/1')
      .send({
        cidadeId: 1,
        email: 'neto@gmail.com',
        nomeCompleto: 'Neto Vieira',
      })
      expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
      expect(res1.body).toHaveProperty('errors.default')
    })

  it('Atualiza o resgistro', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({ 
      cidadeId,
      email: 'netoupdate@gmail.com',
      nomeCompleto: 'Neto Vieira'
     })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resAtualizada = await testServer
    .put(`/pessoas/${res1.body}`)
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({ 
      cidadeId,
      email: 'netoupdates@gmail.com',
      nomeCompleto: 'Neto Vieira'
     })

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tenta atualizar registro que não existe', async () => {
    const res1 = await testServer
    .put('/pessoas/99999')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({ cidadeId,
      email: 'neto@gmail.com',
      nomeCompleto: 'Neto Vieira' })

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
})