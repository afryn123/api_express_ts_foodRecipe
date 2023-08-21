import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import routerAuth from './routes/auth'
import routerRecipe from './routes/recipe'

const app: Application = express()
const port: number = 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 200, message: 'Ok' })
})
app.use(routerAuth)
app.use(routerRecipe)
app.listen(port, () => console.log(`listening on port ${port}`))
