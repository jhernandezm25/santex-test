import getPlayers from '../../functions/getPlayers'
import playerController from '../../controllers/player/player.controller'

const getPlayersResolver = async (body: any) => {
  const { leagueCode, teamName, coach } = body
  const response = await getPlayers(
    playerController,
    leagueCode,
    teamName,
    coach,
  )
  return response
}

export default getPlayersResolver
