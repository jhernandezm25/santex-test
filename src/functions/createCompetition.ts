import { ICompetition } from '../controllers/competition/competition.interface'
import { IPlayer } from '../controllers/player/player.interface'
import { ITeam } from '../controllers/team/team.interface'
import { CompetitionT } from '../models/competition'
import { Player, partialPlayer } from '../models/player'
import { Team } from '../models/team'
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
    throw new Error(error.message)
  }
}

const importTeams = async (
  id: string,
  team: ITeam,
  soccerApi: ISoccerApiService,
  player: IPlayer,
) => {
  try {
    const teamInformation = await soccerApi.getTeam(id)
    if (teamInformation.isResult) {
      const data = teamInformation.data
      const teams: Array<Team> = []
      for (const team of data.teams) {
        const myTeam = {
          idTeam: team.id,
          name: team.name,
          tla: team.tla,
          shortName: team.shortName,
          areaName: team.area.name,
          address: team.address,
          leagueCode: id,
        }
        teams.push(myTeam)
        if (team.squad && team.squad.length > 0) {
          await importPlayers(id, player, team.squad, team.shortName)
        } else {
          await importCoach(id, player, team.coach, team.shortName)
        }
      }
      const response = await team.createManyTeams(teams)
      return response
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const importPlayers = async (
  leagueCode: string,
  player: IPlayer,
  players: Array<partialPlayer>,
  team: string,
) => {
  try {
    const myPlayers: Array<Player> = players.map((player: any) => ({
      playerId: player.id,
      name: player.name,
      position: player.position,
      dateOfBirth: player.dateOfBirth,
      nationality: player.nationality,
      isCoach: false,
      team: team,
      leagueCode,
    }))
    const response = await player.createManyPlayers(myPlayers)
    return response
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const importCoach = async (
  leagueCode: string,
  player: IPlayer,
  coach: any,
  team: string,
) => {
  try {
    const myPlayer: Player = {
      playerId: coach.id,
      name: coach.name,
      dateOfBirth: coach.dateOfBirth,
      nationality: coach.nationality,
      isCoach: true,
      team,
      leagueCode,
    }
    const response = await player.createPlayer(myPlayer)
    return response
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const importData = async (
  id: string,
  competition: ICompetition,
  team: ITeam,
  player: IPlayer,
  soccerApi: ISoccerApiService,
) => {
  try {
    const competitionData = await importLeagueData(id, competition, soccerApi)
    const teamsData = await importTeams(id, team, soccerApi, player)
    console.table(teamsData)
    return competitionData
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default importData
