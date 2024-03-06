import { Router } from 'express'

import {CidadesController} from './../controllers'
CidadesController.create

const router = Router()

router.get('/', (_, res) => {
  return res.send('Olá')
})

router.post('/teste', (req, res) => {
 return res.status(204).json(req.body)
})


router.post( '/cidades', 
  CidadesController.createValidation, 
  CidadesController.create
)
router.get( '/cidades', 
  CidadesController.getAllValidation, 
  CidadesController.getAll
)
router.get( '/cidades/:id', 
  CidadesController.getAllByIdValidation, 
  CidadesController.getById,
)
router.put( '/cidades/:id', 
  CidadesController.updateByIdValidation, 
  CidadesController.updateById,
)
router.delete( '/cidades/:id', 
  CidadesController.deleteByIdValidation, 
  CidadesController.deleteById,
)

export { router }