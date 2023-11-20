import mongoose, { Document, Schema } from 'mongoose'

export interface Player {
  playerId: number
  name: string
  position?: string
  dateOfBirth: string
  nationality: string
  isCoach: boolean
  team: string
  leagueCode: string
}

export type partialPlayer = Partial<Player>

export interface PlayerDocument extends Player, Document {}

const playerSchema = new Schema({
  playerId: { type: Number, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },
  isCoach: { type: Boolean, required: true },
  team: { type: String, required: true },
  leagueCode: { type: String, required: true },
})

export const PlayerModel = mongoose.model<PlayerDocument>(
  'Player',
  playerSchema,
)
