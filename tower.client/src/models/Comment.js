

export class Comment {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.body = data.body
    // isAttending = data.isAttending || false
  }
}