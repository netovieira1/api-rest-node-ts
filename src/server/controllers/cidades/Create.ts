import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'


interface ICidade {
  nome: string
}


interface IFilter {
  filter?: string,
}

export const createValidation = validation((getSchema) => ({ 
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}))

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  return res.status(StatusCodes.CREATED).json(1)
}