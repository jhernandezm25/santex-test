import { Team, TeamPlayer } from '../../models/team'
import { ITeam } from './team.interface'
import teamRepository from '../../repositories/team.repository'

class TeamController implements ITeam {
  async getTeamByName(name: string): Promise<TeamPlayer> {
    try {
      const result = await teamRepository.getTeamByName(name)
      return result
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async createManyTeams(data: Team[]): Promise<number> {
    try {
      const result = await teamRepository.createMany(data)
      return result.length
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async createTeam(data: Team): Promise<Team> {
    try {
      const result = await teamRepository.createOrUpdate(data)
      return result
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

export default new TeamController()
