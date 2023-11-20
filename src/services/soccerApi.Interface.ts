import { Response } from '../types/types'

export interface ISoccerApiService {
  getCompetition(league: string): Promise<Response>
  getTeam(league: string): Promise<Response>
}
