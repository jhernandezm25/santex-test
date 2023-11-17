// src/index.ts
import { sayHello } from './modules/myModule'
import express, { Application, Request, Response } from 'express';

//import router from './routes';

const app: Application = express();
const PORT = 3000;

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Rutas principales
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!');
});

// Rutas del enrutador
//app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
