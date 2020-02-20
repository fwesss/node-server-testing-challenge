import { Router } from 'express'

import getEmployees from './employees.controllers'

const router = Router()

router.route('/').get(getEmployees)

export default router
