import { ITeam } from '../controllers/team/team.interface'

const getTeamByName = async (team: ITeam, name: string) => {
  try {
    const teams = await team.getTeamByName(name)
    return teams
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default getTeamByName
