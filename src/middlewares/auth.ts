import { NextFunction, Request, Response } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send({
      message: 'Token is not defained'
    })
  }
  next()
}
