import importData from '../../functions/createCompetition'
import competitionController from '../../controllers/competition/competition.controller'
import soccerApiServiceImpl from '../../services/soccerApiImp'
import playerController from '../../controllers/player/player.controller'
import teamController from '../../controllers/team/team.controller'

const createLeague = async (id: any) => {
  const { leagueCode } = id

  const response = await importData(
    leagueCode,
    competitionController,
    teamController,
    playerController,
    soccerApiServiceImpl,
  )
  return response
}

export default createLeague
