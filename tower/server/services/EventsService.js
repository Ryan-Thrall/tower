import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"



class EventsService {

  async getAllEvents() {
    const events = await dbContext.Events.find()
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId)

    if (!event) {
      throw new BadRequest('Invalid Event Id')
    }
    return event
  }

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    return event
  }

  async editEvent(newEvent, eventId, userInfo) {
    const event = await this.getEventById(eventId)

    // @ts-ignore
    if (userInfo.id != event.creatorId.toString()) {
      throw new Forbidden('FORBIDDEN: Only The Creator Of An Event Can Edit.')
    }

    if (event.isCanceled) {
      throw new Forbidden('FORBIDDEN: This Event Has Been Cancelled And Can Not Be Edited')
    }

    event.name = newEvent.name || event.name
    event.description = newEvent.description || event.description
    event.coverImg = newEvent.coverImg || event.coverImg
    event.location = newEvent.location || event.location
    event.capacity = newEvent.capacity || event.capacity
    event.startDate = newEvent.startDate || event.startDate
    event.type = newEvent.type || event.type

    await event.save()

    return event
  }

  async cancelEvent(eventId, userInfo) {
    const event = await this.getEventById(eventId)

    // @ts-ignore
    if (userInfo.id != event.creatorId.toString()) {
      throw new Forbidden('FORBIDDEN: Only the Creator of an Event Can Cancel.')
    }

    event.isCanceled = !event.isCanceled

    event.save()

    return event

  }

  async lowerCapacity(eventId) {
    const event = await this.getEventById(eventId)

    // @ts-ignore
    event.capacity--;

    event.save()

    return event
  }

  async increaseCapacity(eventId) {
    const event = await this.getEventById(eventId)

    // @ts-ignore
    event.capacity++;

    event.save()

    return event
  }

}

export const eventsService = new EventsService()