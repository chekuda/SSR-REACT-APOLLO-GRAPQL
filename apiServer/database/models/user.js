import mongoose from 'mongoose'

const { Schema } = mongoose

const newSchema = new Schema({
  username: String,
  password: String
})

export const User = mongoose.model('user', newSchema)
