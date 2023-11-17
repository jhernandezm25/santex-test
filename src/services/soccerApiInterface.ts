import {Response} from '../types/types'

export interface SoccerApiService {
  getCompetition(league: string): Promise<Response>
  getTeam(league: string): Promise<Response>
}
