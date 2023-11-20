import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { schema } from './graphql/schema'
import createLeague from './graphql/resolvers/createLeagueResolver'
import getPlayersResolver from './graphql/resolvers/getPlayerResolver'
import getTeamByNameResolver from './graphql/resolvers/getTeamsResolver'
import { graphqlHTTP } from 'express-graphql'
import DB from './database/mongodb'
import rateLimit from 'express-rate-limit'

dotenv.config()

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 50, // número máximo de solicitudes
  message:
    'Has excedido el límite de solicitudes. Por favor, espera un momento.',
})

const app: Application = express()
const PORT = process.env.APP_PORT || 3001

// database
const db = new DB()
db.getConnection()

// resolvers
const root = {
  importLeague: createLeague,
  getPlayers: getPlayersResolver,
  getTeamByName: getTeamByNameResolver,
}

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(limiter)
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
