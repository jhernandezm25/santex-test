import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { schema } from './graphql/schema'
import createLeague from './graphql/resolvers/resolver'
import { graphqlHTTP } from 'express-graphql'
import DB from './database/mongodb'

dotenv.config()

const app: Application = express()
const PORT = process.env.APP_PORT || 3001

// database
const db = new DB()
db.getConnection()

// resolvers
const root = {
  importLeague: createLeague,
}

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    customFormatErrorFn: (err: any) => {
      try {
        err.details = JSON.parse(err)
        return err
      } catch {
        return err
      }
    },
  }),
)
// health
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!')
})

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`)
})
