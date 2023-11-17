import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
//import router from './routes'

dotenv.config()

const app: Application = express()
const PORT = process.env.APP_PORT || 3001

// Middleware para procesar solicitudes JSON
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas principales
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!')
})

// Rutas del enrutador
//app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`)
})
