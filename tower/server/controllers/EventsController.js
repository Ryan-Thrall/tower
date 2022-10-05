import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { TicketsController } from "./TicketsController.js";

export class EventsController extends BaseController {

  constructor() {
    super('/api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEvent)
      .get('/:eventId/comments', this.getCommentsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      res.send(events)
    } catch (error) {
      logger.log('error', error)
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEvent(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEvent(req.params.eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEvent(req.params.eventId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newEvent = await eventsService.createEvent(req.body)
      res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const event = await eventsService.editEvent(req.body, req.params.eventId, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.cancelEvent(req.params.eventId, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}