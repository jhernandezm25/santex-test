import { IPlayer } from '../controllers/player/player.interface'

const getPlayers = async (
  player: IPlayer,
  leagueCode: string,
  teamName?: string,
  coach?: boolean,
) => {
  try {
    const players = await player.getPlayers(leagueCode, teamName, coach)
    return players
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default getPlayers
