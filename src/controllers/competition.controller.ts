import competitionRepository from '../repositories/competition.repository'
import { Competition, CompetitionT } from '../models/competition'
import { ICompetition } from './competition.interface'

class CompetitionController implements ICompetition {
  async getAllCompetitions(): Promise<Array<Competition>> {
    try {
      const competitions = await competitionRepository.findAll()
      return competitions
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async createCompetition(data: CompetitionT): Promise<Competition> {
    try {
      const result = await competitionRepository.createOrUpdate(data)
      return result
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

export default new CompetitionController()
