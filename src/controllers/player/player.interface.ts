import { Player } from '../../models/player'

export interface IPlayer {
  createPlayer(data: Player): Promise<Player>
  createManyPlayers(data: Array<Player>): Promise<number>
  getPlayers(
    leagueCode: string,
    teanName?: string,
    coach?: boolean,
  ): Promise<Array<Player>>
}
