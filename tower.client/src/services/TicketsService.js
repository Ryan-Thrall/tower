import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { api } from "./AxiosService.js"


class TicketsService {

  async getTicketsByEvent(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    AppState.activeEventTickets = res.data.map(t => new Ticket(t))
  }

  async getTicketsByUser() {
    const res = await api.get('/account/tickets')
    AppState.userTickets = res.data.map(t => new Ticket(t))
  }

  async createTicket(eventId) {
    const res = await api.post('/api/tickets', { eventId: eventId })
    AppState.activeEventTickets = [...AppState.activeEventTickets, new Ticket(res.data)]
    AppState.activeEvent.capacity--;
  }

  async deleteTicket(eventId) {
    const ticket = AppState.activeEventTickets.find(t => t.accountId == AppState.account.id)
    await api.delete(`/api/tickets/${ticket.id}`)
    AppState.activeEvent.capacity++;


    AppState.activeEventTickets = AppState.activeEventTickets.filter(t => t.id != ticket.id)
  }

}

export const ticketsService = new TicketsService()