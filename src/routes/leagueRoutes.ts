import { Router } from 'express'
import axios from 'axios'
import Competition from '../models/Competition'
import Team from '../models/Team'
import Player from '../models/Player'

const router = Router()

//TODO cambiar esa implementacion y hacerla en el controlador
router.post('/importLeague', async (req, res) => {
  try {
    const { leagueCode } = req.body

    // Realizar solicitudes a la API de football-data.org y almacenar datos en la base de datos

    res.json({ message: 'Datos importados con éxito' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al importar la liga' })
  }
})

export default router
