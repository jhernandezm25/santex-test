import { Model, Document } from 'mongoose'
import {
  Competition,
  CompetitionModel,
  CompetitionT,
} from '../models/competition'

class CompetitionRepository {
  private readonly competitionModel: Model<Competition & Document>

  constructor(model: Model<Competition & Document>) {
    this.competitionModel = model
  }

  async findAll(): Promise<Competition[]> {
    return this.competitionModel.find().lean()
  }

  async findById(id: number): Promise<Competition | null> {
    return this.competitionModel.findById(id).lean()
  }

  async create(data: Competition): Promise<Competition> {
    return this.competitionModel.create(data)
  }

  async findByLeagueId(leagueId: number): Promise<Competition | null> {
    return this.competitionModel.findOne({ leagueId }).lean()
  }

  async update(
    id: string,
    data: Partial<Competition>,
  ): Promise<Competition | null> {
    return this.competitionModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
  }

  async createOrUpdate(data: CompetitionT): Promise<Competition> {
    const existingCompetition = await this.findByLeagueId(data.leagueId)

    if (existingCompetition) {
      return Promise.reject('La competición ya existe con ese id.')
    }

    const newCompetition = await this.competitionModel.create(data)
    return newCompetition.toObject() as Competition
  }

  async delete(id: string): Promise<void> {
    await this.competitionModel.findByIdAndDelete(id)
  }
}

export default new CompetitionRepository(CompetitionModel)