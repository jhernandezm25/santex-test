import PlayerRepository from '../../repositories/player.repository'
import { Player } from '../../models/player'
import { IPlayer } from './player.interface'

class PlayerController implements IPlayer {
  async getPlayers(
    leagueCode: string,
    teanName?: string | undefined,
    coach?: boolean,
  ): Promise<Player[]> {
    try {
      const players = await PlayerRepository.getPlayersByLeague(
        leagueCode,
        teanName,
        coach,
      )
      return players
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
  async createPlayer(data: Player): Promise<Player> {
    try {
      const player = await PlayerRepository.createOrUpdate(data)
      return player
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async createManyPlayers(data: Player[]): Promise<number> {
    try {
      const result = await PlayerRepository.createMany(data)
      return result.length
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

export default new PlayerController()
