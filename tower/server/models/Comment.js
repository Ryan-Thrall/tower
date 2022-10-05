import { Schema } from "mongoose";
import { SCHEMA_OPTIONS, ObjectId } from "../db/DbUtils.js";

export const CommentSchema = new Schema({

  creatorId: { type: ObjectId, required: true },
  eventId: { type: ObjectId, required: true },
  body: { type: String, required: true },
  isAttending: { type: Boolean, default: false },

}, SCHEMA_OPTIONS)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})