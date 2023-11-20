import { Model, Document } from 'mongoose'
import {
  Competition,
  CompetitionModel,
  CompetitionT,
} from '../models/competition'
import { ErrorMessages } from '../common/errors/errors'

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

  async findByAttributte(query: any): Promise<Competition | null> {
    return this.competitionModel.findOne(query).lean()
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
      throw new Error(ErrorMessages.COMPETITION_ALREADY_EXISTS)
    }

    const newCompetition = await this.competitionModel.create(data)
    return newCompetition.toObject() as Competition
  }

  async delete(id: string): Promise<void> {
    await this.competitionModel.findByIdAndDelete(id)
  }
}

export default new CompetitionRepository(CompetitionModel)
