import { Request, Response, NextFunction } from 'express'

import { find } from './employees.model'
import { DatabaseError } from '../../server/middleware/errorHandler'

const getEmployees = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const employees = await find()
    res.status(200).json(employees)
  } catch (error) {
    next(
      new DatabaseError({
        message: 'Could not retrieve employees',
        dbMessage: error,
      })
    )
  }
}

export default getEmployees
