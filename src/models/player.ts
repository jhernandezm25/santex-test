import mongoose, { Document, Schema } from 'mongoose'

interface Player extends Document {
  name: string
  position: string
  dateOfBirth: Date
  nationality: string
}

const playerSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
})

export default mongoose.model<Player>('Player', playerSchema)
