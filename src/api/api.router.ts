import { Router } from 'express'

import controllers from './api.controllers'
import employeesRouter from '../resources/employees/employees.router'

const router = Router()

router.use('/employees', employeesRouter)

router.route('/').get(controllers.apiRoot)

export default router
