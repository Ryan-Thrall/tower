import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { eventsService } from "./EventsService.js"


class TicketsService {

  async createTicket(ticketData, userInfo) {

    const event = await eventsService.getEventById(ticketData.eventId)

    // @ts-ignore
    if (event.capacity <= 0) {
      throw new BadRequest('BAD REQUEST: Event has no more capacity')
    }

    const userTickets = await this.getUsersTickets(userInfo)
    // console.log('hello')
    // logger.log(userTickets)

    const isIdenticalTicket = userTickets.filter(t => t.eventId == ticketData.eventId)

    if (isIdenticalTicket.length != 0) {
      throw new Forbidden('FORBIDDEN: You Already Have A Ticket')
    }

    // Create the ticket
    const ticket = await dbContext.Tickets.create(ticketData)

    await ticket.populate('profile', 'name picture')

    eventsService.lowerCapacity(ticketData.eventId)

    return ticket
  }

  async getUsersTickets(userInfo) {
    const tickets = await dbContext.Tickets.find({
      accountId: userInfo.id
    }).populate('event')

    return tickets
  }

  async getTicketsByEvent(eventId) {
    const tickets = await dbContext.Tickets.find({
      eventId: eventId
    }).populate('profile', 'name picture')

    return tickets
  }

  async getTicketById(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId)

    if (!ticket) {
      throw new BadRequest('Invalid Ticket Id')
    }

    return ticket
  }

  async deleteTicket(ticketId, userInfo) {
    const ticket = await this.getTicketById(ticketId)

    // @ts-ignore
    if (userInfo.id != ticket.accountId.toString()) {
      throw new Forbidden('FORBIDDEN: This Is Not Your Ticket.')
    }

    ticket.remove()

    eventsService.increaseCapacity(ticket.eventId)

    return ticket
  }

}

export const ticketsService = new TicketsService()