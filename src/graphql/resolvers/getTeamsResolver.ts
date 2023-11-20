import getTeamByName from '../../functions/getTeam'
import teamController from '../../controllers/team/team.controller'

const getTeamByNameResolver = async (body: any) => {
  const { name } = body
  const response = await getTeamByName(teamController, name)
  return response
}

export default getTeamByNameResolver
