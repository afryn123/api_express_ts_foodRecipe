import { Request, Response, NextFunction } from 'express'
import service from '../services/recipeService'
import validate from '../middleware/recipeValidation'

interface AuthorizationToken extends Request {
  user?: any
}
interface Recipe {
  category: string
  status: 'private' | 'public'
  descriptions: string
  cooks: string
  image: string
  author_id: string
}

const create = async (req: AuthorizationToken, res: Response, next: NextFunction): Promise<any> => {
  const { category, status, cooks, descriptions, image } = req.body
  const authorId: string = req.user.id.toLowerCase()

  const newRecipe: Recipe = { category, status, cooks, descriptions, image, author_id: authorId }
  const { error } = validate.validateRecipe(newRecipe)

  if (error ?? false) {
    res.status(422).json({
      status: false,
      message: error.details[0].message
    })
    return
  }

  service
    .create(newRecipe)
    .then(() => {
      res.status(401).json({
        success: true,
        message: 'Success add recipe'
      })
    })
    .catch((err) => {
      res.status(401).json({
        success: false,
        message: err.message
      })
    })
}

export default { create }