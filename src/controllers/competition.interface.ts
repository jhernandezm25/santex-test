import { Competition, CompetitionT } from '../models/competition'

export interface ICompetition {
  getAllCompetitions(): Promise<Array<Competition>>
  createCompetition(data: CompetitionT): Promise<Competition>
}
