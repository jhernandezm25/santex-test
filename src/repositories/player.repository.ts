import { Model, Document } from 'mongoose'
import { Player, PlayerModel } from '../models/player'
import { ErrorMessages } from '../common/errors/errors'
import competitionRepository from './competition.repository'
class PlayerRepository {
  private readonly playerModel: Model<Player & Document>

  constructor(model: Model<Player & Document>) {
    this.playerModel = model
  }

  async findAll(): Promise<Player[]> {
    return this.playerModel.find().lean()
  }

  async findById(id: number): Promise<Player | null> {
    return this.playerModel.findById(id).lean()
  }

  async create(data: Player): Promise<Player> {
    return this.playerModel.create(data)
  }

  async findByLeagueId(leagueId: number): Promise<Player | null> {
    return this.playerModel.findOne({ leagueId }).lean()
  }

  async find(query: any) {
    return this.playerModel.find(query).lean()
  }

  async update(id: string, data: Partial<Player>): Promise<Player | null> {
    return this.playerModel.findByIdAndUpdate(id, data, { new: true }).lean()
  }

  async createOrUpdate(data: Player): Promise<Player> {
    const existingPlayer = await this.playerModel
      .findOne({ playerId: data })
      .lean()

    if (existingPlayer) {
      throw new Error(ErrorMessages.PLAYER_ALREADY_EXISTS)
    }

    const newPlayer = await this.playerModel.create(data)
    return newPlayer.toObject() as Player
  }

  async delete(id: string): Promise<void> {
    await this.playerModel.findByIdAndDelete(id)
  }

  async createMany(players: Player[]): Promise<Player[]> {
    try {
      // Obtener la lista de playerId de los jugadores a insertar
      const playerIdsToInsert = players.map((player) => player.playerId)

      // Buscar jugadores que ya existen en la base de datos
      const existingPlayers = await this.playerModel.find({
        playerId: { $in: playerIdsToInsert },
      })

      // Filtrar la lista original para excluir los jugadores que ya existen
      const playersToInsert = players.filter(
        (player) =>
          !existingPlayers.some(
            (existing) => existing.playerId === player.playerId,
          ),
      )

      if (playersToInsert.length === 0) {
        // No hay nuevos jugadores para insertar
        return []
      }

      // Insertar los jugadores restantes en la colección
      const result = await this.playerModel.insertMany(playersToInsert, {
        ordered: false,
      })

      return result
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getPlayersByLeague(
    leagueCode: string,
    teamName?: string,
    coach: boolean = false,
  ): Promise<Player[]> {
    let playersQuery: any = { leagueCode, isCoach: coach }

    const league = await competitionRepository.findByAttributte({
      code: leagueCode,
    })

    if (!league) {
      throw new Error(ErrorMessages.CODE_NOT_EXISTS)
    }

    if (teamName) {
      playersQuery = { ...playersQuery, team: teamName }
    }

    const players = await PlayerModel.find(playersQuery).lean()

    return players
  }
}

export default new PlayerRepository(PlayerModel)
