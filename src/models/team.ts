import mongoose, { Document, Schema } from 'mongoose'
import { Player } from './player'

export interface Team {
  idTeam: number
  name: string
  tla: string
  shortName: string
  areaName: string
  address: string
  leagueCode: string
}

export interface TeamPlayer extends Team {
  players?: Array<Player>
}

export interface TeamDocument extends Team, Document {}

const teamSchema = new Schema({
  idTeam: { type: Number, required: true },
  name: { type: String, required: true },
  tla: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  areaName: { type: String, required: true },
  address: { type: String, required: true },
  leagueCode: { type: String, required: true },
})

export const TeamModel = mongoose.model<TeamDocument>('Team', teamSchema)
