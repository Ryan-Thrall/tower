import { Schema } from "mongoose";
import { SCHEMA_OPTIONS, ObjectId } from "../db/DbUtils.js";

export const EventSchema = new Schema({
  creatorId: { type: ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String },
  coverImg: { type: String },
  location: { type: String },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
}, SCHEMA_OPTIONS)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})