import mongoose, { Document, Schema } from 'mongoose'

export interface Team extends Document {
  name: string
  tla: string
  shortName: string
  areaName: string
  address: string
}

const teamSchema = new Schema({
  name: { type: String, required: true },
  tla: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  areaName: { type: String, required: true },
  address: { type: String, required: true },
})

export default mongoose.model<Team>('Team', teamSchema)
