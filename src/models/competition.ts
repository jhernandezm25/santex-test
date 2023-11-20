import mongoose, { Document, Schema } from 'mongoose'

export type CompetitionT = {
  leagueId: number
  name: string
  code: string
  areaName: string
}

export interface Competition extends Document {
  leagueId: number
  name: string
  code: string
  areaName: string
}

const competitionSchema = new Schema({
  leagueId: { type: Number, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  areaName: { type: String, required: true },
})

export const CompetitionModel = mongoose.model<Competition>(
  'Competition',
  competitionSchema,
)
