import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"


class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getCommentsByEvent(eventId) {
    const comments = await dbContext.Comments.find({
      eventId: eventId
    }).populate('creator', 'name picture')

    return comments
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId)

    if (!comment) {
      throw new BadRequest('Invalid Comment Id')
    }

    return comment
  }

  async deleteComment(commentId, userInfo) {
    const comment = await this.getCommentById(commentId)

    // @ts-ignore
    if (userInfo.id != comment.creatorId.toString()) {
      throw new Forbidden('FORBIDDEN: This aint yo comment')
    }

    comment.remove()

    return comment
  }


}

export const commentsService = new CommentsService()