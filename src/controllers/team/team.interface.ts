import { Team } from '../../models/team'

export interface ITeam {
  createTeam(data: Team): Promise<Team>
  createManyTeams(data: Array<Team>): Promise<number>
}
