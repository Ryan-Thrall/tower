import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService.js'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/tickets', this.getUsersTickets)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUsersTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getUsersTickets(req.userInfo)
      res.send(tickets)
    } catch (error) {
      logger.log('error', error)
      next(error)
    }
  }
}
