

export class Ticket {
  constructor(data) {
    this.id = data._id;
    this.eventId = data.eventId;
    this.accountId = data.accountId;
    this.profile = data.profile;
  }
}