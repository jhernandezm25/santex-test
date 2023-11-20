import { Model, Document } from 'mongoose'
import { Team, TeamModel } from '../models/team'
import { ErrorMessages } from '../common/errors/errors'

class TeamRepository {
  private readonly teamModel: Model<Team & Document>

  constructor(model: Model<Team & Document>) {
    this.teamModel = model
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().lean()
  }

  async findById(id: number): Promise<Team | null> {
    return this.teamModel.findOne({ idTeam: id }).lean()
  }

  async create(data: Team): Promise<Team> {
    return this.teamModel.create(data)
  }

  async findByTeamId(teamId: number): Promise<Team | null> {
    return this.teamModel.findOne({ idTeam: teamId }).lean()
  }

  async findByLeagueCode(leagueCode: string): Promise<Team[]> {
    return this.teamModel.find({ leagueCode }).lean()
  }

  async update(id: string, data: Partial<Team>): Promise<Team | null> {
    return this.teamModel.findByIdAndUpdate(id, data, { new: true }).lean()
  }

  async createOrUpdate(data: Team): Promise<Team> {
    const existingTeam = await this.findByTeamId(data.idTeam)

    if (existingTeam) {
      throw new Error(ErrorMessages.TEAM_ALREADY_EXISTS)
    }

    const newTeam = await this.teamModel.create(data)
    return newTeam.toObject() as Team
  }

  async delete(id: string): Promise<void> {
    await this.teamModel.findByIdAndDelete(id)
  }

  async createMany(teams: Team[]): Promise<Team[]> {
    try {
      // Obtener la lista de idTeam de los equipos a insertar
      const teamIdsToInsert = teams.map((team) => team.idTeam)

      // Buscar equipos que ya existen en la base de datos
      const existingTeams = await this.teamModel.find({
        idTeam: { $in: teamIdsToInsert },
      })

      // Filtrar la lista original para excluir los equipos que ya existen
      const teamsToInsert = teams.filter(
        (team) =>
          !existingTeams.some((existing) => existing.idTeam === team.idTeam),
      )

      if (teamsToInsert.length === 0) {
        // No hay nuevos equipos para insertar
        return []
      }

      // Insertar los equipos restantes en la colección
      const result = await this.teamModel.insertMany(teamsToInsert, {
        ordered: false,
      })

      return result
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export default new TeamRepository(TeamModel)
