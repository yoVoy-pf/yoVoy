import {Request, Response, NextFunction} from 'express'

// Check the origin of the current request

export const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ').pop()
  if (token === '123456'){
    next()
  }else{
    res.status(409);
    res.send({error: 'private content'})
  }
}