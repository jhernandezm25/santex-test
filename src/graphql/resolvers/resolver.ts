import importLeagueData from '../../functions/createCompetition'
import CompetitionController from '../../controllers/competition.controller'
import SoccerApiServiceImpl from '../../services/soccerApiImp'

const createLeague = async (id: any) => {
  const { leagueCode } = id
  const response = await importLeagueData(
    leagueCode,
    CompetitionController,
    SoccerApiServiceImpl,
  )
  return response
}

export default createLeague
