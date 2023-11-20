import { ICompetition } from '../controllers/competition.interface'
import { CompetitionT } from '../models/competition'
import { ISoccerApiService } from '../services/soccerApi.Interface'

const importLeagueData = async (
  id: string,
  competition: ICompetition,
  soccerApi: ISoccerApiService,
) => {
  try {
    const competitionInformation = await soccerApi.getCompetition(id)
    if (competitionInformation.isResult) {
      const myCompetition: CompetitionT = {
        leagueId: competitionInformation.data.id,
        name: competitionInformation.data.name,
        code: competitionInformation.data.code,
        areaName: competitionInformation.data.area.name,
      }
      const response = await competition.createCompetition(myCompetition)
      return response
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

export default importLeagueData
