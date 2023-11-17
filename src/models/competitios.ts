import mongoose, { Document, Schema } from 'mongoose'

interface Competition extends Document {
  name: string
  code: string
  areaName: string
}

const competitionSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  areaName: { type: String, required: true },
})

export default mongoose.model<Competition>('Competition', competitionSchema)
