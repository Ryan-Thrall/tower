import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";


export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }

  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(req.params.ticketId, req.userInfo)
      res.send(ticket)
    } catch (error) {
      logger.log('error', error)
      next(error)
    }
  }
}