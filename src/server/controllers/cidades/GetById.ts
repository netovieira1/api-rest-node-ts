import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { CidadesProvider } from '../../database/providers/cidades'


interface IParamProps {
  id?: number,
}


export const getAllByIdValidation = validation((getSchema) => ({ 
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}))

export const getById = async (req: Request<IParamProps>, res: Response) => {

  if(!req.params.id){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    })
  }

  const result = await CidadesProvider.getById(req.params.id)
  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }   
    })
  }
  
  return res.status(StatusCodes.OK).json(result)
}